import { app, BrowserWindow, dialog, utilityProcess } from 'electron';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';

let backend;
let window;
let quitting = false;
if (app.isPackaged) process.env.SEG_LOCAL_WORKSPACE ??= 'true';
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => { if (window) { window.restore(); window.focus(); } });
  app.whenReady().then(async () => {
    const root = app.isPackaged ? app.getAppPath() : path.resolve(import.meta.dirname, '..');
    const configPath = app.isPackaged ? path.join(app.getPath('userData'), '.env') : path.join(root, '.env');
    if (app.isPackaged && !existsSync(configPath)) {
      if (process.env.SEG_LOCAL_WORKSPACE === 'true') {
        await mkdir(path.join(app.getPath('userData'), 'seg-local-data'), { recursive: true });
        const localEnv = [
          'SEG_LOCAL_WORKSPACE=true',
          `SEG_LOCAL_EMAIL_LOGIN=${process.env.SEG_LOCAL_EMAIL_LOGIN ?? 'true'}`,
          `SEG_LOCAL_DATA_DIR=${path.join(app.getPath('userData'), 'seg-local-data')}`,
          `JWT_SECRET=${randomBytes(32).toString('hex')}`,
          `VITE_APP_ID=${process.env.VITE_APP_ID ?? 'seg-local-desktop'}`,
          `OAUTH_SERVER_URL=${process.env.OAUTH_SERVER_URL ?? 'https://oauth.manus.im'}`,
          `DATABASE_URL=${process.env.DATABASE_URL ?? 'mysql://root:unused@127.0.0.1:3306/seg_unused'}`,
        ].join('\n');
        await writeFile(configPath, `${localEnv}\n`, 'utf8');
      } else {
        const selection = await dialog.showOpenDialog({ title: 'Select your existing SEG .env configuration (MySQL preview)', properties: ['openFile', 'showHiddenFiles'] });
        if (selection.canceled || !selection.filePaths[0]) { app.quit(); return; }
        await copyFile(selection.filePaths[0], configPath);
      }
    }
    backend = utilityProcess.fork(path.join(root, 'scripts/start-production.mjs'), [], {
      cwd: app.isPackaged ? app.getPath('userData') : root,
      env: { ...process.env, SEG_DESKTOP: 'true', PORT: '0', TRUST_PROXY: 'false',
        SEG_CONTENT_ROOT: app.isPackaged ? process.resourcesPath : root,
        DOTENV_CONFIG_PATH: configPath },
      stdio: 'pipe',
      serviceName: 'SEG local server',
    });
    backend.stdout?.resume();
    backend.stderr?.resume();
    backend.on('exit', () => {
      if (!quitting) {
        dialog.showErrorBox('SEG', 'The local server stopped. Check the database and local configuration, then reopen SEG.');
        app.quit();
      }
    });
    const address = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Local server startup timed out.')), 60000);
      backend.once('exit', () => { clearTimeout(timeout); reject(new Error('Local server could not start.')); });
      backend.once('message', message => {
        if (message?.type === 'seg-ready' && Number.isInteger(message.port) && message.port > 0) {
          clearTimeout(timeout);
          resolve(`http://127.0.0.1:${message.port}`);
        }
      });
    });
    window = new BrowserWindow({ width: 1280, height: 900, minWidth: 360, minHeight: 600,
      title: 'SMART EMERGENCY GUIDE', autoHideMenuBar: true,
      webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
    });
    window.webContents.session.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
    window.webContents.session.setPermissionCheckHandler(() => false);
    window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    window.webContents.on('will-navigate', (event, url) => {
      if (new URL(url).origin !== address) event.preventDefault();
    });
    await window.loadURL(`${address}/login?returnTo=%2Fdashboard`);
  }).catch(error => { dialog.showErrorBox('SEG startup', error.message); app.quit(); });
}
app.on('window-all-closed', () => app.quit());
app.on('before-quit', () => { quitting = true; backend?.kill(); });

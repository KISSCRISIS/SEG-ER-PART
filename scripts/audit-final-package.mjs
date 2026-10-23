import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const packageRoot = process.env.SEG_FINAL_PACKAGE_ROOT ?? path.resolve(repoRoot, '..', 'webdev-static-assets', 'SEG_FINAL_PACKAGE');
const reportPath = path.join(packageRoot, 'data', 'path_audit.json');
const productionBaseUrl = process.env.SEG_PRODUCTION_URL ?? 'https://seg-guide-bjjkqn7t.manus.space';

const exists = async (target) => {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
};

const walkTextFiles = async (directory) => {
  if (!(await exists(directory))) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkTextFiles(target);
    return /\.(?:json|md|mdx|html|txt)$/i.test(entry.name) ? [target] : [];
  }));
  return nested.flat();
};

const run = async () => {
  if (!(await exists(packageRoot))) {
    const fallbackPath = path.resolve(repoRoot, 'reports', 'final-package-audit.json');
    const result = {
      auditVersion: '1.1.0',
      packageRoot,
      blocked: true,
      reason: 'Configured final-package root does not exist; provide SEG_FINAL_PACKAGE_ROOT or restore the external package.',
      summary: { requiredDirectoriesPresent: false, localAssetFailures: 0, remoteAssetFailures: 0, declaredPathFailures: 0, contentDataBlocked: true },
    };
    await mkdir(path.dirname(fallbackPath), { recursive: true });
    await writeFile(fallbackPath, `${JSON.stringify(result, null, 2)}\n`);
    console.log(JSON.stringify(result.summary, null, 2));
    process.exitCode = 2;
    return;
  }
  const requiredDirectories = ['assets', 'assets/images', 'data', 'content'];
  const directoryChecks = await Promise.all(requiredDirectories.map(async (relativePath) => ({
    relativePath,
    exists: await exists(path.join(packageRoot, relativePath)),
  })));

  const manifestPath = path.join(packageRoot, 'assets_manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const localAssets = await Promise.all(manifest.assets.map(async (asset) => ({
    key: asset.key,
    path: asset.localFile,
    present: asset.localFile ? await exists(path.join(packageRoot, asset.localFile)) : null,
  })));

  const remoteAssets = await Promise.all(manifest.assets.map(async (asset) => {
    const url = new URL(asset.managedUrl, productionBaseUrl).toString();
    try {
      const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
      return { key: asset.key, url, status: response.status, present: response.ok };
    } catch (error) {
      return { key: asset.key, url, status: null, present: false, error: error instanceof Error ? error.message : String(error) };
    }
  }));

  const textFiles = await walkTextFiles(path.join(packageRoot, 'content'));
  const declaredReferences = [];
  for (const filePath of textFiles) {
    const content = await readFile(filePath, 'utf8');
    const matches = content.matchAll(/(?:\.\.\/)?assets\/[A-Za-z0-9_./-]+/g);
    for (const match of matches) {
      const reference = match[0];
      const resolved = path.resolve(path.dirname(filePath), reference);
      declaredReferences.push({ file: path.relative(packageRoot, filePath), reference, present: await exists(resolved) });
    }
  }

  const result = {
    auditVersion: '1.0.0',
    productionBaseUrl,
    directories: directoryChecks,
    localAssets,
    remoteAssets,
    declaredReferences,
    requiredData: {
      metadata: await exists(path.join(packageRoot, 'data', 'metadata.json')),
      processedBook: await exists(path.join(packageRoot, 'data', 'processed_book.json')),
    },
    summary: {
      requiredDirectoriesPresent: directoryChecks.every((item) => item.exists),
      localAssetFailures: localAssets.filter((asset) => asset.present === false).length,
      remoteAssetFailures: remoteAssets.filter((asset) => !asset.present).length,
      declaredPathFailures: declaredReferences.filter((reference) => !reference.present).length,
      contentDataBlocked: !(await exists(path.join(packageRoot, 'data', 'processed_book.json'))),
    },
  };

  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`);

  const hasFailures = !result.summary.requiredDirectoriesPresent || result.summary.localAssetFailures > 0 || result.summary.remoteAssetFailures > 0 || result.summary.declaredPathFailures > 0;
  console.log(JSON.stringify(result.summary, null, 2));
  process.exitCode = hasFailures ? 1 : 0;
};

run();

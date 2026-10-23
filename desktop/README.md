# SEG desktop preview

This is a desktop shell for the existing application, not yet a standalone offline edition.

Run `pnpm build` then `pnpm desktop` from the project directory. The window starts its own loopback-only server on an assigned free port and stops it on exit. Existing authentication and MySQL configuration in the project `.env` are used. MySQL must be running. External OAuth navigation is blocked in this preview; use the existing email/password login.

Build with `node scripts/build-desktop.mjs`; package with `node node_modules/electron-builder/cli.js --config electron-builder.json --win`. Output belongs in `release/`. The configuration includes an NSIS installer with desktop and Start Menu shortcuts. Runtime dependencies are bundled, so an installed build does not require a separate Node installation. Installer generation and installation must still be verified before distribution.

Packaged content is read from the application's resources directory. On first packaged launch, select your existing SEG `.env` configuration; it is copied to Electron's userData directory and never bundled. This preview still requires the configured MySQL server. Canceling configuration closes the application.

Pending before a distributable offline release: SQLite schema and repository adapter, tested import of existing progress, local account setup, backup/restore, installation smoke test. Do not distribute the project `.env` or personal database in an installer.

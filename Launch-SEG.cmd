@echo off
cd /d "%~dp0"
node "node_modules\electron\cli.js" "desktop\main.mjs"
if errorlevel 1 pause

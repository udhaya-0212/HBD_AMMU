@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is needed to start this story. Install Node.js LTS, then double-click this file again.
  pause
  exit /b 1
)
node "%~dp0server.mjs"
if errorlevel 1 pause

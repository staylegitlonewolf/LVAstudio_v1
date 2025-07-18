@echo off
echo Starting LVA Studio Strapi Backend...
echo.
cd /d "%~dp0..\lva-studio-backend"
echo Current directory: %CD%
echo.
echo Starting Strapi development server...
echo This will take a moment to start up...
echo.
echo Once started, you can access:
echo - Strapi Admin: http://localhost:1337/admin
echo - API: http://localhost:1337/api
echo.
npm run develop
pause 
@echo off
echo 🚀 LVA Studio Deployment Script
echo ================================
echo.
echo Installing Railway CLI...
npm install -g @railway/cli
echo.
echo 🔐 Logging into Railway...
railway login
echo.
echo 🏗️ Deploying Strapi Backend to Railway...
cd lva-studio-backend
railway up
echo.
echo ✅ Backend deployment complete!
echo.
echo 🌐 Your Railway URL will be displayed above
echo 📝 Copy that URL and update js/auth.js with it
echo.
echo Next steps:
echo 1. Update STRAPI_URL in js/auth.js
echo 2. Push changes to GitHub
echo 3. Enable GitHub Pages in repository settings
echo.
pause

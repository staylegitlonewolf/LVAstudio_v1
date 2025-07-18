@echo off
echo ========================================
echo LVA Studio - Render Deployment Script
echo ========================================

echo.
echo Current Status:
echo ✅ Railway Database: Ready
echo ✅ Environment Variables: Configured
echo 🔄 Render Deployment: Pending
echo.

echo Choose an option:
echo 1. Open Render Dashboard
echo 2. Show deployment instructions
echo 3. Show environment variables
echo 4. Test database connection
echo 5. Exit

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto render
if "%choice%"=="2" goto instructions
if "%choice%"=="3" goto envvars
if "%choice%"=="4" goto testdb
if "%choice%"=="5" goto exit
goto invalid

:render
echo Opening Render dashboard...
start https://render.com/dashboard
echo.
echo Instructions:
echo 1. Click "New +" 
echo 2. Select "Blueprint"
echo 3. Connect your GitHub repository
echo 4. Click "Apply" to deploy
pause
goto menu

:instructions
echo.
echo ========================================
echo RENDER DEPLOYMENT INSTRUCTIONS
echo ========================================
echo.
echo Step 1: Sign up at render.com
echo Step 2: Connect your GitHub repository
echo Step 3: Use Blueprint deployment (render.yaml)
echo Step 4: Set environment variables
echo Step 5: Deploy and test
echo.
echo See DEPLOYMENT_GUIDE.md for detailed steps
pause
goto menu

:envvars
echo.
echo ========================================
echo ENVIRONMENT VARIABLES FOR RENDER
echo ========================================
echo.
echo Copy these to Render dashboard:
echo.
echo NODE_ENV=production
echo DATABASE_CLIENT=postgres
echo DATABASE_URL=postgresql://postgres:rlDvLJoDRAEDOnBgKxsBanqBteYGjbkX@turntable.proxy.rlwy.net:47370/railway
echo DATABASE_SSL=true
echo HOST=0.0.0.0
echo PORT=1337
echo APP_KEYS=LL4zOY1gQMH2nv+VSVS97ShnDzrhy0bd5OhDN3szlUI=,D3aAI2pxo4fGVYWVtff3d+ENFgXHjrHR/SLDHd9UWHo=,DZHh2pXFMkAE4P6DHcQLgZsBiv2BpVYOAIZSP1xBc6k=,7pfZNkhB+XHbQz191XBB3j7bu7EWLhJ+D9v/OF25pVI=
echo ADMIN_JWT_SECRET=RUFeC3SD/y0IE9xsjSbKEYa2bOTVFEO+HUzGt3AcR8k=
echo API_TOKEN_SALT=iCEfa5ew1TLdpf1UNWBJtw==
echo TRANSFER_TOKEN_SALT=TozGrf52H43NGh9AW1wIaQ==
echo JWT_SECRET=Nntv3YuSlJD3MscDP60Y1s9ampqEPZVaVe3HYxRNVZY=
echo.
pause
goto menu

:testdb
echo Testing Railway database connection...
railway service Postgres
railway variables --kv
echo.
echo Database connection details displayed above
pause
goto menu

:invalid
echo Invalid choice. Please try again.
pause
goto menu

:exit
echo Goodbye!
exit /b 0

:menu
cls
goto start 
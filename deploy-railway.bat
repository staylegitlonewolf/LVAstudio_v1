@echo off
echo ========================================
echo LVA Studio - Railway Deployment Script
echo ========================================

echo.
echo Choose an option:
echo 1. Install Railway CLI
echo 2. Login to Railway
echo 3. Initialize Railway project
echo 4. Deploy to Railway
echo 5. View Railway logs
echo 6. Open Railway dashboard
echo 7. Exit

set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto login
if "%choice%"=="3" goto init
if "%choice%"=="4" goto deploy
if "%choice%"=="5" goto logs
if "%choice%"=="6" goto dashboard
if "%choice%"=="7" goto exit
goto invalid

:install
echo Installing Railway CLI...
npm install -g @railway/cli
echo Railway CLI installed successfully!
pause
goto menu

:login
echo Logging into Railway...
railway login
pause
goto menu

:init
echo Initializing Railway project...
railway init
echo Project initialized!
pause
goto menu

:deploy
echo Deploying to Railway...
railway up
echo Deployment completed!
pause
goto menu

:logs
echo Opening Railway logs...
railway logs
pause
goto menu

:dashboard
echo Opening Railway dashboard...
railway open
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
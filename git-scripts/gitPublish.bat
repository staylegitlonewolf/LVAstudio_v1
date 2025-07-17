@echo off
echo Saving ALL files and folders in the project...
set /p msg="Enter commit message: "
git add .
git commit -m "%msg%"
git push
pause 
@echo off
:: Save (Commit & Push) Changes to GitHub
git add .
git commit -m "Auto update"
git push origin main
pause 
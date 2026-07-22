taskkill /F /IM git.exe /T
timeout /t 2 /nobreak
del /F /Q C:\proud\.git\index.lock
cd /d C:\proud
git commit -m "Remove AI Chat; Add unlimited duration and 8-language to Video Studio"
git push origin main
echo DONE

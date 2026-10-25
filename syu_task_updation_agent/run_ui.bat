@echo off
title SYU Task Automation Studio UI
cd /d "%~dp0"
echo ========================================================
echo        SYU Task Automation Studio Web App
echo ========================================================
echo Starting server on http://localhost:5000...
start http://localhost:5000
python app.py
pause

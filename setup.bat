@echo off
echo ========================================
echo  Placement Prep Starter - Setup Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/4] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/4] Setup Complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo.
echo 1. Make sure MongoDB is running
echo    - Local: mongod --dbpath /path/to/data
echo    - Or use MongoDB Atlas (update backend/.env)
echo.
echo 2. Start Backend Server:
echo    cd backend
echo    npm run dev
echo.
echo 3. Start Frontend (in new terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open browser: http://localhost:3000
echo.
echo ========================================
echo.

pause

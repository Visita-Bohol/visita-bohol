@echo off
echo ========================================
echo Visita Bohol - React App Setup
echo ========================================
echo.

echo Step 1: Copying data files...
xcopy /Y ..\churches.json public\
xcopy /Y ..\prayers.json public\
echo Data files copied!
echo.

echo Step 2: Installing dependencies...
echo This may take a few minutes...
call npm install
echo.

if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo Setup complete!
    echo ========================================
    echo.
    echo To start the development server, run:
    echo   npm run dev
    echo.
    echo To build for production, run:
    echo   npm run build
    echo.
    echo The production files will be in the 'dist' folder.
    echo ========================================
) else (
    echo.
    echo Error: npm install failed!
    echo Make sure Node.js and npm are installed.
    echo.
)

pause

@echo off

REM Build script for Arts Fest Result Publishing Web App

echo Building Arts Fest Result Publishing Web App...

REM Clean previous builds
echo Cleaning previous builds...
if exist build rmdir /s /q build

REM Install dependencies
echo Installing dependencies...
npm install

REM Run tests (if any)
echo Running tests...
npm test

REM Build the application
echo Building the application...
npm run build

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo Build successful!
    echo The built application is located in the 'build' directory
    echo You can now deploy this directory to your web server
) else (
    echo Build failed!
    exit /b 1
)
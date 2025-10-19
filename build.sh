#!/bin/bash

# Build script for Arts Fest Result Publishing Web App

echo "Building Arts Fest Result Publishing Web App..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf build

# Install dependencies
echo "Installing dependencies..."
npm install

# Run tests (if any)
echo "Running tests..."
npm test

# Build the application
echo "Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "The built application is located in the 'build' directory"
    echo "You can now deploy this directory to your web server"
else
    echo "Build failed!"
    exit 1
fi
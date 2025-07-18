#!/bin/bash

# Custom build script for Render deployment
echo "Starting custom build process..."

# Set environment variables to avoid SWC issues
export STRAPI_TELEMETRY_DISABLED=true
export NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies
echo "Installing dependencies..."
npm install

# Try to build with fallback options
echo "Building Strapi application..."
if npm run build; then
    echo "Build completed successfully!"
else
    echo "Build failed, trying alternative approach..."
    # Try building without SWC
    export STRAPI_DISABLE_SWC=true
    npm run build
fi

echo "Build process completed!" 
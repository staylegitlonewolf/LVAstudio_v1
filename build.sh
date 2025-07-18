#!/bin/bash

# Simple build script for Render deployment
set -e

echo "=== Building LVA Studio Backend ==="

# Set environment variables
export NODE_ENV=production
export STRAPI_DISABLE_SWC=true
export NODE_OPTIONS="--max-old-space-size=4096"

echo "Installing dependencies..."
npm ci

echo "Building Strapi application..."
npm run build:render

echo "Build completed successfully!" 
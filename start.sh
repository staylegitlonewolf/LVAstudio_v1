#!/bin/bash

# Simple start script for production
echo "Starting LVA Studio Backend in production mode..."

export NODE_ENV=production
export STRAPI_DISABLE_SWC=true
export NODE_OPTIONS="--max-old-space-size=4096"

npm run start:production 
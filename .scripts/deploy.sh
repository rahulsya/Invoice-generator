#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin main
echo "New changes copied to the server!"

echo "Installing Dependencies..."
yarn

echo "Creating Production Build..."
yarn build

echo "PM2 Reload"
pm2 reload flyoversticker

echo "Deployment Finished!"

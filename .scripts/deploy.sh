#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull origin main
echo "New changes copied to the server!"

echo "npm version"
node -v
npm -v

echo "Installing Dependencies..."
yarn install

echo "Creating Production Build..."
yarn build

echo "PM2 Reload"
pm2 reload flyoversticker

echo "Deployment Finished!"

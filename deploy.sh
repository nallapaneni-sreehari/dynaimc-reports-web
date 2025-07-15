#!/bin/bash

# Exit on any error
set -e

# Step 1: Build Angular app with base href
echo "🔨 Building Angular app..."
ng build --configuration production --base-href /reportsforge/

# Step 2: Remove old deployment
echo "🧹 Removing old files from /var/www/html/reportsforge/..."
sudo rm -rf /var/www/html/reportsforge/

# Step 3: Copy built files to Apache folder
echo "📂 Copying new build to /var/www/html/reportsforge/..."
sudo cp -r dist/dynaimc-reports-web/browser/ /var/www/html/reportsforge/

# Optional: Set ownership (recommended for Apache)
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data /var/www/html/reportsforge/

echo "✅ Deployment complete!"

#!/bin/bash

# Install Vercel CLI if not already installed
# Run: npm i -g vercel

echo "This script will help you add environment variables to Vercel"
echo "Make sure you have Vercel CLI installed: npm i -g vercel"
echo ""
echo "To add variables, run these commands one by one:"
echo ""

# Read .env.local and generate vercel env add commands
while IFS= read -r line; do
  # Skip empty lines and comments
  if [[ -z "$line" || "$line" =~ ^#.* ]]; then
    continue
  fi
  
  # Extract variable name
  var_name=$(echo "$line" | cut -d'=' -f1)
  
  # Only process valid variable names
  if [[ "$var_name" =~ ^[A-Z][A-Z_0-9]*$ ]]; then
    echo "vercel env add $var_name production"
  fi
done < .env.local

echo ""
echo "Or simply use the Vercel Dashboard:"
echo "https://vercel.com/dashboard -> Your Project -> Settings -> Environment Variables"


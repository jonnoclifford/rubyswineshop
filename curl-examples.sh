#!/bin/bash

# GitHub API Integration - cURL Examples
# Quick reference for testing the API endpoints

BASE_URL="http://localhost:3000"

echo "🧪 GitHub API Integration - cURL Test Examples"
echo "================================================"
echo ""
echo "Make sure your dev server is running: npm run dev"
echo ""

# Test connection
echo "1️⃣  Test GitHub API Connection"
echo "curl ${BASE_URL}/api/config/test"
echo ""
curl -s "${BASE_URL}/api/config/test" | jq '.' || curl -s "${BASE_URL}/api/config/test"
echo ""
echo "---"
echo ""

# Read config
echo "2️⃣  Read Current Configuration"
echo "curl ${BASE_URL}/api/config"
echo ""
curl -s "${BASE_URL}/api/config" | jq '.success, .data.business.name' || echo "Run: curl ${BASE_URL}/api/config | jq '.'"
echo ""
echo "---"
echo ""

# Get history
echo "3️⃣  Get Commit History (last 5 commits)"
echo "curl ${BASE_URL}/api/config/history?limit=5"
echo ""
curl -s "${BASE_URL}/api/config/history?limit=5" | jq '.data[] | {sha: .shortSha, message: .message}' || echo "Run: curl ${BASE_URL}/api/config/history?limit=5 | jq '.'"
echo ""
echo "---"
echo ""

# Example POST (commented out to avoid accidental changes)
echo "4️⃣  Update Configuration (Example - commented out)"
echo '# curl -X POST ${BASE_URL}/api/config \'
echo '#   -H "Content-Type: application/json" \'
echo '#   -d '"'"'{'
echo '#     "config": {...your updated config...},'
echo '#     "commitMessage": "Update wine menu"'
echo '#   }'"'"
echo ""
echo "---"
echo ""

# Example revert (commented out to avoid accidental changes)
echo "5️⃣  Revert to Previous Version (Example - commented out)"
echo '# First, get a commit SHA from history:'
echo '# SHA=$(curl -s ${BASE_URL}/api/config/history?limit=5 | jq -r ".data[1].sha")'
echo '# echo "Reverting to: $SHA"'
echo '#'
echo '# Then revert:'
echo '# curl -X POST ${BASE_URL}/api/config/history \'
echo '#   -H "Content-Type: application/json" \'
echo '#   -d '"'"'{"sha": "'"'"'$SHA'"'"'"}'"'"
echo ""
echo "---"
echo ""

echo "✅ Done! Check the output above for results."
echo ""
echo "📚 More examples:"
echo "  - Full docs: GITHUB_API.md"
echo "  - Quick start: QUICK_START.md"
echo "  - React example: EXAMPLE_USAGE.tsx"

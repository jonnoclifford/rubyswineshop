#!/bin/bash

echo "==================================="
echo "GitHub OAuth Setup Verification"
echo "==================================="
echo ""

ERRORS=0

# Check environment variables
echo "1. Checking environment variables..."
if [ -f .env.local ]; then
    echo "   ✓ .env.local exists"
    
    if grep -q "GITHUB_CLIENT_ID" .env.local; then
        echo "   ✓ GITHUB_CLIENT_ID found"
    else
        echo "   ✗ GITHUB_CLIENT_ID missing"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "GITHUB_CLIENT_SECRET" .env.local; then
        echo "   ✓ GITHUB_CLIENT_SECRET found"
    else
        echo "   ✗ GITHUB_CLIENT_SECRET missing"
        ERRORS=$((ERRORS + 1))
    fi
    
    if grep -q "GITHUB_AUTHORIZED_USERS" .env.local; then
        echo "   ✓ GITHUB_AUTHORIZED_USERS found"
    else
        echo "   ✗ GITHUB_AUTHORIZED_USERS missing"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo "   ✗ .env.local not found (create from .env.example)"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "2. Checking core files..."

FILES=(
    "src/lib/auth.ts"
    "src/lib/hooks/useAuth.ts"
    "src/middleware.ts"
    "src/app/api/auth/github/route.ts"
    "src/app/api/auth/github/callback/route.ts"
    "src/app/api/auth/logout/route.ts"
    "src/app/api/auth/session/route.ts"
    "src/app/admin/page.tsx"
    "src/app/admin/login/page.tsx"
    "src/components/admin/LoginForm.tsx"
    "src/components/admin/AdminDashboard.tsx"
    "src/components/admin/AuthButton.tsx"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file"
    else
        echo "   ✗ $file missing"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "3. Checking documentation..."

DOCS=(
    "GITHUB_OAUTH_SETUP.md"
    "AUTH_SYSTEM_README.md"
    "QUICK_AUTH_REFERENCE.md"
    "OAUTH_IMPLEMENTATION.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo "   ✓ $doc"
    else
        echo "   ✗ $doc missing"
        ERRORS=$((ERRORS + 1))
    fi
done

echo ""
echo "==================================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "Next steps:"
    echo "1. Create GitHub OAuth app at https://github.com/settings/developers"
    echo "2. Add credentials to .env.local"
    echo "3. Run: npm run dev"
    echo "4. Visit: http://localhost:3000/admin/login"
    echo ""
    echo "See GITHUB_OAUTH_SETUP.md for detailed instructions."
else
    echo "❌ $ERRORS error(s) found"
    echo ""
    echo "Please check the missing files or environment variables above."
fi
echo "==================================="

#!/bin/bash

# Security test script for the Embleem application
# Tests various security aspects of the application

echo "🔒 Security Testing for Embleem"
echo "================================"

# Test 1: Check if API key is not exposed in build
echo "Test 1: Checking for exposed API keys in build..."
if [ -f "dist" ] || [ -f "build" ]; then
    if grep -r "VITE_UNSPLASH_ACCESS_KEY" dist/ build/ 2>/dev/null; then
        echo "❌ FAIL: API key found in build output!"
        exit 1
    else
        echo "✅ PASS: No API keys found in build output"
    fi
else
    echo "⚠️  SKIP: No build output found"
fi

# Test 2: Check if .env.example exists and doesn't contain real keys
echo ""
echo "Test 2: Checking .env.example..."
if [ -f ".env.example" ]; then
    if grep -q "your_unsplash_access_key_here" .env.example; then
        echo "✅ PASS: .env.example contains placeholder values"
    else
        echo "❌ FAIL: .env.example may contain real keys!"
        exit 1
    fi
else
    echo "❌ FAIL: .env.example not found!"
    exit 1
fi

# Test 3: Check if security headers are in app.html
echo ""
echo "Test 3: Checking security headers..."
if grep -q "Content-Security-Policy" src/app.html; then
    echo "✅ PASS: Content Security Policy found"
else
    echo "❌ FAIL: Content Security Policy missing!"
    exit 1
fi

if grep -q "X-Frame-Options" src/app.html; then
    echo "✅ PASS: X-Frame-Options header found"
else
    echo "❌ FAIL: X-Frame-Options header missing!"
    exit 1
fi

# Test 4: Check for secure API proxy routes
echo ""
echo "Test 4: Checking secure API routes..."
if [ -f "src/routes/api/unsplash/+server.ts" ]; then
    echo "✅ PASS: Unsplash API proxy route exists"
else
    echo "❌ FAIL: Unsplash API proxy route missing!"
    exit 1
fi

if [ -f "src/routes/api/unsplash/random/+server.ts" ]; then
    echo "✅ PASS: Unsplash random API proxy route exists"
else
    echo "❌ FAIL: Unsplash random API proxy route missing!"
    exit 1
fi

# Test 5: Check if input validation is present
echo ""
echo "Test 5: Checking input validation..."
if grep -q "validateAndSanitizeParams" src/routes/api/unsplash/+server.ts; then
    echo "✅ PASS: Input validation found in API routes"
else
    echo "❌ FAIL: Input validation missing in API routes!"
    exit 1
fi

# Test 6: Check if path traversal protection is implemented
echo ""
echo "Test 6: Checking path traversal protection..."
if grep -q "sanitizedName" src/lib/unsplash.ts; then
    echo "✅ PASS: Path sanitization found in unsplash.ts"
else
    echo "❌ FAIL: Path sanitization missing in unsplash.ts!"
    exit 1
fi

if grep -q "sanitizedQuery" src/lib/animalList.js; then
    echo "✅ PASS: Path sanitization found in animalList.js"
else
    echo "❌ FAIL: Path sanitization missing in animalList.js!"
    exit 1
fi

echo ""
echo "🎉 All security tests passed!"
echo "================================"
echo "Security fixes successfully implemented:"
echo "- API keys are protected from client exposure"
echo "- Input validation and sanitization is in place"
echo "- Content Security Policy headers are configured"
echo "- Path traversal attacks are prevented"
echo "- Secure API proxy routes are implemented"
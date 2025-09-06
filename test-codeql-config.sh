#!/bin/bash

# CodeQL Workflow Configuration Test
# This script validates the CodeQL Advanced workflow setup

echo "🔍 CodeQL Advanced Workflow Configuration Test"
echo "=============================================="

# Check if workflow file exists
WORKFLOW_FILE=".github/workflows/codeql.yml"
if [ ! -f "$WORKFLOW_FILE" ]; then
    echo "❌ ERROR: CodeQL workflow file not found at $WORKFLOW_FILE"
    exit 1
fi

echo "✅ CodeQL workflow file found"

# Check workflow configuration
echo ""
echo "📋 Checking workflow configuration..."

# Check for required sections
if grep -q "name: 'CodeQL Advanced'" "$WORKFLOW_FILE"; then
    echo "✅ Workflow name configured correctly"
else
    echo "❌ Workflow name missing or incorrect"
fi

if grep -q "javascript-typescript" "$WORKFLOW_FILE"; then
    echo "✅ JavaScript/TypeScript language configured"
else
    echo "❌ JavaScript/TypeScript language not configured"
fi

if grep -q "security-extended,security-and-quality" "$WORKFLOW_FILE"; then
    echo "✅ Security query suites configured"
else
    echo "❌ Security query suites not configured"
fi

if grep -q "security-events: write" "$WORKFLOW_FILE"; then
    echo "✅ Security events permission configured"
else
    echo "❌ Security events permission missing"
fi

# Check for important triggers
if grep -q "push:" "$WORKFLOW_FILE" && grep -q "pull_request:" "$WORKFLOW_FILE" && grep -q "schedule:" "$WORKFLOW_FILE"; then
    echo "✅ All required triggers configured (push, PR, schedule)"
else
    echo "❌ Missing required triggers"
fi

echo ""
echo "📄 Checking documentation..."

# Check if fix instructions exist
if [ -f "CODEQL_FIX_INSTRUCTIONS.md" ]; then
    echo "✅ CodeQL fix instructions documented"
else
    echo "❌ CodeQL fix instructions missing"
fi

# Check if README mentions CodeQL
if grep -q "CodeQL" README.md; then
    echo "✅ CodeQL mentioned in README"
else
    echo "❌ CodeQL not documented in README"
fi

echo ""
echo "🎯 Configuration Summary:"
echo "  • Language: JavaScript/TypeScript"
echo "  • Build Mode: None (interpreted language)"
echo "  • Query Suites: security-extended, security-and-quality"
echo "  • Triggers: Push, PR, Weekly schedule"
echo "  • Permissions: security-events write, packages read"

echo ""
echo "⚠️  IMPORTANT: To resolve workflow failures:"
echo "   1. Disable GitHub's default CodeQL setup in repository settings"
echo "   2. Navigate to Settings > Security > Code scanning"
echo "   3. Click 'Configure' on Default setup and disable it"
echo "   4. See CODEQL_FIX_INSTRUCTIONS.md for detailed steps"

echo ""
echo "📊 Expected Results After Fix:"
echo "  • CodeQL workflow runs successfully"
echo "  • SARIF files upload without conflicts"
echo "  • Security alerts appear in repository security tab"
echo "  • No more 'default setup enabled' errors"

echo ""
echo "✅ Configuration test complete!"
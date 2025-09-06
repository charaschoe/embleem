# 🔧 CodeQL Advanced Workflow Fix Instructions

## 🚨 CRITICAL ISSUE IDENTIFIED

**Problem:** CodeQL Advanced workflow has been failing repeatedly with the error:
```
Code Scanning could not process the submitted SARIF file:
CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled
```

**Root Cause:** GitHub has both default CodeQL setup AND advanced CodeQL configuration enabled simultaneously, which creates a conflict.

## ✅ SOLUTION: Disable Default CodeQL Setup

### Step 1: Access Repository Settings

1. Go to your GitHub repository: `https://github.com/charaschoe/embleem`
2. Click on **Settings** tab
3. Navigate to **Security** in the left sidebar
4. Click on **Code scanning**

### Step 2: Disable Default Setup

1. Look for the **Default setup** section
2. If you see "CodeQL default setup is **enabled**", click on the **Configure** button
3. In the configuration dialog, click **Disable CodeQL**
4. Confirm the action when prompted

### Step 3: Verify Advanced Setup

After disabling default setup:
1. The advanced CodeQL configuration in `.github/workflows/codeql.yml` will take over
2. Future workflow runs should complete successfully
3. You'll maintain the same security scanning capabilities with more control

## 🔍 VERIFICATION

### How to Confirm the Fix Works

1. **Trigger a new workflow run:**
   - Make a small commit to the `master` branch, OR
   - Go to Actions tab → CodeQL Advanced → Run workflow

2. **Check for success:**
   - The workflow should complete without the SARIF processing error
   - Code scanning results should appear in Security → Code scanning alerts

### Expected Outcome

- ✅ CodeQL workflow runs successfully
- ✅ SARIF file uploads without conflicts  
- ✅ Security alerts are properly processed
- ✅ No more "default setup is enabled" errors

## 📋 TECHNICAL DETAILS

### Current Advanced Configuration

The existing `.github/workflows/codeql.yml` file is properly configured with:
- **Language:** JavaScript/TypeScript
- **Build mode:** None (appropriate for interpreted languages)
- **Queries:** Security-extended and security-and-quality
- **Schedule:** Weekly on Fridays at 7:45 AM UTC
- **Triggers:** Push/PR to master branch

This configuration provides comprehensive security analysis and is more flexible than the default setup.

### Why This Conflict Occurs

GitHub's security scanning architecture doesn't allow both default and advanced CodeQL configurations to run simultaneously because:
1. Both would attempt to upload SARIF results to the same endpoints
2. This could create duplicate or conflicting analysis results
3. GitHub enforces this restriction to maintain data integrity

## 🛡️ SECURITY IMPACT

**No reduction in security coverage:** The advanced configuration provides the same (or better) security scanning as the default setup, with additional benefits:

- **More control** over query suites and analysis depth
- **Customizable scheduling** for analysis runs
- **Detailed logging** and debugging capabilities
- **Extensible configuration** for future security needs

## ❓ TROUBLESHOOTING

If the workflow still fails after following these steps:

1. **Wait 5-10 minutes** after disabling default setup for changes to propagate
2. **Check workflow permissions:** Ensure the workflow has `security-events: write` permission (already configured)
3. **Verify no other CodeQL workflows:** Ensure there aren't duplicate CodeQL workflow files
4. **Repository admin access:** This fix requires repository admin permissions

## 📞 SUPPORT

If you encounter any issues:
1. Check the workflow run logs in the Actions tab
2. Verify the default setup is actually disabled in Settings → Security → Code scanning
3. Ensure you have admin permissions on the repository

---

**Last Updated:** January 2025  
**Status:** Ready for implementation  
**Impact:** High - Fixes critical workflow failure
# SVG Import Issue - Quick Fix

## Problem
Create React App's webpack configuration is having issues processing SVG imports, causing build failures with the error:
```
TypeError: Cannot read properties of null (reading 'tagName')
```

## Solution
Keep SVGs in the `public/assets` folder and reference them with absolute paths.

## Files That Need SVG Import Reverted

Run these commands to revert SVG imports:

```bash
# The following files have SVG imports that need to be changed back to public folder paths:

# 1. utils/dragUtils.js - Vector.svg
# 2. components/CovenantTile.js - Vector (1).svg, shield-alert.svg  
# 3. components/DocumentCard.js - Vector.svg
# 4. components/DocumentTile.js - Vector.svg
# 5. components/common/ChartAnimations.js - Group 7.svg
# 6. components/common/GradientButton.jsx - Group 4.svg, Group 554.svg
# 7. components/PerformanceSection.js - Group 1010107907.svg
# 8. pages/data-simulator/DataSimulator.jsx - Group 4.svg, Group 554.svg
# 9. pages/y14-report-new/Y14ReportNew.jsx - builder-workflow.svg, detailed-findings.svg, ey-logo.svg
# 10. pages/y14-report/Y14ReportGeneration.jsx - Group 4.svg, Group 554.svg, operational-docu-scan.svg, balance-doc.svg
# 11. pages/landing-page/LandingPage.jsx - ey-logo.svg
# 12. pages/EnterpriseLoanServicing.jsx - ey-logo.svg
# 13. pages/operational-doc-scan/OperationalDocScan.jsx - detail-find2.svg
```

## Pattern to Follow

**Before:**
```javascript
import assetName from '../../assets/file.svg';
// ...
src={assetName}
```

**After:**
```javascript
// Remove the import
// ...
src="/assets/file.svg"
```

## Alternative: Use URL Loader

If you want to keep imports, add this to package.json and use CRACO:

```bash
npm install @craco/craco --save-dev
```

Then create `craco.config.js` to configure SVG handling.

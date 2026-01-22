# Quick Fix for Build Error

## Issue
SVG imports are causing webpack/Babel to fail with: `TypeError: Cannot read properties of null (reading 'tagName')`

## Root Cause
Create React App's default webpack configuration has issues processing large SVG files and certain SVG imports.

## Solution
Keep ALL SVGs in `public/assets` and use absolute paths instead of imports.

## Files Already Fixed
✅ utils/api.js - doc1-3.svg
✅ utils/dragUtils.js - Vector.svg
✅ pages/DocumentCentrePage.js - doc1-3.svg
✅ components/DocumentPreviewCard.js - doc1-3.svg
✅ components/DocumentCardDetails.js - doc1-3.svg
✅ components/OcrScanningSection.js - docu_scan.svg
✅ components/DocumentTile.js - Vector.svg
✅ components/DocumentCard.js - Vector.svg

## Files Still Need Fixing

Run these manual edits:

### 1. CovenantTile.js
Remove imports:
```javascript
import alertIcon from '../assets/Vector (1).svg';
import shieldAlertIcon from '../assets/shield-alert.svg';
```

Update getIndicatorIcon to return:
```javascript
icon: '/assets/Vector (1).svg'  // or '/assets/shield-alert.svg'
```

### 2. ChartAnimations.js
Remove: `import chartBgImage from '../../assets/Group 7.svg';`
Change: `backgroundImage: \`url('/assets/Group 7.svg')\``

### 3. GradientButton.jsx
Remove:
```javascript
import buttonActiveImg from '../../assets/Group 4.svg';
import buttonInactiveImg from '../../assets/Group 554.svg';
```
Change to: `'/assets/Group 4.svg'` and `'/assets/Group 554.svg'`

### 4. PerformanceSection.js
Remove: `import performanceMetrics from '../assets/Group 1010107907.svg';`
Change to: `src="/assets/Group 1010107907.svg"`

### 5. DataSimulator.jsx
Remove button SVG imports
Change to absolute paths

### 6. Y14ReportNew.jsx
Remove SVG imports (builder-workflow, detailed-findings, ey-logo)
Change to absolute paths

### 7. Y14ReportGeneration.jsx
Remove SVG imports
Change to absolute paths

### 8. LandingPage.jsx
Remove: `import eyLogo from '../../assets/ey-logo.svg';`
Change to: `src="/assets/ey-logo.svg"`

### 9. EnterpriseLoanServicing.jsx
Remove: `import eyLogo from '../assets/ey-logo.svg';`
Change to: `src="/assets/ey-logo.svg"`

### 10. OperationalDocScan.jsx
Remove: `import detailFind2Img from '../../assets/detail-find2.svg';`
Change to: `src="/assets/detail-find2.svg"`

## Quick Command
All SVGs have been copied to public/assets. Just need to update the imports in the remaining files.

## After Fix
Run: `npm run build` to verify
Then: `npm run tauri:build` to create desktop app

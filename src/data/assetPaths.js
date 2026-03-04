const ASSET_BASE_URL = process.env.REACT_APP_ASSET_BASE_URL || '';

// --- IMAGES ---
export const IMAGES = {
  OCR_BACKGROUND: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_OCR_Background.svg`,
  AUTOMATED_SERVICING: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Automated_Servicing.svg`,
  AUTOMATED_SERVICING_ALT: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Automated_Servicing_Alt.svg`,
  BALANCE_DOCUMENT: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Balance_Document.svg`,
  DELAYED_STATUS: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Delayed_Status.svg`,
  DOCUMENT_TEMPLATE_1: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Document_Template_1.svg`,
  DOCUMENT_TEMPLATE_2: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Document_Template_2.svg`,
  DOCUMENT_TEMPLATE_3: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Document_Template_3.svg`,
  EY_LOGO: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_EY_Logo.svg`,
  RATING_FRAME: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Rating_Frame.svg`,
  PERFORMANCE_SECTION: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Performance_Section.svg`,
  BUTTON_BACKGROUND_DEFAULT: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Button_Background_Default.svg`,
  BUTTON_BACKGROUND_ACTIVE: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Button_Background_Active.svg`,
  BUTTON_BACKGROUND_ALT: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Button_Background_Alt.svg`,
  CHART_BACKGROUND: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Chart_Background.svg`,
  LIGHT_CIRCLE_OUTLINE: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Light_Circle_Outline.svg`,
  LOAN_SERVICE: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Loan_Service.svg`,
  NAV_ARROW_RIGHT: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Nav_Arrow_Right.svg`,
  ON_TIME_STATUS: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_On_Time_Status.svg`,
  OPERATIONAL_DOC_SCAN_BG: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Operational_Doc_Scan_BG.svg`,
  PAGE_LAYOUT_2: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Page_Layout_2.svg`,
  QR_CODE: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_QR_Code.svg`,
  REPORT_WORKFLOW_STEP: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Report_Workflow_Step.svg`,
  REPORT_BUILDER_DOCUMENT: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Report_Builder_Document.svg`,
  SCANNED_DOC_PREVIEW: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Scanned_Doc_Preview.svg`,
  SHIELD_ALERT: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Shield_Alert.svg`,
  TRANSPARENT_COMPLIANCE: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Transparent_Compliance.svg`,
  VECTOR_ICON: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Vector_Icon.svg`,
  ALERT_ICON: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Alert_Icon.svg`,
  ARROW_ICON: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Arrow_Icon.svg`,
  COVENANT_CHECKS: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Covenant_Checks.svg`,
  ERRORS_ICON: `${ASSET_BASE_URL}/images/Connected_Commerce_Operate_Touch_Screen_Errors_Icon.svg`,
};

// --- ANNIMATIONS (Videos, GIFs, Lottie) ---
export const ANNIMATIONS = {
  DASHBOARD_BACKGROUND_VIDEO: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_Dashboard_Background_Video.mp4`,
  LOAN_BACKGROUND_VIDEO: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_Loan_Background_Video.mp4`,
  LANDING_PAGE_VIDEO: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_Landing_Page_Video.mp4`,
  DOCUMENT_SCANNING_VIDEO: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_Document_Scanning_Video.mp4`,
  AI_UI_LARGE_GIF: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_AI_UI_Large.gif`,
  AI_UI_MEDIUM_GIF: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_AI_UI_Medium.gif`,
  FINANCIAL_DRIVERS_LOTTIE: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_Financial_Drivers.json`,
  QUARTERLY_DSCR_LOTTIE: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_Quarterly_DSCR.json`,
  AI_ANIMATION_LOTTIE: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_AI_Animation.json`,
  FEEDBACK_ANIMATION_LOTTIE: `${ASSET_BASE_URL}/annimations/Connected_Commerce_Operate_Touch_Screen_Feedback_Animation.json`,
};

// --- MUSIC ---
export const MUSIC = {
  BUTTON_CLICK: `${ASSET_BASE_URL}/music/Connected_Commerce_Operate_Touch_Screen_Button_Click.mp3`,
};

const DEFAULT_ASSETS = {
  ...IMAGES,
  ...ANNIMATIONS,
  ...MUSIC,
};

export default DEFAULT_ASSETS;

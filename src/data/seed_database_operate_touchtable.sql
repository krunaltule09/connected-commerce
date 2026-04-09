-- Seed data for BCM Operate TouchTable

-- Insert Persona
INSERT INTO "PERSONA" (station, sector, role) VALUES ('operate', 'BCM', 'touch_table');

-- Insert Screens
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'landing_page',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'enterprise_loan_servicing',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'document_centre',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'financial_dashboard',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'anomaly_detection',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'y14_report',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'operational_doc_scan',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'data_simulator',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);
INSERT INTO "SCREEN" (screen_name, persona_id)
VALUES (
    'feedback',
    (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')
);

-- Insert Visualizations

-- Screen: landing_page
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Hero Section',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'landing_page' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'hero_banner'
);

-- Screen: enterprise_loan_servicing
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Page Header',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'title_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Activate Button',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'cta_button'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Service Menu',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'menu_grid'
);

-- Screen: document_centre
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Case Information',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'header_info'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Documents Summary',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'header_info'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Document List',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'document_grid'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Scan Action',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'action_button'
);

-- Screen: financial_dashboard
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'OCR Scanning',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'scanning_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Financial Metrics',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'metrics_grid'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'AI Recommendations',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'alert_panel'
);

-- Screen: anomaly_detection
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Quarterly DSCR',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'bar_chart'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Financial Drivers',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'area_chart'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'AI Recommendations',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'text_panel'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Q3 Highlight',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'highlight_list'
);

-- Screen: y14_report
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Schedule Template',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'accordion_form'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Report Builder Workflow',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'workflow_steps'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Detailed Findings',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'findings_panel'
);

-- Screen: operational_doc_scan
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'OCR Scanning',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'scanning_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'AI Alert',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'alert_chip'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Shipment Details',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'data_table'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Operational Findings',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'findings_cards'
);

-- Screen: data_simulator
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Page Header',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'title_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Speed Metrics',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'timeline_comparison'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Accuracy Metrics',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'metrics_cards'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Compliance Alerts',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'alert_cards'
);

-- Screen: feedback
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type)
VALUES (
    'Feedback Form',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'feedback' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'interactive_feedback'
);

-- Insert Data Set Mappings

-- Screen: landing_page
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Hero Section' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'landing_page' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"heading": "Reimagining Covenant Monitoring", "subheading": "Turning covenant monitoring from a reactive task into a proactive advantage.", "cta_label": "Start Journey", "cta_target": "/explore"}'
);

-- Screen: enterprise_loan_servicing
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Page Header' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"main_title": "Enterprise Loan Servicing", "subtitle": "Case: Vertex Logistics Corp - $21 MM Working Capital Facility"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Activate Button' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"label": "Touch here to activate servicing mode", "target": "/document-centre"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Service Menu' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"services": [{"id": 1, "name": "Loan Agreement", "description": "Manage and track loan agreements, terms, and conditions", "path": "/loan-agreement"}, {"id": 2, "name": "Covenant Register", "description": "Monitor and manage loan covenants and compliance requirements", "path": "/covenant-register"}, {"id": 3, "name": "FR Y-14 Reporting", "description": "Federal Reserve Y-14 regulatory reporting and submissions", "path": "/y14-report"}, {"id": 4, "name": "Financials & ESG Reports", "description": "Financial statements and Environmental, Social, and Governance reports", "path": "/financials-esg"}, {"id": 5, "name": "KYC/AML file", "description": "Know Your Customer and Anti-Money Laundering documentation and verification", "path": "/kyc-aml"}, {"id": 6, "name": "Risk Dashboard", "description": "Comprehensive risk monitoring and analytics dashboard", "path": "/risk-dashboard"}, {"id": 7, "name": "Client Communication", "description": "Client communication portal and messaging system", "path": "/client-communication"}, {"id": 8, "name": "Blockchain ledger", "description": "Distributed ledger technology for transaction tracking and verification", "path": "/blockchain-ledger"}]}'
);

-- Screen: document_centre
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Case Information' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"case_number": "Case no. #CCN3267890", "applied_by": "Logistics Company"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Documents Summary' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Documents Received", "count": 8}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Document List' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"documents": [{"id": 1, "name": "Loan Agreement", "url": null, "description": "Primary loan agreement document outlining terms and conditions", "type": "pdf", "filename": "Loan_Agreement.pdf"}, {"id": 2, "name": "Financial Statement", "url": null, "description": "Company financial statements and performance metrics", "type": "pdf", "filename": "Financial_Statement.pdf"}, {"id": 3, "name": "Covenant Summary", "url": null, "description": "Summary of loan covenants and compliance tracking", "type": "xlsx", "filename": "Covenant_Summary.xlsx"}, {"id": 4, "name": "ESG Report 02", "url": null, "description": "Environmental, Social, and Governance report", "type": "pdf", "filename": "ESG_Report_02.pdf"}, {"id": 5, "name": "FR Y-14 Analysis", "url": null, "description": "Federal Reserve Y-14 regulatory analysis and reporting", "type": "pdf", "filename": "FR_Y_14_Analysis.pdf"}, {"id": 6, "name": "Risk Assessment", "url": null, "description": "Comprehensive risk assessment document", "type": "docx", "filename": "Risk_Assessment.docx"}, {"id": 7, "name": "Balance Sheet", "url": null, "description": "Company balance sheet and financial position", "type": "xlsx", "filename": "Balance_Sheet.xlsx"}, {"id": 8, "name": "Quarterly Report", "url": null, "description": "Quarterly financial and operational report", "type": "pdf", "filename": "Quarterly_Report.pdf"}, {"id": 9, "name": "Compliance Certificate", "url": null, "description": "Compliance certification and regulatory documentation", "type": "pdf", "filename": "Compliance_Certificate.pdf"}, {"id": 10, "name": "Market Analysis", "url": null, "description": "Market analysis and industry trends presentation", "type": "pptx", "filename": "Market_Analysis.pptx"}, {"id": 11, "name": "Credit Approval", "url": null, "description": "Credit approval documentation and decision rationale", "type": "pdf", "filename": "Credit_Approval.pdf"}, {"id": 12, "name": "Facility Agreement", "url": null, "description": "Facility agreement terms and conditions", "type": "pdf", "filename": "Facility_Agreement.pdf"}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Scan Action' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"label": "Scan Documents", "target": "/financial-dashboard"}'
);

-- Screen: financial_dashboard
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'OCR Scanning' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "OCR Document Scanning", "status": "Processing financial statements..."}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Financial Metrics' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"metrics": {"Revenue": {"dataPoints": [["Jul", 175], ["Aug", 176], ["Sep", 177], ["Oct", 178], ["Nov", 178], ["Dec", 178]], "unit": "M", "infoLines": ["Revenue growth supports minimum turnover covenant, reducing risk of operating underperformance.", "Stable YoY increase indicates low likelihood of cash-flow stress, supporting DSCR maintenance."]}, "EBITDA": {"dataPoints": [["Jul", 14.2], ["Aug", 14.4], ["Sep", 14.6], ["Oct", 14.8], ["Nov", 14.9], ["Dec", 14.9]], "unit": "M", "infoLines": ["Rising EBITDA strengthens Debt/EBITDA covenant compliance, improving borrower creditworthiness.", "Sustained profitability trend reduces risk of breach on interest coverage or leverage covenants."]}, "Debt": {"dataPoints": [["Jul", 41.2], ["Aug", 41.5], ["Sep", 41.8], ["Oct", 42.2], ["Nov", 42.5], ["Dec", 42.5]], "unit": "M", "infoLines": ["Current leverage remains within allowable Debt/EBITDA thresholds, though trending upward.", "Monitoring required to avoid breaching maximum leverage or total indebtedness covenants."]}, "Equity": {"dataPoints": [["Jul", 20.2], ["Aug", 20.5], ["Sep", 20.8], ["Oct", 21.2], ["Nov", 21.4], ["Dec", 21.4]], "unit": "M", "infoLines": ["Stable equity position supports Net Worth / Equity Maintenance covenants.", "Equity cushion reduces risk of LTV covenant deterioration during adverse market cycles."]}, "Interest Expense": {"dataPoints": [["Jul", 2.8], ["Aug", 2.9], ["Sep", 3.0], ["Oct", 3.1], ["Nov", 3.2], ["Dec", 3.2]], "unit": "M", "infoLines": ["Rising interest expense may pressure Interest Coverage covenants if EBITDA slows.", "Higher servicing costs could impact DSCR compliance, requiring ongoing monitoring."]}}}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'AI Recommendations' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "AI Recommendations", "alerts": ["DSCR declined to 0.92 this cycle, breaching the 1.25 covenant."]}'
);

-- Screen: anomaly_detection
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Quarterly DSCR' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Quarterly DSCR", "subtitle": "Covenant threshold line", "threshold_value": 1.25, "data_points": [{"quarter": "Jul-Sep", "dscr": 1.21, "period": "FY 24-25 Q1", "threshold": 1.25}, {"quarter": "Oct-Dec", "dscr": 1.05, "period": "FY 24-25 Q2", "threshold": 1.25}, {"quarter": "Jan-Mar", "dscr": 1.07, "period": "FY 24-25 Q3", "threshold": 1.25}, {"quarter": "Apr-Jun", "dscr": 0.92, "period": "FY 24-25 Q4", "threshold": 1.25}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Financial Drivers' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Quarter-by-quarter financial drivers", "data_points": [{"quarter": "Q1", "cashFlow": 15000, "interest": 15000, "debt": 15000}, {"quarter": "Q2", "cashFlow": 18000, "interest": 17500, "debt": 16800}, {"quarter": "Q3", "cashFlow": 25500, "interest": 23000, "debt": 21000}, {"quarter": "Q4", "cashFlow": 36000, "interest": 31000, "debt": 27000}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'AI Recommendations' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "AI Recommendations", "recommendations": ["Declining DSCR driven by lower operating cash flows and softening freight activity.", "DSCR declined to 0.92 this cycle, breaching the 1.25 covenant.", "Sustained downward trend over the past two quarters.", "Action required: Enhanced monitoring and borrower engagement recommended.", "Recommended: Reassess expense control and cash acceleration program."]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Q3 Highlight' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Q3 Highlight", "highlights": [{"title": "DSCR Weakened", "description": "DSCR weakened significantly despite OTD improvement—cash collections did not keep pace with fuel and lease cost upticks.", "metric": "-22%"}, {"title": "Freight Volumes Dropped", "description": "Freight volumes dropped 4.5% QoQ, particularly in Midwest lanes.", "metric": "-4.5%"}, {"title": "Fuel Hedge Shortfalls", "description": "Fuel hedge shortfalls and increased detention charges strained operating margins.", "metric": "-12.5%"}, {"title": "On-Time Delivery", "description": "OTD at 94%, below the required 95% covenant threshold.", "metric": "94%"}, {"title": "DSCR Breach", "description": "DSCR declined to 0.92 this cycle, breaching the 1.25 covenant.", "metric": "0.92"}]}'
);

-- Screen: y14_report
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Schedule Template' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "FR Y-14 Schedule Template", "sections": [{"id": 1, "title": "Borrower / Obligor Information", "rows": [{"label": "Obligor name", "value": "Vertex Logistics Corp."}, {"label": "Obligor ID", "value": "00492-WHSL"}, {"label": "Country", "value": "United States"}, {"label": "Industry/NAICS code", "value": "488510 – Freight Transportation Arrangement"}, {"label": "Obligor type", "value": "Corporate"}]}, {"id": 2, "title": "Loan Characteristics", "rows": [{"label": "Loan Type", "value": "Working Capital Revolver"}, {"label": "Origination Date", "value": "15-Jan-21"}, {"label": "Maturity Date", "value": "15-Jan-26"}, {"label": "Original Commitment", "value": "$1,80,00,000"}, {"label": "Current Outstanding Balance", "value": "$1,42,00,000"}, {"label": "Unused Commitment", "value": "$38,00,000"}, {"label": "Interest Rate Type", "value": "Floating (SOFR + 2.10%)"}, {"label": "Current Interest Rate", "value": "7.35%"}, {"label": "Payment Frequency", "value": "Monthly"}, {"label": "Next Payment Due", "value": "12/10/2025"}]}, {"id": 3, "title": "Collateral Information", "rows": [{"label": "Collateral Type", "value": "Accounts Receivable + Inventory"}, {"label": "Collateral Code", "value": "24"}, {"label": "Collateral Value", "value": "$2,10,00,000"}, {"label": "LTV (Calculated)", "value": "64%"}, {"label": "Lien Position", "value": "1st Lien"}, {"label": "Guarantee Indicator", "value": "Yes (Corporate Guarantee)"}, {"label": "Guarantee Amount", "value": "$1,80,00,000"}]}, {"id": 4, "title": "Covenant Information (Extracted)", "type": "covenant_table", "rows": [{"covenant_name": "DSCR", "threshold": "≥ 1.25", "current_value": "0.92", "status": "Breached", "status_color": "#F44336"}, {"covenant_name": "LTV", "threshold": "≤ 70%", "current_value": "64%", "status": "Compliant", "status_color": "#4CAF50"}, {"covenant_name": "Leverage Ratio", "threshold": "≤ 3.00x", "current_value": "1.99x", "status": "Compliant", "status_color": "#4CAF50"}, {"covenant_name": "ESG Filing", "threshold": "Q2 Filing Required", "current_value": "Overdue", "status": "Breached", "status_color": "#F44336"}, {"covenant_name": "Financial Reporting", "threshold": "Quarterly, within 30 days", "current_value": "Submitted", "status": "Compliant", "status_color": "#4CAF50"}]}, {"id": 5, "title": "Credit Quality & Risk Metrics", "rows": [{"label": "Internal Risk Rating", "value": "6 (Moderate Risk)"}, {"label": "Prob. of Default (PD)", "value": "1.90%"}, {"label": "Loss Given Default (LGD)", "value": "38%"}, {"label": "Exposure at Default (EAD)", "value": "$1,80,00,000"}, {"label": "Accrued Interest", "value": "$72,400"}, {"label": "Non-Accrual Indicator", "value": "No"}, {"label": "Troubled Debt Restructuring", "value": "No"}]}, {"id": 6, "title": "Performance & Payment Info", "rows": [{"label": "Days Past Due", "value": "0"}, {"label": "Past Due Indicator", "value": "No"}, {"label": "Last Payment Date", "value": "12-Sep-25"}, {"label": "Next Payment Date", "value": "12-Oct-25"}, {"label": "Payment Status", "value": "Current"}, {"label": "Interest Expense (YTD)", "value": "$21,00,00,000"}]}, {"id": 7, "title": "Accounting & Reporting Attributes", "rows": [{"label": "Accounting Standard", "value": "GAAP"}, {"label": "Accrual Status", "value": "Performing"}, {"label": "Impairment Status", "value": "Not Impaired"}, {"label": "Charge-Off Amount", "value": "$0"}, {"label": "Restructured Indicator", "value": "No"}, {"label": "Basel Exposure Class", "value": "Corporate Exposure"}]}, {"id": 8, "title": "Regulatory Schedule Mapping (Meta Fields)", "rows": [{"label": "DSCR (Reported)", "value": "0.92"}, {"label": "DSCR (Trend YoY)", "value": "-22%"}, {"label": "LTV (Reported)", "value": "64%"}, {"label": "EBITDA (TTM)", "value": "$14.9M"}, {"label": "Revenue (TTM)", "value": "$178M"}, {"label": "Total Debt", "value": "$42.5M"}, {"label": "Equity", "value": "$21.4M"}, {"label": "Covenant Breach", "value": "DSCR declined to 0.92 this cycle"}, {"label": "Remediation Plan", "value": "Cash acceleration program, fuel surcharge revision"}, {"label": "Internal Comments", "value": "DSCR breach confirmed; OTD/OTIF warnings"}, {"label": "Stress Scenario Tested", "value": "Revenue – 10% = DSCR falls to 0.78"}]}], "actions": [{"label": "Submit to Regulator", "type": "primary"}, {"label": "Save Drafts", "type": "secondary"}, {"label": "Generate PDF", "type": "secondary"}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Report Builder Workflow' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Report Builder Workflow", "description": "Visual workflow representation"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Detailed Findings' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Detailed Findings", "description": "Comprehensive analysis results"}'
);

-- Screen: operational_doc_scan
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'OCR Scanning' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "OCR Document Scanning", "status": "Processing operational documents..."}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'AI Alert' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"message": "Shipment 2845 delivered late (9/22 vs 9/20)"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Shipment Details' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Shipment Details", "columns": ["Shipment #", "Promised Delivery Date", "Actual Delivery Date", "Status", "Actions"], "rows": [{"shipment": "Shipment 1", "promised": "12 Aug 2025", "actual": "10 Aug 2025", "status": "early"}, {"shipment": "Shipment 2", "promised": "02 Jun 2025", "actual": "01 Jun 2025", "status": "on-time"}, {"shipment": "Shipment 3", "promised": "01 May 2025", "actual": "10 May 2025", "status": "delayed"}, {"shipment": "Shipment 4", "promised": "12 Apr 2025", "actual": "12 Apr 2025", "status": "on-time"}, {"shipment": "Shipment 5", "promised": "25 Mar 2025", "actual": "25 Mar 2025", "status": "on-time"}, {"shipment": "Shipment 6", "promised": "14 Feb 2025", "actual": "16 Feb 2025", "status": "delayed"}, {"shipment": "Shipment 7", "promised": "02 Feb 2025", "actual": "02 Feb 2025", "status": "on-time"}, {"shipment": "Shipment 8", "promised": "26 Jan 2025", "actual": "26 Jan 2025", "status": "on-time"}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Operational Findings' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Detailed Findings", "findings": [{"title": "On-Time Delivery (OTIF) Impact", "section": "Tracking OTIF dropped to 91%, missing covenant threshold", "usedFor": "Analyze root cause: late pickups, route inefficiency, or carrier performance"}, {"title": "Promised vs Delivered Variance", "section": "Delivery lead times vary ±60% (2-10 days), impacting cash flow", "usedFor": "Standardize lead time estimates and improve forecasting accuracy"}, {"title": "Cost Per Mile / Unit Cost Pressure", "section": "Analyze cost per mile vs $2.00/mi, within allowed limit", "usedFor": "Identify cost drivers: fuel, labor, maintenance, or route optimization gaps"}, {"title": "Capacity Utilization Decline", "section": "Flagging utilization at 78%, impacting fixed cost absorption", "usedFor": "Review load planning and asset allocation to improve utilization rates"}, {"title": "OTIF Gap/Time to Fulfil", "section": "Tracking OTIF at 91% (Above 90%)", "usedFor": "Monitor performance trends and identify improvement opportunities"}]}'
);

-- Screen: data_simulator
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Page Header' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Data Simulator", "tabs": ["Benefit Blocks", "ROI Calculator", "Case Studies / Benchmarks"]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Speed Metrics' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Speed", "subtitle": "Before/After Impact Timeline", "before": {"value": "3 Days", "label": "Earlier (Without AI Integration)"}, "after": {"value": "41 Minutes", "label": "Now (with AI)"}}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Accuracy Metrics' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Accuracy (OCR/NLP Error Reduction Metrics)", "metrics": [{"title": "Faster Covenant Checks", "points": ["Global Logistics Provider secured 65% faster Covenant Checks.", "XYZ Company secured 35% faster Covenant Checks."]}, {"title": "Fewer Errors", "points": ["Global Logistics Provider, reduced 40% error in processing.", "XYZ Company, reduced 40% error in processing."]}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Compliance Alerts' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Compliance", "alerts": [{"type": "critical", "title": "Proactive Alerts", "details": [{"label": "Tampered Recipient", "value": "XYZ Holdings (Offshore)"}, {"label": "Tampered Routing Path", "value": "Rerouted through unknown server node (Hong Kong)"}, {"label": "Blockchain Hash Check", "value": "Mismatch – integrity violated"}]}, {"type": "warning", "title": "Missed breaches in manual process", "details": [{"label": "Covenant Breach", "value": "DEBT RATIO EXCEEDED"}, {"label": "Reporting Deadline", "value": "MISSED BY 3 DAYS"}, {"label": "Document Verification", "value": "INCOMPLETE"}]}]}'
);

-- Screen: feedback
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set)
VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Feedback Form' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'feedback' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Share Your Experience", "options": [{"type": "delivery", "label": "Delivery Options"}, {"type": "rating", "label": "Rate Your Experience"}], "cta_label": "Back to home", "cta_target": "/"}'
);

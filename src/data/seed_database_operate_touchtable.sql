-- Seed data for BCM Operate TouchTable

-- Insert Persona
INSERT INTO "PERSONA" (station, sector, role) VALUES ('operate', 'BCM', 'touch_table');

-- Insert Screens
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('landing_page', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('enterprise_loan_servicing', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('document_centre', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('financial_dashboard', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('anomaly_detection', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('y14_report', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('operational_doc_scan', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('data_simulator', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));
INSERT INTO "SCREEN" (screen_name, persona_id) VALUES ('feedback', (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'));

-- Insert Visualizations

-- Screen: landing_page
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Hero Section',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'landing_page' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'hero_banner'
);

-- Screen: enterprise_loan_servicing
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Page Header',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'title_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Activate Button',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'cta_button'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Service Menu',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'menu_grid'
);

-- Screen: document_centre
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Case Information',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'header_info'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Documents Summary',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'header_info'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Document List',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'document_grid'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Scan Action',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'action_button'
);

-- Screen: financial_dashboard
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'OCR Scanning',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'scanning_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Financial Metrics',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'metrics_grid'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'AI Recommendations',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'alert_panel'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Covenant Status',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'covenant_status'
);

-- Screen: anomaly_detection
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Quarterly DSCR',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'bar_chart'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Financial Drivers',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'area_chart'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'AI Recommendations',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'text_panel'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Q3 Highlight',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'highlight_list'
);

-- Screen: y14_report
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Schedule Template',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'accordion_form'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Report Builder Workflow',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'workflow_steps'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Tab Labels',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'tab_navigation'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Detailed Findings',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'findings_panel'
);

-- Screen: operational_doc_scan
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'OCR Scanning',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'scanning_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'AI Alert',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'alert_chip'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Shipment Details',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'data_table'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Operational Findings',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'findings_cards'
);

-- Screen: data_simulator
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Page Header',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'title_section'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Speed Metrics',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'timeline_comparison'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Accuracy Metrics',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'metrics_cards'
);
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Compliance Alerts',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'alert_cards'
);

-- Screen: feedback
INSERT INTO "VISUALIZATION" (title, screen_id, chart_type) VALUES (
    'Feedback Form',
    (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'feedback' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table')),
    'interactive_feedback'
);

-- Insert Data Set Mappings

-- Screen: landing_page
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Hero Section' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'landing_page' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"heading": "Reimagining Covenant Monitoring", "subheading": "Turning covenant monitoring from a reactive task into a proactive advantage.", "cta_label": "Start Journey", "cta_target": "/explore"}'
);

-- Screen: enterprise_loan_servicing
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Page Header' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"main_title": "Enterprise Loan Servicing", "subtitle": "Case: Vertex Logistics Corp - $21 MM Working Capital Facility"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Activate Button' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"label": "Touch here to activate servicing mode", "target": "/document-centre"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Service Menu' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'enterprise_loan_servicing' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"services": [{"id": 1, "name": "Loan Agreement", "description": "Manage and track loan agreements, terms, and conditions", "path": "/loan-agreement"}, {"id": 2, "name": "Covenant Register", "description": "Monitor and manage loan covenants and compliance requirements", "path": "/covenant-register"}, {"id": 3, "name": "FR Y-14 Reporting", "description": "Federal Reserve Y-14 regulatory reporting and submissions", "path": "/y14-report"}, {"id": 4, "name": "Financials & ESG Reports", "description": "Financial statements and Environmental, Social, and Governance reports", "path": "/financials-esg"}, {"id": 5, "name": "KYC/AML file", "description": "Know Your Customer and Anti-Money Laundering documentation and verification", "path": "/kyc-aml"}, {"id": 6, "name": "Risk Dashboard", "description": "Comprehensive risk monitoring and analytics dashboard", "path": "/risk-dashboard"}, {"id": 7, "name": "Client Communication", "description": "Client communication portal and messaging system", "path": "/client-communication"}, {"id": 8, "name": "Blockchain ledger", "description": "Distributed ledger technology for transaction tracking and verification", "path": "/blockchain-ledger"}]}'
);

-- Screen: document_centre
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Case Information' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"case_number": "Case no. #CCN3267890", "applied_by": "Vertex Logistics Company"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Documents Summary' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Documents Received", "count": 8}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Document List' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"documents": [{"id": 1, "name": "Loan Agreement", "url": null, "description": "Primary loan agreement document outlining terms and conditions", "type": "pdf", "filename": "Loan_Agreement.pdf"}, {"id": 2, "name": "Financial Statement", "url": null, "description": "Company financial statements and performance metrics", "type": "pdf", "filename": "2024_Q2_Financials.pdf"}, {"id": 3, "name": "Covenant Summary", "url": null, "description": "Summary of loan covenants and compliance tracking", "type": "xlsx", "filename": "Covenant_Summary.xlsx"}, {"id": 4, "name": "ESG Report 02", "url": null, "description": "Environmental, Social, and Governance report", "type": "pdf", "filename": "ESG_Report_Q2.pdf"}, {"id": 5, "name": "FR Y-14 Analysis", "url": null, "description": "Federal Reserve Y-14 regulatory analysis and reporting", "type": "pdf", "filename": "Fleet_Lease_Agreements.pdf"}, {"id": 6, "name": "Risk Assessment", "url": null, "description": "Comprehensive risk assessment document", "type": "docx", "filename": "Risk_Assessment.docx"}, {"id": 7, "name": "Balance Sheet", "url": null, "description": "Company balance sheet and financial position", "type": "xlsx", "filename": "Balance_Sheet.xlsx"}, {"id": 8, "name": "Quarterly Report", "url": null, "description": "Quarterly financial and operational report", "type": "pdf", "filename": "Quarterly_Report.pdf"}, {"id": 9, "name": "Compliance Certificate", "url": null, "description": "Compliance certification and regulatory documentation", "type": "pdf", "filename": "Compliance_Certificate.pdf"}, {"id": 10, "name": "Market Analysis", "url": null, "description": "Market analysis and industry trends presentation", "type": "pptx", "filename": "Market_Analysis.pptx"}, {"id": 11, "name": "Credit Approval", "url": null, "description": "Credit approval documentation and decision rationale", "type": "pdf", "filename": "Credit_Approval.pdf"}, {"id": 12, "name": "Facility Agreement", "url": null, "description": "Facility agreement terms and conditions", "type": "pdf", "filename": "Facility_Agreement.pdf"}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Scan Action' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'document_centre' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"label": "Scan Documents", "target": "/financial-dashboard"}'
);

-- Screen: financial_dashboard
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'OCR Scanning' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "OCR Document Scanning", "status": "Processing financial statements..."}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Financial Metrics' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"metrics": {"Revenue": {"dataPoints": [["2021 (COVID Impact)", 142], ["2022 (Recovery Begins)", 158], ["2023 (Peak Recovery)", 186], ["2024 (Normalization)", 182], ["2025 (Current - Stress)", 178]], "unit": "M", "infoLines": ["Strong post-COVID recovery followed by normalization; current revenue at $178M reflects cyclical freight softening rather than customer attrition.", "Volume pressure is industry-driven, with no evidence of structural demand loss."]}, "EBITDA": {"dataPoints": [["2021 (COVID Impact)", 9.8], ["2022 (Recovery Begins)", 12.6], ["2023 (Peak Recovery)", 19.4], ["2024 (Normalization)", 17.8], ["2025 (Current - Stress)", 14.9]], "unit": "M", "infoLines": ["EBITDA expanded materially during the recovery phase but declined to $14.9M as fuel, labor, and detention costs outpaced revenue.", "Margin compression is the primary contributor to weakened debt-servicing capacity this cycle."]}, "Debt": {"dataPoints": [["2021 (COVID Impact)", 38], ["2022 (Recovery Begins)", 40], ["2023 (Peak Recovery)", 41], ["2024 (Normalization)", 42], ["2025 (Current - Stress)", 43]], "unit": "M", "infoLines": ["Total debt increased gradually to $42.5M, largely driven by fleet investment and lease obligations.", "No evidence of aggressive leverage or debt-funded expansion during the current stress period."]}, "Equity": {"dataPoints": [["2021 (COVID Impact)", 18.5], ["2022 (Recovery Begins)", 19.4], ["2023 (Peak Recovery)", 20.6], ["2024 (Normalization)", 21.2], ["2025 (Current - Stress)", 21.4]], "unit": "M", "infoLines": ["Equity has grown steadily to $21.4M through retained earnings, providing balance-sheet support.", "Equity growth has moderated in line with reduced profitability in the current cycle."]}, "Interest Expense": {"dataPoints": [["2021 (COVID Impact)", 2.6], ["2022 (Recovery Begins)", 2.8], ["2023 (Peak Recovery)", 3], ["2024 (Normalization)", 3.1], ["2025 (Current - Stress)", 3.2]], "unit": "M", "infoLines": ["Interest expense increased incrementally to $3.2M, reflecting higher base rates on a stable debt balance.", "Elevated interest costs have amplified the impact of EBITDA compression on DSCR."]}}}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'AI Recommendations' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "AI Recommendations", "alerts": ["Earnings‑driven DSCR breach identified: margin compression and higher interest costs—not leverage—are driving coverage deterioration; remediation should focus on cash flow improvement and cost controls."]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Covenant Status' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'financial_dashboard' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Covenant Status", "covenants": [{"name": "DSCR", "value": "0.92 (limit 1.25)", "indicator": "Alert", "status": "alert"}, {"name": "Debt/Equity", "value": "1.99x (limit 3.0)", "indicator": "Warning", "status": "warning"}, {"name": "Current Ratio", "value": "1.42", "indicator": "Alert", "status": "alert"}]}'
);

-- Screen: anomaly_detection
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Quarterly DSCR' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Quarterly DSCR", "subtitle": "Covenant threshold line", "threshold_value": "1.25%", "data_points": [{"quarter": "Q1", "dscr": 1.18, "period": "FY 24-25 Q1", "threshold": 1.25}, {"quarter": "Q2", "dscr": 1.05, "period": "FY 24-25 Q2", "threshold": 1.25}, {"quarter": "Q3", "dscr": 0.97, "period": "FY 24-25 Q3", "threshold": 1.25}, {"quarter": "Q4", "dscr": 0.92, "period": "FY 24-25 Q4", "threshold": 1.25}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Financial Drivers' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Quarter-by-quarter financial drivers", "data_points": [{"quarter": "Q1", "dscr": 1.18, "ebitdaMargin": 10.40, "cashFlowCoverageRatio": 8.3, "keySignal": "Strong earnings and cash coverage"}, {"quarter": "Q2", "dscr": 1.05, "ebitdaMargin": 9.60, "cashFlowCoverageRatio": 7, "keySignal": "Margin compression begins"}, {"quarter": "Q3", "dscr": 0.97, "ebitdaMargin": 8.90, "cashFlowCoverageRatio": 6, "keySignal": "Cash flow weakens"}, {"quarter": "Q4 (Current)", "dscr": 0.92, "ebitdaMargin": 8.40, "cashFlowCoverageRatio": 5.5, "keySignal": ""}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'AI Recommendations' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "AI Recommendations", "recommendations": ["Operating cash flow dipped due to higher detention and overtime costs.", "Interest and lease costs grew faster than revenue - direct DSCR impact.", "Risk of consecutive breaches if cost actions not taken.", "Recommended: renegotiate carrier contracts, accelerate AR collections, reduce miles."]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Q3 Highlight' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'anomaly_detection' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Q3 Highlight", "highlights": [{"title": "DSCR Improvement", "description": "DSCR improved briefly from 0.97 to 0.99, but declined to 0.92, remaining below the 1.25 covenant due to sustained margin pressure.", "metric": "0.92"}, {"title": "Cash Flow Growth", "description": "Operating cash flow rose temporarily from $17.6M to $19.2M, supported by faster receivables, but remains below prior-quarter levels.", "metric": "+9.1%"}, {"title": "Interest Costs Stabilized", "description": "Interest expense stabilized at $3.2M QoQ, as debt held steady at $42.5M, preventing further coverage deterioration.", "metric": "$3.2M"}, {"title": "Delayed Shipments Reduced", "description": "Shipment delays declined from 5 to 3 days, improving fulfillment rates and supporting incremental cash flow recovery.", "metric": "-40%"}, {"title": "Operating Revenue Rebounded", "description": "Revenue rebounded modestly to $178M, driven by improved fulfillment performance rather than volume-led growth.", "metric": "$178M"}]}'
);

-- Screen: y14_report
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Schedule Template' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "FR Y-14 Schedule Template", "sections": [{"id": 2, "title": "Loan Characteristics", "rows": [{"label": "Facility Type", "value": "Senior Secured Term Loan + Revolver"}, {"label": "Committed Amount", "value": "USD $20,000,000"}, {"label": "Maturity Date", "value": "April 2029"}]}, {"id": 3, "title": "Collateral Information", "rows": [{"label": "Primary Collateral", "value": "Accounts Receivable, Fleet Vehicles, Trailers"}, {"label": "Estimated Collateral Value", "value": "USD $54.0M"}, {"label": "Lien Position", "value": "First-priority perfected lien"}]}, {"id": 4, "title": "Covenant Information (Extracted)", "type": "covenant_table", "rows": [{"covenant_name": "DSCR", "threshold": ">= 1.25x", "current_value": "0.92", "status": "Breach", "status_color": "#F44336"}, {"covenant_name": "Debt / Equity", "threshold": "<= 3.0x", "current_value": "1.99x", "status": "Compliant", "status_color": "#4CAF50"}, {"covenant_name": "Liquidity", "threshold": ">= 1.30", "current_value": "1.42", "status": "Warning Range", "status_color": "#FF9800"}]}, {"id": 5, "title": "Credit Quality & Risk Metrics", "rows": [{"label": "Internal Risk Rating", "value": "BB+ (Watchlist)"}, {"label": "Prob. of Default (PD)", "value": "0.85%"}, {"label": "Loss Given Default (LGD)", "value": "40%"}]}, {"id": 6, "title": "Performance & Payment Info", "rows": [{"label": "Debt Service Status", "value": "Current; no payment delinquency"}, {"label": "Amortization Amount", "value": "$210K per month"}, {"label": "Last Payment Date", "value": "March 2026 (On Time)"}]}, {"id": 7, "title": "Accounting & Reporting Attributes", "rows": [{"label": "Accounting Standard", "value": "US GAAP"}, {"label": "Financial Reporting Frequency", "value": "Quarterly (Reviewed)"}, {"label": "Audit Status", "value": "FY2024 Audited; FY2025 Interim Reviewed"}]}, {"id": 8, "title": "Regulatory Schedule Mapping (Meta Fields)", "rows": [{"label": "FR Y-14 Schedule", "value": "Schedule H.1 - Covenant Monitoring"}, {"label": "Obligor Risk Mapping", "value": "Schedule A / Schedule M"}, {"label": "Regulatory Status Flag", "value": "Material Covenant Breach - Active"}]}], "actions": [{"label": "Submit to Regulator", "type": "primary"}, {"label": "Save Drafts", "type": "secondary"}, {"label": "Generate PDF", "type": "secondary"}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Report Builder Workflow' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Report Builder Workflow", "description": "Visual workflow representation"}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Tab Labels' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"tabs": ["EXPLORE DOCUMENTS", "SOURCE METRICS"]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Detailed Findings' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'y14_report' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Detailed Findings", "description": "Comprehensive analysis results", "warningMessage": "DSCR below covenant threshold (1.25) due to lower cash flow.", "findings": [{"title": "Finance_Operations_Q2.xlsx", "section": "Section: Cash Flow Statement (Operating Activities)", "usedFor": "Used For: DSCR calculation (EBITDA / Debt Service)"}, {"title": "Loan_Agreement.pdf", "section": "Section: Financial Covenant Schedule", "usedFor": "Used For: Covenant threshold reference (DSCR >= 1.25)"}, {"title": "Covenant_Compliance_Certificate_Q2.pdf", "section": "Section: Borrower Attestation & Covenant Reporting", "usedFor": "Used For: FR Y-14Q - Schedule H.1 (Covenant Status)"}, {"title": "Borrower_Financials_Q2_Reviewed.pdf", "section": "Section: Financial Covenant Schedule", "usedFor": "Used For: Covenant threshold validation (DSCR >= 1.25)"}]}'
);

-- Screen: operational_doc_scan
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'OCR Scanning' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "OCR Document Scanning", "status": "Processing operational documents..."}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'AI Alert' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"message": "Operational shortfalls, costs and delays pressure cash flow, margins, risking projections without corrective action."}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Shipment Details' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Shipment Details", "columns": ["Shipment #", "Promised Delivery Date", "Actual Delivery Date", "Status", "Actions"], "rows": [{"shipment": "Shipment 1", "promised": "12 Aug 2025", "actual": "10 Aug 2025", "status": "early"}, {"shipment": "Shipment 2", "promised": "02 Jun 2025", "actual": "01 Jun 2025", "status": "on-time"}, {"shipment": "Shipment 3", "promised": "01 May 2025", "actual": "10 May 2025", "status": "delayed"}, {"shipment": "Shipment 4", "promised": "12 Apr 2025", "actual": "12 Apr 2025", "status": "on-time"}, {"shipment": "Shipment 5", "promised": "25 Mar 2025", "actual": "25 Mar 2025", "status": "on-time"}, {"shipment": "Shipment 6", "promised": "14 Feb 2025", "actual": "16 Feb 2025", "status": "delayed"}, {"shipment": "Shipment 7", "promised": "02 Feb 2025", "actual": "02 Feb 2025", "status": "on-time"}, {"shipment": "Shipment 8", "promised": "26 Jan 2025", "actual": "26 Jan 2025", "status": "on-time"}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Operational Findings' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'operational_doc_scan' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Detailed Findings", "findings": [{"title": "On-Time Delivery (OTIF) Impact", "section": "Finding: Fulfillment ratio = 86% (12/20) vs required >= 90%.", "usedFor": "Y-14 Relevance: Under-delivery reduces expected cash inflows - may contribute to DSCR decline."}, {"title": "Promised vs Delivered Variance", "section": "Finding: Fulfillment ratio = 86% (12/20) vs required >= 90%.", "usedFor": "Y-14 Relevance: Under-delivery reduces expected cash inflows - may contribute to DSCR decline."}, {"title": "Cost Per Mile / Unit Cost Pressure", "section": "Finding: Cost per mile at $1.82, moderately above plan.", "usedFor": "Y-14 Relevance: Margin compression increases operating expenses - affects risk metrics & DSCR."}, {"title": "Capacity Utilization Decline", "section": "Finding: Utilization at 78%, weakening from prior quarter.", "usedFor": "Y-14 Relevance: Lower throughput = lower revenue - impacts cash flow projections filed in Y-14."}, {"title": "OTIF Gap/Time to Fulfil", "section": "Finding: OTIF at 89% vs required >=92%.", "usedFor": "Y-14 Relevance: Reduced service reliability - potential customer churn - revenue risk in Y-14."}]}'
);

-- Screen: data_simulator
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Page Header' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Data Simulator", "tabs": ["Benefit Blocks", "ROI Calculator", "Case Studies / Benchmarks"]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Speed Metrics' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Speed", "subtitle": "Before/After Impact Timeline", "before": {"value": "3 Days", "label": "Before"}, "after": {"value": "30 Minutes", "label": "With AI: 90% faster covenant reviews"}}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Accuracy Metrics' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Accuracy (OCR/NLP Error Reduction Metrics)", "metrics": [{"title": "Faster Covenant Checks", "points": ["65% faster covenant validation", "35% faster cross-checks (benchmarks)"]}, {"title": "Fewer Errors", "points": ["1. Global Logistics Provider, reduced 40% error in processing."]}]}'
);
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Compliance Alerts' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'data_simulator' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "Compliance", "alerts": [{"type": "critical", "title": "Proactive Alerts", "details": [{"label": "DSCR breach auto-flagged", "value": ""}, {"label": "Document integrity issues detected", "value": ""}]}, {"type": "warning", "title": "Missed breaches in manual process", "details": [{"label": "Breaches detected late", "value": ""}, {"label": "Verification incomplete", "value": ""}]}]}'
);

-- Screen: feedback
INSERT INTO "DATA_SET_MAPPING" (visualization_id, data_set) VALUES (
    (SELECT id FROM "VISUALIZATION" WHERE title = 'Feedback Form' AND screen_id = (SELECT screen_id FROM "SCREEN" WHERE screen_name = 'feedback' AND persona_id = (SELECT persona_id FROM "PERSONA" WHERE station = 'operate' AND sector = 'BCM' AND role = 'touch_table'))),
    '{"title": "", "success_message": "You''ve successfully created your personalized loan journey.", "options": [{"type": "delivery", "label": "Delivery options", "choices": ["Email", "SMS"]}, {"type": "rating", "label": "Rate us"}], "submit_label": "Submit", "cta_label": "Back to home", "cta_target": "/"}'
);

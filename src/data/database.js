const database = {
    persona: {
      persona_id: 2,
      station: "operate",
      sector: "BCM",
      role: "touch_table",
    },
    screens: [
      {
        screen_id: 1,
        screen_name: 'landing_page',
        screen_title: 'Landing Page',
        visualizations: [
          {
            id: 1,
            name: 'Hero Section',
            type: 'hero_banner',
            position: 'center',
            data_set: {
              heading: 'Reimagining Covenant Monitoring',
              subheading: 'Turning covenant monitoring from a reactive task into a proactive advantage.',
              cta_label: 'Start Journey',
              cta_target: '/explore'
            }
          }
        ]
      },
      {
        screen_id: 2,
        screen_name: 'enterprise_loan_servicing',
        screen_title: 'Enterprise Loan Servicing',
        visualizations: [
          {
            id: 1,
            name: 'Page Header',
            type: 'title_section',
            position: 'center',
            data_set: {
              main_title: 'Enterprise Loan Servicing',
              subtitle: 'Case: Vertex Logistics Corp - $21 MM Working Capital Facility'
            }
          },
          {
            id: 2,
            name: 'Activate Button',
            type: 'cta_button',
            position: 'bottom_center',
            data_set: {
              label: 'Touch here to activate servicing mode',
              target: '/document-centre'
            }
          },
          {
            id: 3,
            name: 'Service Menu',
            type: 'menu_grid',
            position: 'top_grid',
            data_set: {
              services: [
                {
                  id: 1,
                  name: 'Loan Agreement',
                  description: 'Manage and track loan agreements, terms, and conditions',
                  path: '/loan-agreement'
                },
                {
                  id: 2,
                  name: 'Covenant Register',
                  description: 'Monitor and manage loan covenants and compliance requirements',
                  path: '/covenant-register'
                },
                {
                  id: 3,
                  name: 'FR Y-14 Reporting',
                  description: 'Federal Reserve Y-14 regulatory reporting and submissions',
                  path: '/y14-report'
                },
                {
                  id: 4,
                  name: 'Financials & ESG Reports',
                  description: 'Financial statements and Environmental, Social, and Governance reports',
                  path: '/financials-esg'
                },
                {
                  id: 5,
                  name: 'KYC/AML file',
                  description: 'Know Your Customer and Anti-Money Laundering documentation and verification',
                  path: '/kyc-aml'
                },
                {
                  id: 6,
                  name: 'Risk Dashboard',
                  description: 'Comprehensive risk monitoring and analytics dashboard',
                  path: '/risk-dashboard'
                },
                {
                  id: 7,
                  name: 'Client Communication',
                  description: 'Client communication portal and messaging system',
                  path: '/client-communication'
                },
                {
                  id: 8,
                  name: 'Blockchain ledger',
                  description: 'Distributed ledger technology for transaction tracking and verification',
                  path: '/blockchain-ledger'
                }
              ]
            }
          }
        ]
      },
      {
        screen_id: 3,
        screen_name: 'document_centre',
        screen_title: 'Document Centre',
        visualizations: [
          {
            id: 5,
            name: 'Case Information',
            type: 'header_info',
            position: 'top_left',
            data_set: {
              case_number: 'Case no. #CCN3267890',
              applied_by: ' Vertex Logistics Company'
            }
          },
          {
            id: 6,
            name: 'Documents Summary',
            type: 'header_info',
            position: 'top_right',
            data_set: {
              title: 'Documents Received',
              count: 8
            }
          },
          {
            id: 7,
            name: 'Document List',
            type: 'document_grid',
            position: 'center',
            data_set: {
              documents: [
                {
                  id: 1,
                  name: 'Loan Agreement',
                  url: null,
                  description: 'Primary loan agreement document outlining terms and conditions',
                  type: 'pdf',
                  filename: 'Loan_Agreement.pdf'
                },
                {
                  id: 2,
                  name: 'Financial Statement',
                  url: null,
                  description: 'Company financial statements and performance metrics',
                  type: 'pdf',
                  filename: '2024_Q2_Financials.pdf'
                },
                {
                  id: 3,
                  name: 'Covenant Summary',
                  url: null,
                  description: 'Summary of loan covenants and compliance tracking',
                  type: 'xlsx',
                  filename: 'Covenant_Summary.xlsx'
                },
                {
                  id: 4,
                  name: 'ESG Report 02',
                  url: null,
                  description: 'Environmental, Social, and Governance report',
                  type: 'pdf',
                  filename: 'ESG_Report_Q2.pdf'
                },
                {
                  id: 5,
                  name: 'FR Y-14 Analysis',
                  url: null,
                  description: 'Federal Reserve Y-14 regulatory analysis and reporting',
                  type: 'pdf',
                  filename: 'Fleet_Lease_Agreements.pdf'
                },
                {
                  id: 6,
                  name: 'Risk Assessment',
                  url: null,
                  description: 'Comprehensive risk assessment document',
                  type: 'docx',
                  filename: 'Risk_Assessment.docx'
                },
                {
                  id: 7,
                  name: 'Balance Sheet',
                  url: null,
                  description: 'Company balance sheet and financial position',
                  type: 'xlsx',
                  filename: 'Balance_Sheet.xlsx'
                },
                {
                  id: 8,
                  name: 'Quarterly Report',
                  url: null,
                  description: 'Quarterly financial and operational report',
                  type: 'pdf',
                  filename: 'Quarterly_Report.pdf'
                },
                {
                  id: 9,
                  name: 'Compliance Certificate',
                  url: null,
                  description: 'Compliance certification and regulatory documentation',
                  type: 'pdf',
                  filename: 'Compliance_Certificate.pdf'
                },
                {
                  id: 10,
                  name: 'Market Analysis',
                  url: null,
                  description: 'Market analysis and industry trends presentation',
                  type: 'pptx',
                  filename: 'Market_Analysis.pptx'
                },
                {
                  id: 11,
                  name: 'Credit Approval',
                  url: null,
                  description: 'Credit approval documentation and decision rationale',
                  type: 'pdf',
                  filename: 'Credit_Approval.pdf'
                },
                {
                  id: 12,
                  name: 'Facility Agreement',
                  url: null,
                  description: 'Facility agreement terms and conditions',
                  type: 'pdf',
                  filename: 'Facility_Agreement.pdf'
                }
              ]
            }
          },
          {
            id: 8,
            name: 'Scan Action',
            type: 'action_button',
            position: 'bottom',
            data_set: {
              label: 'Scan Documents',
              target: '/financial-dashboard'
            }
          }
        ]
      },
      {
        screen_id: 4,
        screen_name: 'financial_dashboard',
        screen_title: 'Financial Dashboard',
        visualizations: [
          {
            id: 9,
            name: 'OCR Scanning',
            type: 'scanning_section',
            position: 'left_panel',
            data_set: {
              title: 'OCR Document Scanning',
              status: 'Processing financial statements...'
            }
          },
          {
            id: 10,
            name: 'Financial Metrics',
            type: 'metrics_grid',
            position: 'center_panel',
            data_set: {
              metrics: {
                'Revenue': {
                  dataPoints: [
                    ["2021 (COVID Impact)", 142],
                    ["2022 (Recovery Begins)", 158],
                    ["2023 (Peak Recovery)", 186],
                    ["2024 (Normalization)", 182],
                    ["2025 (Current - Stress)", 178]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Strong post‑COVID recovery followed by normalization; current revenue at $178M reflects cyclical freight softening rather than customer attrition.',
                    'Volume pressure is industry‑driven, with no evidence of structural demand loss.'
                  ]
                },
                'EBITDA': {
                  dataPoints: [
                    ["2021 (COVID Impact)", 9.8],
                    ["2022 (Recovery Begins)", 12.6],
                    ["2023 (Peak Recovery)", 19.4],
                    ["2024 (Normalization)", 17.8],
                    ["2025 (Current - Stress)", 14.9]
                  ],
                  unit: 'M',
                  infoLines: [
                    'EBITDA expanded materially during the recovery phase but declined to $14.9M as fuel, labor, and detention costs outpaced revenue.',
                    'Margin compression is the primary contributor to weakened debt‑servicing capacity this cycle.'
                  ]
                },
                'Debt': {
                  dataPoints: [
                    ["2021 (COVID Impact)", 38],
                    ["2022 (Recovery Begins)", 40],
                    ["2023 (Peak Recovery)", 41],
                    ["2024 (Normalization)", 42],
                    ["2025 (Current - Stress)", 43]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Total debt increased gradually to $42.5M, largely driven by fleet investment and lease obligations.',
                    'No evidence of aggressive leverage or debt‑funded expansion during the current stress period.'
                  ]
                },
                'Equity': {
                  dataPoints: [
                    ["2021 (COVID Impact)", 18.5],
                    ["2022 (Recovery Begins)", 19.4],
                    ["2023 (Peak Recovery)", 20.6],
                    ["2024 (Normalization)", 21.2],
                    ["2025 (Current - Stress)", 21.4]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Equity has grown steadily to $21.4M through retained earnings, providing balance‑sheet support.',
                    'Equity growth has moderated in line with reduced profitability in the current cycle.'
                  ]
                },
                'Interest Expense': {
                  dataPoints: [
                    ["2021 (COVID Impact)", 2.6],
                    ["2022 (Recovery Begins)", 2.8],
                    ["2023 (Peak Recovery)", 3],
                    ["2024 (Normalization)", 3.1],
                    ["2025 (Current - Stress)", 3.2]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Interest expense increased incrementally to $3.2M, reflecting higher base rates on a stable debt balance.',
                    'Elevated interest costs have amplified the impact of EBITDA compression on DSCR.'
                  ]
                }
              }
            }
          },
          {
            id: 11,
            name: 'AI Recommendations',
            type: 'alert_panel',
            position: 'right_panel',
            data_set: {
              title: 'AI Recommendations',
              alerts: [
                'Earnings‑driven DSCR breach identified: margin compression and higher interest costs—not leverage—are driving coverage deterioration; remediation should focus on cash flow improvement and cost controls.'
              ]
            }
          },
          {
            id: 12,
            name: 'Covenant Status',
            type: 'covenant_status',
            position: 'right_panel',
            data_set: {
              title: 'Covenant Status',
              covenants: [
                { name: 'DSCR', value: '0.92 (limit 1.25)', indicator: 'Alert', status: 'alert' },
                { name: 'Debt/Equity', value: '1.99x (limit 3.0)', indicator: 'Warning', status: 'warning' },
                { name: 'Current Ratio', value: '1.42', indicator: 'Alert', status: 'alert' }
              ]
            }
          }
        ]
      },
      {
        screen_id: 5,
        screen_name: 'anomaly_detection',
        screen_title: 'Anomaly Detection',
        visualizations: [
          {
            id: 12,
            name: 'Quarterly DSCR',
            type: 'bar_chart',
            position: 'left_panel',
            data_set: {
              title: 'Quarterly DSCR',
              subtitle: 'Covenant threshold line',
              threshold_value: '1.25%',
              data_points: [
                { quarter: 'Q1', dscr: 1.08, period: 'FY 24-25 Q1', threshold: 1.25 },
                { quarter: 'Q2', dscr: 1.05, period: 'FY 24-25 Q2', threshold: 1.25 },
                { quarter: 'Q3', dscr: 0.97, period: 'FY 24-25 Q3', threshold: 1.25 },
                { quarter: 'Q4', dscr: 0.92, period: 'FY 24-25 Q4', threshold: 1.25 }
              ]
            }
          },
          {
            id: 13,
            name: 'Financial Drivers',
            type: 'area_chart',
            position: 'center_panel',
            data_set: {
              title: 'Quarter-by-quarter financial drivers',
              data_points: [
                { quarter: 'Q1', dscr: 1.18, ebitdaMargin: 10.40, cashFlowCoverageRatio: 8.3, keySignal: 'Strong earnings and cash coverage' },
                { quarter: 'Q2', dscr: 1.05, ebitdaMargin: 9.60, cashFlowCoverageRatio: 7, keySignal: 'Margin compression begins' },
                { quarter: 'Q3', dscr: 0.97, ebitdaMargin: 8.90, cashFlowCoverageRatio: 6, keySignal: 'Cash flow weakens' },
                { quarter: 'Q4 (Current)', dscr: 0.92, ebitdaMargin: 8.40, cashFlowCoverageRatio: 5.5, keySignal: '' }
              ]
            }
          },
          {
            id: 14,
            name: 'AI Recommendations',
            type: 'text_panel',
            position: 'right_panel',
            data_set: {
              title: 'AI Recommendations',
              recommendations: [
                'Operating cash flow dipped due to higher detention and overtime costs.',
                'Interest and lease costs grew faster than revenue → direct DSCR impact.',
                'Risk of consecutive breaches if cost actions not taken.',
                'Recommended: renegotiate carrier contracts, accelerate AR collections, reduce miles.'
              ]
            }
          },
          {
            id: 15,
            name: 'Q3 Highlight',
            type: 'highlight_list',
            position: 'bottom_left',
            data_set: {
              title: 'Q3 Highlight',
              highlights: [
                {
                  title: 'DSCR Improvement',
                  description: 'DSCR improved briefly from 0.97 to 0.99, but declined to 0.92, remaining below the 1.25 covenant due to sustained margin pressure.',
                  metric: '0.92'
                },
                {
                  title: 'Cash Flow Growth',
                  description: 'Operating cash flow rose temporarily from $17.6M to $19.2M, supported by faster receivables, but remains below prior-quarter levels.',
                  metric: '+9.1%'
                },
                {
                  title: 'Interest Costs Stabilized',
                  description: 'Interest expense stabilized at $3.2M QoQ, as debt held steady at $42.5M, preventing further coverage deterioration.',
                  metric: '$3.2M'
                },
                {
                  title: 'Delayed Shipments Reduced',
                  description: 'Shipment delays declined from 5 to 3 days, improving fulfillment rates and supporting incremental cash flow recovery.',
                  metric: '-40%'
                },
                {
                  title: 'Operating Revenue Rebounded',
                  description: 'Revenue rebounded modestly to $178M, driven by improved fulfillment performance rather than volume-led growth.',
                  metric: '$178M'
                }
              ]
            }
          }
        ]
      },
      {
        screen_id: 6,
        screen_name: 'y14_report',
        screen_title: 'FR Y-14 Report Generation',
        visualizations: [
          {
            id: 16,
            name: 'Schedule Template',
            type: 'accordion_form',
            position: 'left_panel',
            data_set: {
              title: 'FR Y-14 Schedule Template',
              sections: [
                {
                  id: 1,
                  title: 'Borrower / Obligor Information',
                  rows: [
                  ]
                },
                {
                  id: 2,
                  title: 'Loan Characteristics',
                  rows: [
                    { label: 'Facility Type', value: 'Senior Secured Term Loan + Revolver' },
                    { label: 'Committed Amount', value: 'USD $20,000,000' },
                    { label: 'Maturity Date', value: 'April 2029' }, 
                  ]
                },
                {
                  id: 3,
                  title: 'Collateral Information',
                  rows: [
                    { label: 'Primary Collateral', value: 'Accounts Receivable, Fleet Vehicles, Trailers' },
                    { label: 'Estimated Collateral Value', value: 'USD $54.0M' },
                    { label: 'Lien Position', value: 'First‑priority perfected lien' },
                  ]
                },
                {
                  id: 4,
                  title: 'Covenant Information (Extracted)',
                  type: 'covenant_table',
                  rows: [
                    {
                      covenant_name: 'DSCR',
                      threshold: '≥ 1.25x',
                      current_value: '0.92',
                      status: 'Breach',
                      status_color: '#F44336'
                    },
                    {
                      covenant_name: 'Debt / Equity',
                      threshold: '≤ 3.0x',
                      current_value: '1.99x',
                      status: 'Compliant',
                      status_color: '#4CAF50'
                    },
                    {
                      covenant_name: 'Liquidity',
                      threshold: '≥ 1.30',
                      current_value: '1.42',
                      status: 'Warning Range',
                      status_color: '#FF9800'
                    }
                  ]
                },
                {
                  id: 5,
                  title: 'Credit Quality & Risk Metrics',
                  rows: [
                    { label: 'Internal Risk Rating', value: 'BB+ (Watchlist)' },
                    { label: 'Prob. of Default (PD)', value: '0.85%' },
                    { label: 'Loss Given Default (LGD)', value: '40%' },
                  ]
                },
                {
                  id: 6,
                  title: 'Performance & Payment Info',
                  rows: [
                    { label: 'Debt Service Status', value: 'Current; no payment delinquency' },
                    { label: 'Amortization Amount', value: '$210K per month' },
                    { label: 'Last Payment Date', value: 'March 2026 (On Time)' },
                  ]
                },
                {
                  id: 7,
                  title: 'Accounting & Reporting Attributes',
                  rows: [
                    { label: 'Accounting Standard', value: 'US GAAP' },
                    { label: 'Financial Reporting Frequency', value: 'Quarterly (Reviewed)' },
                    { label: 'Audit Status', value: 'FY2024 Audited; FY2025 Interim Reviewed' }
                  ]
                },
                {
                  id: 8,
                  title: 'Regulatory Schedule Mapping (Meta Fields)',
                  rows: [
                    { label: 'FR Y‑14 Schedule', value: 'Schedule H.1 – Covenant Monitoring' },
                    { label: 'Obligor Risk Mapping', value: 'Schedule A / Schedule M' },
                    { label: 'Regulatory Status Flag', value: 'Material Covenant Breach – Active' }
                  ]
                }
              ],
              actions: [
                { label: 'Submit to Regulator', type: 'primary' },
                { label: 'Save Drafts', type: 'secondary' },
                { label: 'Generate PDF', type: 'secondary' }
              ]
            }
          },
          {
            id: 17,
            name: 'Report Builder Workflow',
            type: 'workflow_steps',
            position: 'right_top',
            data_set: {
              title: 'Report Builder Workflow',
              description: 'Visual workflow representation'
            }
          },
          {
            id: 19,
            name: 'Tab Labels',
            type: 'tab_navigation',
            position: 'bottom_tabs',
            data_set: {
              tabs: ['EXPLORE DOCUMENTS', 'SOURCE METRICS']
            }
          },
          {
            id: 18,
            name: 'Detailed Findings',
            type: 'findings_panel',
            position: 'bottom_left',
            data_set: {
              title: 'Detailed Findings',
              description: 'Comprehensive analysis results',
              warningMessage: 'DSCR below covenant threshold (1.25) due to lower cash flow.',
              findings: [
                {
                  title: 'Finance_Operations_Q2.xlsx',
                  section: 'Section: Cash Flow Statement (Operating Activities)',
                  usedFor: 'Used For: DSCR calculation (EBITDA ÷ Debt Service)'
                },
                {
                  title: 'Loan_Agreement.pdf',
                  section: 'Section: Financial Covenant Schedule',
                  usedFor: 'Used For: Covenant threshold reference (DSCR ≥ 1.25)'
                },
                {
                  title: 'Covenant_Compliance_Certificate_Q2.pdf',
                  section: 'Section: Borrower Attestation & Covenant Reporting',
                  usedFor: 'Used For: FR Y‑14Q – Schedule H.1 (Covenant Status)'
                },
                {
                  title: 'Borrower_Financials_Q2_Reviewed.pdf',
                  section: 'Section: Financial Covenant Schedule',
                  usedFor: 'Used For: Covenant threshold validation (DSCR ≥ 1.25)'
                }
              ]
            }
          }
        ]
      },
      {
        screen_id: 7,
        screen_name: 'operational_doc_scan',
        screen_title: 'Operational Document Scan',
        visualizations: [
          {
            id: 20,
            name: 'OCR Scanning',
            type: 'scanning_section',
            position: 'left_panel',
            data_set: {
              title: 'OCR Document Scanning',
              status: 'Processing operational documents...'
            }
          },
          {
            id: 21,
            name: 'AI Alert',
            type: 'alert_chip',
            position: 'top_center',
            data_set: {
              message: 'Shipment 2845 delivered late (9/22 vs 9/20)'
            }
          },
          {
            id: 22,
            name: 'Shipment Details',
            type: 'data_table',
            position: 'right_panel',
            data_set: {
              title: 'Shipment Details',
              columns: ['Shipment #', 'Promised Delivery Date', 'Actual Delivery Date', 'Status', 'Actions'],
              rows: [
                { shipment: 'Shipment 1', promised: '12 Aug 2025', actual: '10 Aug 2025', status: 'early' },
                { shipment: 'Shipment 2', promised: '02 Jun 2025', actual: '01 Jun 2025', status: 'on-time' },
                { shipment: 'Shipment 3', promised: '01 May 2025', actual: '10 May 2025', status: 'delayed' },
                { shipment: 'Shipment 4', promised: '12 Apr 2025', actual: '12 Apr 2025', status: 'on-time' },
                { shipment: 'Shipment 5', promised: '25 Mar 2025', actual: '25 Mar 2025', status: 'on-time' },
                { shipment: 'Shipment 6', promised: '14 Feb 2025', actual: '16 Feb 2025', status: 'delayed' },
                { shipment: 'Shipment 7', promised: '02 Feb 2025', actual: '02 Feb 2025', status: 'on-time' },
                { shipment: 'Shipment 8', promised: '26 Jan 2025', actual: '26 Jan 2025', status: 'on-time' }
              ]
            }
          },
          {
            id: 23,
            name: 'Operational Findings',
            type: 'findings_cards',
            position: 'bottom',
            data_set: {
              title: 'Detailed Findings',
              findings: [
                {
                  title: 'On-Time Delivery (OTIF) Impact',
                  section: 'Finding: Fulfillment ratio = 86% (12/20) vs required ≥ 90%.',
                  usedFor: 'Y-14 Relevance: Under-delivery reduces expected cash inflows → may contribute to DSCR decline.'
                },
                {
                  title: 'Promised vs Delivered Variance',
                  section: 'Finding: Fulfillment ratio = 86% (12/20) vs required ≥ 90%.',
                  usedFor: 'Y-14 Relevance: Under-delivery reduces expected cash inflows → may contribute to DSCR decline.'
                },
                {
                  title: 'Cost Per Mile / Unit Cost Pressure',
                  section: 'Finding: Cost per mile at $1.82, moderately above plan.',
                  usedFor: 'Y-14 Relevance: Margin compression increases operating expenses → affects risk metrics & DSCR.'
                },
                {
                  title: 'Capacity Utilization Decline',
                  section: 'Finding: Utilization at 78%, weakening from prior quarter.',
                  usedFor: 'Y-14 Relevance: Lower throughput = lower revenue → impacts cash flow projections filed in Y-14.'
                },
                {
                  title: 'OTIF Gap/Time to Fulfil',
                  section: 'Finding: OTIF at 89% vs required ≥92%.',
                  usedFor: 'Y-14 Relevance: Reduced service reliability → potential customer churn → revenue risk in Y-14.'
                }
              ]
            }
          }
        ]
      },
      {
        screen_id: 8,
        screen_name: 'data_simulator',
        screen_title: 'Data Simulator',
        visualizations: [
          {
            id: 24,
            name: 'Page Header',
            type: 'title_section',
            position: 'top',
            data_set: {
              title: 'Data Simulator',
              tabs: ['Benefit Blocks', 'ROI Calculator', 'Case Studies / Benchmarks']
            }
          },
          {
            id: 25,
            name: 'Speed Metrics',
            type: 'timeline_comparison',
            position: 'left_column',
            data_set: {
              title: 'Speed',
              subtitle: 'Before/After Impact Timeline',
              before: {
                value: '3 Days',
                label: 'Before'
              },
              after: {
                value: '30 Minutes',
                label: 'With AI: 90% faster covenant reviews'
              }
            }
          },
          {
            id: 26,
            name: 'Accuracy Metrics',
            type: 'metrics_cards',
            position: 'center_column',
            data_set: {
              title: 'Accuracy (OCR/NLP Error Reduction Metrics)',
              metrics: [
                {
                  title: 'Faster Covenant Checks',
                  points: [
                    '65% faster covenant validation',
                    '35% faster cross‑checks (benchmarks)'
                  ]
                },
                {
                  title: 'Fewer Errors',
                  points: [
                    '1. Global Logistics Provider, reduced 40% error in processing.'
                  ]
                }
              ]
            }
          },
          {
            id: 27,
            name: 'Compliance Alerts',
            type: 'alert_cards',
            position: 'right_column',
            data_set: {
              title: 'Compliance',
              alerts: [
                {
                  type: 'critical',
                  title: 'Proactive Alerts',
                  details: [
                    { label: 'DSCR breach auto-flagged', value: '' },
                    { label: 'Document integrity issues detected', value: '' }
                  ]
                },
                {
                  type: 'warning',
                  title: 'Missed breaches in manual process',
                  details: [
                    { label: 'Breaches detected late', value: '' },
                    { label: 'Verification incomplete', value: '' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        screen_id: 9,
        screen_name: 'feedback',
        screen_title: 'Feedback',
        visualizations: [
          {
            id: 28,
            name: 'Feedback Form',
            type: 'interactive_feedback',
            position: 'center',
            data_set: {
              title: 'Share Your Experience',
              options: [
                { type: 'delivery', label: 'Delivery Options' },
                { type: 'rating', label: 'Rate Your Experience' }
              ],
              cta_label: 'Back to home',
              cta_target: '/'
            }
          }
        ]
      }
    ]
};

export default database;

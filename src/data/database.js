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
              applied_by: 'Logistics Company'
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
                  filename: 'Financial_Statement.pdf'
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
                  filename: 'ESG_Report_02.pdf'
                },
                {
                  id: 5,
                  name: 'FR Y-14 Analysis',
                  url: null,
                  description: 'Federal Reserve Y-14 regulatory analysis and reporting',
                  type: 'pdf',
                  filename: 'FR_Y_14_Analysis.pdf'
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
                    ["Jul", 175],
                    ["Aug", 176],
                    ["Sep", 177],
                    ["Oct", 178],
                    ["Nov", 178],
                    ["Dec", 178]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Revenue growth supports minimum turnover covenant, reducing risk of operating underperformance.',
                    'Stable YoY increase indicates low likelihood of cash-flow stress, supporting DSCR maintenance.'
                  ]
                },
                'EBITDA': {
                  dataPoints: [
                    ["Jul", 14.2],
                    ["Aug", 14.4],
                    ["Sep", 14.6],
                    ["Oct", 14.8],
                    ["Nov", 14.9],
                    ["Dec", 14.9]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Rising EBITDA strengthens Debt/EBITDA covenant compliance, improving borrower creditworthiness.',
                    'Sustained profitability trend reduces risk of breach on interest coverage or leverage covenants.'
                  ]
                },
                'Debt': {
                  dataPoints: [
                    ["Jul", 41.2],
                    ["Aug", 41.5],
                    ["Sep", 41.8],
                    ["Oct", 42.2],
                    ["Nov", 42.5],
                    ["Dec", 42.5]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Current leverage remains within allowable Debt/EBITDA thresholds, though trending upward.',
                    'Monitoring required to avoid breaching maximum leverage or total indebtedness covenants.'
                  ]
                },
                'Equity': {
                  dataPoints: [
                    ["Jul", 20.2],
                    ["Aug", 20.5],
                    ["Sep", 20.8],
                    ["Oct", 21.2],
                    ["Nov", 21.4],
                    ["Dec", 21.4]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Stable equity position supports Net Worth / Equity Maintenance covenants.',
                    'Equity cushion reduces risk of LTV covenant deterioration during adverse market cycles.'
                  ]
                },
                'Interest Expense': {
                  dataPoints: [
                    ["Jul", 2.8],
                    ["Aug", 2.9],
                    ["Sep", 3.0],
                    ["Oct", 3.1],
                    ["Nov", 3.2],
                    ["Dec", 3.2]
                  ],
                  unit: 'M',
                  infoLines: [
                    'Rising interest expense may pressure Interest Coverage covenants if EBITDA slows.',
                    'Higher servicing costs could impact DSCR compliance, requiring ongoing monitoring.'
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
                'DSCR declined to 0.92 this cycle, breaching the 1.25 covenant.'
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
              threshold_value: 1.25,
              data_points: [
              data_points: [
                { quarter: 'Jul-Sep', dscr: 1.21, period: 'FY 24-25 Q1', threshold: 1.25 },
                { quarter: 'Oct-Dec', dscr: 1.05, period: 'FY 24-25 Q2', threshold: 1.25 },
                { quarter: 'Jan-Mar', dscr: 1.07, period: 'FY 24-25 Q3', threshold: 1.25 },
                { quarter: 'Apr-Jun', dscr: 0.92, period: 'FY 24-25 Q4', threshold: 1.25 }
              ]
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
                { quarter: 'Q1', cashFlow: 15000, interest: 15000, debt: 15000 },
                { quarter: 'Q2', cashFlow: 18000, interest: 17500, debt: 16800 },
                { quarter: 'Q3', cashFlow: 25500, interest: 23000, debt: 21000 },
                { quarter: 'Q4', cashFlow: 36000, interest: 31000, debt: 27000 }
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
                'Declining DSCR driven by lower operating cash flows and softening freight activity.',
                'DSCR declined to 0.92 this cycle, breaching the 1.25 covenant.',
                'Sustained downward trend over the past two quarters.',
                'Action required: Enhanced monitoring and borrower engagement recommended.',
                'Recommended: Reassess expense control and cash acceleration program.'
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
                  title: 'DSCR Weakened',
                  description: 'DSCR weakened significantly despite OTD improvement—cash collections did not keep pace with fuel and lease cost upticks.',
                  metric: '-22%'
                },
                {
                  title: 'Freight Volumes Dropped',
                  description: 'Freight volumes dropped 4.5% QoQ, particularly in Midwest lanes.',
                  metric: '-4.5%'
                },
                {
                  title: 'Fuel Hedge Shortfalls',
                  description: 'Fuel hedge shortfalls and increased detention charges strained operating margins.',
                  metric: '-12.5%'
                },
                {
                  title: 'On-Time Delivery',
                  description: 'OTD at 94%, below the required 95% covenant threshold.',
                  metric: '94%'
                },
                {
                  title: 'DSCR Breach',
                  description: 'DSCR declined to 0.92 this cycle, breaching the 1.25 covenant.',
                  metric: '0.92'
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
                    { label: 'Obligor name', value: 'Vertex Logistics Corp.' },
                    { label: 'Obligor ID', value: '00492-WHSL' },
                    { label: 'Country', value: 'United States' },
                    { label: 'Industry/NAICS code', value: '488510 – Freight Transportation Arrangement' },
                    { label: 'Obligor type', value: 'Corporate' }
                  ]
                },
                {
                  id: 2,
                  title: 'Loan Characteristics',
                  rows: [
                    { label: 'Loan Type', value: 'Working Capital Revolver' },
                    { label: 'Origination Date', value: '15-Jan-21' },
                    { label: 'Maturity Date', value: '15-Jan-26' },
                    { label: 'Original Commitment', value: '$1,80,00,000' },
                    { label: 'Current Outstanding Balance', value: '$1,42,00,000' },
                    { label: 'Unused Commitment', value: '$38,00,000' },
                    { label: 'Interest Rate Type', value: 'Floating (SOFR + 2.10%)' },
                    { label: 'Current Interest Rate', value: '7.35%' },
                    { label: 'Payment Frequency', value: 'Monthly' },
                    { label: 'Next Payment Due', value: '12/10/2025' }
                  ]
                },
                {
                  id: 3,
                  title: 'Collateral Information',
                  rows: [
                    { label: 'Collateral Type', value: 'Accounts Receivable + Inventory' },
                    { label: 'Collateral Code', value: '24' },
                    { label: 'Collateral Value', value: '$2,10,00,000' },
                    { label: 'LTV (Calculated)', value: '64%' },
                    { label: 'Lien Position', value: '1st Lien' },
                    { label: 'Guarantee Indicator', value: 'Yes (Corporate Guarantee)' },
                    { label: 'Guarantee Amount', value: '$1,80,00,000' }
                  ]
                },
                {
                  id: 4,
                  title: 'Covenant Information (Extracted)',
                  type: 'covenant_table',
                  rows: [
                    {
                      covenant_name: 'DSCR',
                      threshold: '≥ 1.25',
                      current_value: '0.92',
                      status: 'Breached',
                      status_color: '#F44336'
                    },
                    {
                      covenant_name: 'LTV',
                      threshold: '≤ 70%',
                      current_value: '64%',
                      status: 'Compliant',
                      status_color: '#4CAF50'
                    },
                    {
                      covenant_name: 'Leverage Ratio',
                      threshold: '≤ 3.00x',
                      current_value: '1.99x',
                      status: 'Compliant',
                      status_color: '#4CAF50'
                    },
                    {
                      covenant_name: 'ESG Filing',
                      threshold: 'Q2 Filing Required',
                      current_value: 'Overdue',
                      status: 'Breached',
                      status_color: '#F44336'
                    },
                    {
                      covenant_name: 'Financial Reporting',
                      threshold: 'Quarterly, within 30 days',
                      current_value: 'Submitted',
                      status: 'Compliant',
                      status_color: '#4CAF50'
                    }
                  ]
                },
                {
                  id: 5,
                  title: 'Credit Quality & Risk Metrics',
                  rows: [
                    { label: 'Internal Risk Rating', value: '6 (Moderate Risk)' },
                    { label: 'Prob. of Default (PD)', value: '1.90%' },
                    { label: 'Loss Given Default (LGD)', value: '38%' },
                    { label: 'Exposure at Default (EAD)', value: '$1,80,00,000' },
                    { label: 'Accrued Interest', value: '$72,400' },
                    { label: 'Non-Accrual Indicator', value: 'No' },
                    { label: 'Troubled Debt Restructuring', value: 'No' }
                  ]
                },
                {
                  id: 6,
                  title: 'Performance & Payment Info',
                  rows: [
                    { label: 'Days Past Due', value: '0' },
                    { label: 'Past Due Indicator', value: 'No' },
                    { label: 'Last Payment Date', value: '12-Sep-25' },
                    { label: 'Next Payment Date', value: '12-Oct-25' },
                    { label: 'Payment Status', value: 'Current' },
                    { label: 'Interest Expense (YTD)', value: '$21,00,00,000' }
                  ]
                },
                {
                  id: 7,
                  title: 'Accounting & Reporting Attributes',
                  rows: [
                    { label: 'Accounting Standard', value: 'GAAP' },
                    { label: 'Accrual Status', value: 'Performing' },
                    { label: 'Impairment Status', value: 'Not Impaired' },
                    { label: 'Charge-Off Amount', value: '$0' },
                    { label: 'Restructured Indicator', value: 'No' },
                    { label: 'Basel Exposure Class', value: 'Corporate Exposure' }
                  ]
                },
                {
                  id: 8,
                  title: 'Regulatory Schedule Mapping (Meta Fields)',
                  rows: [
                    { label: 'DSCR (Reported)', value: '0.92' },
                    { label: 'DSCR (Trend YoY)', value: '-22%' },
                    { label: 'LTV (Reported)', value: '64%' },
                    { label: 'EBITDA (TTM)', value: '$14.9M' },
                    { label: 'Revenue (TTM)', value: '$178M' },
                    { label: 'Total Debt', value: '$42.5M' },
                    { label: 'Equity', value: '$21.4M' },
                    { label: 'Covenant Breach', value: 'DSCR declined to 0.92 this cycle' },
                    { label: 'Remediation Plan', value: 'Cash acceleration program, fuel surcharge revision' },
                    { label: 'Internal Comments', value: 'DSCR breach confirmed; OTD/OTIF warnings' },
                    { label: 'Stress Scenario Tested', value: 'Revenue – 10% = DSCR falls to 0.78' }
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
            id: 18,
            name: 'Detailed Findings',
            type: 'findings_panel',
            position: 'bottom_left',
            data_set: {
              title: 'Detailed Findings',
              description: 'Comprehensive analysis results'
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
                  section: 'Tracking OTIF dropped to 91%, missing covenant threshold',
                  usedFor: 'Analyze root cause: late pickups, route inefficiency, or carrier performance'
                },
                {
                  title: 'Promised vs Delivered Variance',
                  section: 'Delivery lead times vary ±60% (2-10 days), impacting cash flow',
                  usedFor: 'Standardize lead time estimates and improve forecasting accuracy'
                },
                {
                  title: 'Cost Per Mile / Unit Cost Pressure',
                  section: 'Analyze cost per mile vs $2.00/mi, within allowed limit',
                  usedFor: 'Identify cost drivers: fuel, labor, maintenance, or route optimization gaps'
                },
                {
                  title: 'Capacity Utilization Decline',
                  section: 'Flagging utilization at 78%, impacting fixed cost absorption',
                  usedFor: 'Review load planning and asset allocation to improve utilization rates'
                },
                {
                  title: 'OTIF Gap/Time to Fulfil',
                  section: 'Tracking OTIF at 91% (Above 90%)',
                  usedFor: 'Monitor performance trends and identify improvement opportunities'
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
                label: 'Earlier (Without AI Integration)'
              },
              after: {
                value: '41 Minutes',
                label: 'Now (with AI)'
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
                    'Global Logistics Provider secured 65% faster Covenant Checks.',
                    'XYZ Company secured 35% faster Covenant Checks.'
                  ]
                },
                {
                  title: 'Fewer Errors',
                  points: [
                    'Global Logistics Provider, reduced 40% error in processing.',
                    'XYZ Company, reduced 40% error in processing.'
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
                    { label: 'Tampered Recipient', value: 'XYZ Holdings (Offshore)' },
                    { label: 'Tampered Routing Path', value: 'Rerouted through unknown server node (Hong Kong)' },
                    { label: 'Blockchain Hash Check', value: 'Mismatch – integrity violated' }
                  ]
                },
                {
                  type: 'warning',
                  title: 'Missed breaches in manual process',
                  details: [
                    { label: 'Covenant Breach', value: 'DEBT RATIO EXCEEDED' },
                    { label: 'Reporting Deadline', value: 'MISSED BY 3 DAYS' },
                    { label: 'Document Verification', value: 'INCOMPLETE' }
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

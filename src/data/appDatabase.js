/**
 * Application Database
 * Single persona with multiple screens
 */

export default [
  {
    id: 1,
    persona_name: 'Financial Operations Manager',
    sector: 'Banking & Financial Services',
    role: 'Covenant Monitoring',
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
              subtitle: 'Case: Vertex Logistics Corp - $18M Working Capital Facility'
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
                { id: 1, name: 'Financial Statement Q1', type: 'pdf' },
                { id: 2, name: 'Financial Statement Q2', type: 'pdf' },
                { id: 3, name: 'Financial Statement Q3', type: 'pdf' },
                { id: 4, name: 'Financial Statement Q4', type: 'pdf' },
                { id: 5, name: 'ESG Report', type: 'pdf' },
                { id: 6, name: 'Loan Agreement', type: 'pdf' },
                { id: 7, name: 'Covenant Register', type: 'pdf' },
                { id: 8, name: 'KYC Documents', type: 'pdf' }
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
              metrics: [
                { label: 'Revenue', value: '$12.5M', trend: '+5%' },
                { label: 'EBITDA', value: '$1.2M', trend: '+3%' },
                { label: 'Total Debt', value: '$3.8M', trend: '-2%' },
                { label: 'Equity', value: '$1.2M', trend: '+4%' },
                { label: 'DSCR', value: '0.75', status: 'warning' },
                { label: 'LTV', value: '64%', status: 'normal' }
              ]
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
                'Debt/Equity exceeds limit (3.2 vs 3.0)'
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
              threshold_value: 1.1,
              data_points: [
                { quarter: 'Q1', dscr: 1.8, period: 'FY 24-25 (Jan - Mar)', threshold: 1.1 },
                { quarter: 'Q2', dscr: 2.4, period: 'FY 24-25 (Apr - Jun)', threshold: 1.1 },
                { quarter: 'Q3', dscr: 2.0, period: 'FY 24-25 (Jul - Sep)', threshold: 1.1 },
                { quarter: 'Q4', dscr: 1.9, period: 'FY 24-25 (Oct - Dec)', threshold: 1.1 }
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
                'Operating cash flow improved steadily from $15K → $28K.',
                'However, interest and debt obligations grew faster, reducing coverage in Q2.',
                'DSCR fell to 1.10, below the required 1.25 covenant threshold.',
                'Improvement in Q3/Q4 signals stabilizing performance.',
                'Recommended: Reassess expense control and cross-check shipment delays.'
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
                  description: 'DSCR increased from 1.10 in Q2 → 1.15 in Q3, driven by higher operating cash flow.',
                  metric: '+4.5%'
                },
                {
                  title: 'Cash Flow Growth',
                  description: 'Operating cash flow rose to $22K, marking a +22% increase quarter-over-quarter.',
                  metric: '+22%'
                },
                {
                  title: 'Interest Costs Stabilized',
                  description: 'Interest expense increased only slightly ($4.0K → $4.5K), slowing the negative pressure on coverage.',
                  metric: '+12.5%'
                },
                {
                  title: 'Delayed Shipments Reduced',
                  description: 'Shipment delays dropped from 5 to 3, contributing to stronger cash collections.',
                  metric: '-40%'
                },
                {
                  title: 'Operating Revenue Rebounded',
                  description: 'Revenue improved following improved fulfillment performance (Promised vs Delivered variance reduced by 8%).',
                  metric: '+8%'
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
                  id: 'borrower',
                  title: 'Borrower / Obligor Information',
                  fields: [
                    { label: 'Obligor name', value: 'Vertex Logistics Corp.' },
                    { label: 'Obligor ID', value: '00492-WHSL' },
                    { label: 'Country', value: 'United States' },
                    { label: 'Industry/NAICS code', value: '488510 – Freight Transportation Arrangement' },
                    { label: 'Obligor type', value: 'Corporate' }
                  ]
                },
                {
                  id: 'loan',
                  title: 'Loan Characteristics',
                  fields: [
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
                  id: 'collateral',
                  title: 'Collateral Information',
                  fields: [
                    { label: 'Collateral Type', value: 'Accounts Receivable + Inventory' },
                    { label: 'Collateral Code', value: '24' },
                    { label: 'Collateral Value', value: '$2,10,00,000' },
                    { label: 'LTV (Calculated)', value: '64%' },
                    { label: 'Lien Position', value: '1st Lien' }
                  ]
                },
                {
                  id: 'covenant',
                  title: 'Covenant & Compliance',
                  fields: [
                    { label: 'Financial Covenants', value: 'DSCR ≥ 1.25, Debt/Equity ≤ 3.0' },
                    { label: 'Covenant Status', value: 'Breach (DSCR = 1.10)' },
                    { label: 'Waiver Requested', value: 'Yes' },
                    { label: 'Waiver Status', value: 'Under Review' }
                  ]
                },
                {
                  id: 'credit',
                  title: 'Credit Quality & Risk Metrics',
                  fields: [
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
                  id: 'performance',
                  title: 'Performance & Payment Info',
                  fields: [
                    { label: 'Days Past Due', value: '0' },
                    { label: 'Past Due Indicator', value: 'No' },
                    { label: 'Last Payment Date', value: '12-Sep-25' },
                    { label: 'Next Payment Date', value: '12-Oct-25' },
                    { label: 'Payment Status', value: 'Current' },
                    { label: 'Interest Expense (YTD)', value: '$21,00,00,000' }
                  ]
                },
                {
                  id: 'accounting',
                  title: 'Accounting & Reporting Attributes',
                  fields: [
                    { label: 'Accounting Standard', value: 'GAAP' },
                    { label: 'Accrual Status', value: 'Performing' },
                    { label: 'Impairment Status', value: 'Not Impaired' },
                    { label: 'Charge-Off Amount', value: '$0' },
                    { label: 'Restructured Indicator', value: 'No' },
                    { label: 'Basel Exposure Class', value: 'Corporate Exposure' }
                  ]
                },
                {
                  id: 'regulatory',
                  title: 'Regulatory Schedule Mapping (Meta Fields)',
                  fields: [
                    { label: 'DSCR (Reported)', value: '0.75' },
                    { label: 'DSCR (Trend YoY)', value: '5%' },
                    { label: 'LTV (Reported)', value: '64%' },
                    { label: 'EBITDA (TTM)', value: '$1.2B' },
                    { label: 'Revenue (TTM)', value: '$12.5B' },
                    { label: 'Total Debt', value: '$3.8B' },
                    { label: 'Equity', value: '$1.2B' },
                    { label: 'Covenant Breach', value: 'ESG report overdue (Q2)' },
                    { label: 'Remediation Plan', value: 'Client notified; 30-day cure period issued' },
                    { label: 'Internal Comments', value: 'No financial covenant defaults; ESG breach does not trigger cross-default' },
                    { label: 'Stress Scenario Tested', value: 'Revenue – 10% = DSCR falls to 0.62' }
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
                  section: 'Analyze cost per mile vs 8.5 p/mi, understand if cost pressure exists',
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
                value: '30 Minutes',
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
  }
];

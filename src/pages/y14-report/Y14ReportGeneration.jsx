import React, { useState } from 'react';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import styles from './Y14ReportGeneration.module.css';

export default function Y14ReportGeneration() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNextStep = () => {
    navigate('/operational-doc-scan');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box className={styles.reportGenerationPage}>
      <Box 
        className={styles.backgroundOverlay} 
        sx={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/operational-docu-scan.svg)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} 
      />
      
      {/* Main content */}
      <Box className={styles.mainContainer}>
        {/* Left column - AI Draft Report */}
        <Box className={styles.leftColumn}>
          <GradientBorderBox className={styles.draftReportPanel}>
            <Box className={styles.panelHeader}>
              <Typography className={styles.panelTitle}>AI Draft Report Panel</Typography>
              
              <Box className={styles.headerButtons}>
                <Button variant="outlined" className={styles.headerButton}>
                  Submit to Regulator
                </Button>
                <Button variant="contained" className={styles.actionButton}>
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                    <Box component="svg" sx={{ width: 20, height: 20, fill: 'currentColor' }} viewBox="0 0 24 24">
                      <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM19 19H5V5H16.17L19 7.83V19ZM12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12ZM7 7H15V9H7V7Z" />
                    </Box>
                  </Box>
                  <Typography>Save Drafts</Typography>
                </Button>
                <Button variant="contained" className={styles.downloadButton}>
                  <FileDownloadIcon sx={{ fontSize: 20 }} />
                  <Typography>Generate PDF</Typography>
                </Button>
              </Box>
            </Box>
            
            <Typography className={styles.reportTitle}>
              AI Draft – FR Y-14 Report (Quarterly Submission)
            </Typography>
          
          <Accordion 
            expanded={expanded === 'panel1'} 
            onChange={handleChange('panel1')}
            className={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.accordionIcon} />}
              className={styles.accordionSummary}
            >
              <Typography className={styles.accordionHeader}>Balance Sheet</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <Box className={styles.reportPreviewContainer}>
                <Box 
                  component="img"
                  src={`${process.env.PUBLIC_URL}/assets/balance-doc.svg`}
                  alt="Balance Sheet Preview"
                  className={styles.reportPreview}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'panel2'} 
            onChange={handleChange('panel2')}
            className={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.accordionIcon} />}
              className={styles.accordionSummary}
            >
              <Typography className={styles.accordionHeader}>Profit & Loss (P&L)</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <Box className={styles.reportPreviewContainer}>
                <Typography>P&L content will appear here</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'panel3'} 
            onChange={handleChange('panel3')}
            className={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.accordionIcon} />}
              className={styles.accordionSummary}
            >
              <Typography className={styles.accordionHeader}>Ratios</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <Box className={styles.reportPreviewContainer}>
                <Typography>Ratios content will appear here</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Accordion 
            expanded={expanded === 'panel4'} 
            onChange={handleChange('panel4')}
            className={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={styles.accordionIcon} />}
              className={styles.accordionSummary}
            >
              <Typography className={styles.accordionHeader}>Breach Notes</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <Box className={styles.reportPreviewContainer}>
                <Typography>Breach notes content will appear here</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          </GradientBorderBox>
        </Box>
        
        {/* Right column - Report Builder Workflow and Detailed Findings */}
        <Box className={styles.rightColumn}>
          {/* Report Builder Workflow */}
          <GradientBorderBox className={styles.workflowPanel}>
            <Typography className={styles.panelTitle}>Report Builder Workflow</Typography>
            
            <Box className={styles.workflowContainer}>
              <Box className={styles.progressSteps}>
                <Box className={styles.progressStep}>
                  <Box className={styles.stepIconContainer}>
                    <CheckCircleIcon className={styles.completedStepIcon} />
                    <Box className={styles.connector} />
                  </Box>
                  <Box className={styles.stepContent}>
                    <Typography className={styles.stepTitle}>Data Collected</Typography>
                    <Typography className={styles.stepDescription}>Client financial data received</Typography>
                  </Box>
                </Box>
                
                <Box className={styles.progressStep}>
                  <Box className={styles.stepIconContainer}>
                    <CheckCircleIcon className={styles.completedStepIcon} />
                    <Box className={styles.connector} />
                  </Box>
                  <Box className={styles.stepContent}>
                    <Typography className={styles.stepTitle}>Breach Identified</Typography>
                    <Typography className={styles.stepDescription}>Data analysis & breach integration</Typography>
                  </Box>
                </Box>
                
                <Box className={styles.progressStep}>
                  <Box className={styles.stepIconContainer}>
                    <Box className={styles.currentStepIconContainer}>
                      <Box className={styles.currentStepIcon} />
                    </Box>
                    <Box className={styles.inactiveConnector} />
                  </Box>
                  <Box className={styles.stepContent}>
                    <Typography className={styles.stepTitle}>Report Drafted</Typography>
                    <Typography className={styles.stepDescription}>Report fully auto-generated</Typography>
                  </Box>
                </Box>
                
                <Box className={styles.progressStep}>
                  <Box className={styles.stepIconContainer}>
                    <RadioButtonUncheckedIcon className={styles.inactiveStepIcon} />
                  </Box>
                  <Box className={styles.stepContent}>
                    <Typography className={styles.stepTitle}>Ready to Submit</Typography>
                    <Typography className={styles.stepDescription}>Waiting for approval</Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box className={styles.reportPreviewContainer}>
                <Box 
                  component="img"
                  src={`${process.env.PUBLIC_URL}/assets/balance-doc.svg`}
                  alt="Report Preview"
                  className={styles.reportPreview}
                />
              </Box>
            </Box>
          </GradientBorderBox>
          
          {/* Detailed Findings */}
          <GradientBorderBox className={styles.findingsPanel}>
            <Typography className={styles.panelTitle}>Detailed Findings</Typography>
            
            <Box className={styles.tabsContainer}>
              <Box className={styles.tabsWrapper}>
                <Button className={styles.findingsTab}>Explore Documents</Button>
                <Button className={styles.findingsTab}>Source Metrics</Button>
              </Box>
            </Box>
            
            <Box className={styles.findingsContent}>
              <Box className={styles.findingAlert}>
                <ErrorIcon className={styles.alertIcon} />
                <Typography className={styles.alertText}>
                  Debt/Equity exceeded 3.0, DSCR fell to 1.1, On-time delivery 93%
                </Typography>
              </Box>
              
              <Box className={styles.documentsContainer}>
                <Box className={styles.documentCard}>
                  <Box className={styles.documentHeader}>
                    <Box className={styles.documentIcon}>
                      <Box component="svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="white" />
                      </Box>
                    </Box>
                    <Box className={styles.documentInfo}>
                      <Typography className={styles.documentTitle}>Finance operations.xls</Typography>
                      <Typography className={styles.documentSubtitle}>Shipment 1</Typography>
                    </Box>
                  </Box>
                  <Button className={styles.viewButton}>
                    <Typography>View</Typography>
                    <KeyboardArrowRightIcon />
                  </Button>
                </Box>
                
                <Box className={styles.documentCard}>
                  <Box className={styles.documentHeader}>
                    <Box className={styles.documentIcon}>
                      <Box component="svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="white" />
                      </Box>
                    </Box>
                    <Box className={styles.documentInfo}>
                      <Typography className={styles.documentTitle}>Finance operations.xls</Typography>
                      <Typography className={styles.documentSubtitle}>Shipment 1</Typography>
                    </Box>
                  </Box>
                  <Button className={styles.viewButton}>
                    <Typography>View</Typography>
                    <KeyboardArrowRightIcon />
                  </Button>
                </Box>
                
                <Box className={styles.documentCard}>
                  <Box className={styles.documentHeader}>
                    <Box className={styles.documentIcon}>
                      <Box component="svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="white" />
                      </Box>
                    </Box>
                    <Box className={styles.documentInfo}>
                      <Typography className={styles.documentTitle}>Finance operations.xls</Typography>
                      <Typography className={styles.documentSubtitle}>Shipment 1</Typography>
                    </Box>
                  </Box>
                  <Button className={styles.viewButton}>
                    <Typography>View</Typography>
                    <KeyboardArrowRightIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          </GradientBorderBox>
        </Box>
      </Box>
      
      {/* Navigation buttons */}
      <Box className={styles.navigationButtons}>
        <Button 
          className={styles.backButton}
          onClick={handleGoBack}
        >
          Go back
        </Button>
        <Button 
          className={styles.nextButton}
          onClick={handleNextStep}
        >
          Next step
        </Button>
      </Box>
      
      {/* EY Logo */}
      <Box 
        component="img"
        src="/assets/ey-logo.svg"
        alt="EY Logo"
        className={styles.eyLogo}
      />
    </Box>
  );
}

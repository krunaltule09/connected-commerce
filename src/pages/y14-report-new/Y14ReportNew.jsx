import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Stack, Grow, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlined from '@mui/icons-material/PictureAsPdfOutlined';
// removed unused ErrorIcon
// removed findings icon imports (panel replaced with SVG)
// removed stepper CheckIcon
import styles from './Y14ReportNew.module.css';
import GradientBorderBox from '../../components/common/GradientBorderBox';

export default function Y14ReportNew() {
  const navigate = useNavigate();
  const [expandedAccordion, setExpandedAccordion] = useState('borrower');
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showFindings, setShowFindings] = useState(false);

  // Staggered mount so panels render one-by-one slowly
  useEffect(() => {
    const t1 = setTimeout(() => setShowLeft(true), 200);       // left starts
    const t2 = setTimeout(() => setShowRight(true), 1400);     // then right
    const t3 = setTimeout(() => setShowFindings(true), 2600);  // then findings
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleAccordionToggle = (accordionId) => {
    setExpandedAccordion(expandedAccordion === accordionId ? null : accordionId);
  };

  const handleNextStep = () => {
    navigate('/data-simulator');
  };

  const handleGoBack = () => {
    navigate('/y14-report');
  };

  return (
    <Box className={styles.reportGenerationPage}>
      {/* Background Video */}
      <video 
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={`${process.env.PUBLIC_URL}/assets/AdobeStock_1544892280.mp4`} type="video/mp4" />
      </video>
      
      {/* Background Overlay */}
      <Box className={styles.backgroundOverlay} />
      
      {/* Main content */}
      <Box className={styles.mainContainer}>
        {/* Left: Schedule Template with gradient border and grow */}
        <Box className={styles.leftColumn}>
          <Grow in={showLeft} timeout={1200} appear>
            <GradientBorderBox>
              <Box className={styles.scheduleTemplatePanel}>
                <Box className={styles.panelHeader}>
                  <Typography className={styles.panelTitle}>FR Y-14 Schedule Template</Typography>
                </Box>

                <Box className={styles.templateContent}>
              <Box className={styles.accordionColumn}>
                {/* Borrower / Obligor Information */}
                <Box className={styles.accordion}>
                  <Box 
                    className={styles.accordionTitle}
                    onClick={() => handleAccordionToggle('borrower')}
                  >
                    <Typography className={styles.accordionHeader}>Borrower / Obligor Information</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'borrower' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                  {expandedAccordion === 'borrower' && (
                  <Box className={styles.accordionContent}>
                    <Box className={styles.detailsGrid}>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor name</Typography>
                        <Typography className={styles.textValue}>Vertex Logistics Corp.</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor ID</Typography>
                        <Typography className={styles.textValue}>00492-WHSL</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Country</Typography>
                        <Typography className={styles.textValue}>United States</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Industry/NAICS code</Typography>
                        <Typography className={styles.textValue}>488510 – Freight Transportation Arrangement</Typography>
                      </Box>
                      <Box className={styles.textRow}>
                        <Typography className={styles.textLabel}>Obligor type</Typography>
                        <Typography className={styles.textValue}>Corporate</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                </Box>
                {/* Loan Characteristics */}
                <Box className={styles.accordion}>
                  <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('loan')}>
                    <Typography className={styles.accordionHeader}>Loan Characteristics</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'loan' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* Collateral Information */}
                <Box className={styles.accordion}>
                  <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('collateral')}>
                    <Typography className={styles.accordionHeader}>Collateral Information</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'collateral' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* Covenant Information */}
                <Box className={styles.accordion}>
                  <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('covenant')}>
                    <Typography className={styles.accordionHeader}>Covenant Information</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'covenant' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={styles.accordionColumn}>
                {/* Credit Quality & Risk Measures */}
                <Box className={styles.accordion}>
                  <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('credit')}>
                    <Typography className={styles.accordionHeader}>Credit Quality & Risk Measures</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'credit' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* Performance & Payment Info */}
                <Box className={styles.accordion}>
                  <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('performance')}>
                    <Typography className={styles.accordionHeader}>Performance & Payment Info</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'performance' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* Accounting & Reporting Attributes */}
                <Box className={styles.accordion}>
                  <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('accounting')}>
                    <Typography className={styles.accordionHeader}>Accounting & Reporting Attributes</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'accounting' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* Regulatory Schedule Mapping (Meta Fields) */}
                <Box className={styles.accordion}>
                  <Box className={styles.accordionTitle} onClick={() => handleAccordionToggle('regulatory')}>
                    <Typography className={styles.accordionHeader}>Regulatory Schedule Mapping (Meta Fields)</Typography>
                    <Box className={styles.accordionIcon}>
                      {expandedAccordion === 'regulatory' ? (
                        <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            {/* Action Buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-start" mt={2}>
              <Button className={styles.submitButton}>
                <Typography className={styles.buttonText}>Submit to Regulator</Typography>
              </Button>
              
              <Button className={styles.saveButton}>
                <Stack direction="row" alignItems="center">
                  <InsertDriveFileOutlined className={styles.buttonIcon} />
                  <Typography className={styles.buttonText}>Save Drafts</Typography>
                </Stack>
              </Button>
              
              <Button className={styles.generateButton}>
                <Stack direction="row" alignItems="center">
                  <PictureAsPdfOutlined className={styles.buttonIcon} />
                  <Typography className={styles.buttonText}>Generate PDF</Typography>
                </Stack>
              </Button>
            </Stack>
              </Box>
            </GradientBorderBox>
          </Grow>
        </Box>

        {/* Right column - Replaced with static SVG */}
        <Fade in={showRight} timeout={1200} appear>
          <Box className={styles.rightColumn}>
            <Box className={styles.workflowPanel}>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/assets/builder-workflow.svg`}
                alt="Report Builder Workflow"
                className={styles.workflowImage}
              />
            </Box>
          </Box>
        </Fade>

        {/* Detailed Findings replaced by static SVG */}
        <Fade in={showFindings} timeout={1400} appear>
          <Box className={styles.findingsPanel}>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/deatiled-findings.svg`}
              alt="Detailed Findings"
              className={styles.findingsImage}
            />
          </Box>
        </Fade>
      </Box>
      
      {/* Navigation buttons */}
      <Box className={styles.navigationButtons}>
        <Button 
          className={styles.backButton}
          onClick={handleGoBack}
        >
          Back
        </Button>
        <Button 
          className={styles.nextButton}
          onClick={handleNextStep}
        >
          <Typography className={styles.nextButtonText}>Next</Typography>
        </Button>
      </Box>
      
      {/* EY Logo */}
      <Box 
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/ey-logo.svg`}
        alt="EY Logo"
        className={styles.eyLogo}
      />
    </Box>
  );
}

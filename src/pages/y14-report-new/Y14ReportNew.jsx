import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Button, Typography, Stack, Grow, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import PictureAsPdfOutlined from '@mui/icons-material/PictureAsPdfOutlined';
import { useButtonSound } from '../../hooks';
import styles from './Y14ReportNew.module.css';
import GradientBorderBox from '../../components/common/GradientBorderBox';
import { useConfig, useVisualizationDataSet } from '../../context/ConfigContext';
import { httpFetch } from '../../utils/tauriFetch';
import DetailedFindings from '../../components/y14-report/DetailedFindings';

const SSE_BASE_URL = process.env.REACT_APP_SSE_SERVICE_URL || 'http://localhost:3001';

export default function Y14ReportNew() {
  const navigate = useNavigate();
  const { assets } = useConfig();
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  // Get data from database for Detailed Findings
  const findingsData = useVisualizationDataSet('y14_report', 'Detailed Findings') || { findings: [], warningMessage: '' };

  // Get Schedule Template data from database (all accordion content)
  const scheduleData = useVisualizationDataSet('y14_report', 'Schedule Template') || { sections: [], title: 'FR Y-14 Schedule Template' };
  const allSections = scheduleData.sections || [];
  const leftSections = allSections.slice(0, 4);
  const rightSections = allSections.slice(4);
  const actionButtons = scheduleData.actions || [];

  // Get Report Builder Workflow data from database
  const workflowData = useVisualizationDataSet('y14_report', 'Report Builder Workflow');

  // Animation states for each section
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);
  const [animateFindings, setAnimateFindings] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);
  const [animateLogo, setAnimateLogo] = useState(false);

  // Progress state for Y14 report generation
  const [reportProgress, setReportProgress] = useState(0);
  const lastPublishedProgress = useRef(-1);

  // Publish progress to SSE service (same pattern as ScanningContext)
  const publishProgress = useCallback(async (progress) => {
    // Only publish if progress changed significantly (avoid flooding)
    if (Math.floor(progress) === lastPublishedProgress.current) return;
    lastPublishedProgress.current = Math.floor(progress);

    try {
      await httpFetch(`${SSE_BASE_URL}/api/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: 'y14-report',
          progress: Math.floor(progress),
          status: progress >= 100 ? 'complete' : 'generating',
          metadata: {
            reportReady: progress >= 100
          }
        })
      });
    } catch (error) {
      // Silently fail - SSE service may not be running
      console.debug('SSE publish failed:', error.message);
    }
  }, []);

  // Progress simulation for Y14 report generation
  useEffect(() => {
    const timer = setInterval(() => {
      setReportProgress((oldProgress) => {
        const increment = Math.max(1, 10 * (1 - oldProgress / 100));
        return Math.min(oldProgress + increment, 100);
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Publish progress to SSE whenever it changes
  useEffect(() => {
    publishProgress(reportProgress);
  }, [reportProgress, publishProgress]);

  // Staggered animation timing with 500ms gaps
  useEffect(() => {
    const leftTimer = setTimeout(() => setAnimateLeft(true), 0);
    const rightTimer = setTimeout(() => setAnimateRight(true), 500);
    const findingsTimer = setTimeout(() => setAnimateFindings(true), 1000);
    const navTimer = setTimeout(() => setAnimateNav(true), 1500);
    const logoTimer = setTimeout(() => setAnimateLogo(true), 2000);

    return () => {
      clearTimeout(leftTimer);
      clearTimeout(rightTimer);
      clearTimeout(findingsTimer);
      clearTimeout(navTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  // Toggle accordion - only one can be open at a time
  const handleAccordionToggle = (accordionId) => {
    setExpandedAccordion(accordionId);
  };

  // Handle next step with sound effect
  const handleNextStep = useButtonSound(() => {
    navigate('/operational-doc-scan');
  });

  // Handle go back with sound effect
  const handleGoBack = useButtonSound(() => {
    navigate('/anomaly-detection');
  });

  // Render standard label/value rows for an accordion section
  const renderDetailsSection = (section) => (
    <Box className={styles.detailsGrid}>
      {(section.rows || []).map((row, idx) => (
        <Box key={idx} className={styles.textRow}>
          <Typography className={styles.textLabel}>{row.label}</Typography>
          <Typography className={styles.textValue}>{row.value}</Typography>
        </Box>
      ))}
    </Box>
  );

  // Render covenant table section with status color indicators
  const renderCovenantSection = (section) => (
    <Box className={styles.covenantGrid}>
      <Box className={styles.covenantRow} sx={{ borderBottom: '1px solid #33333E', pb: 1, mb: 1 }}>
        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Covenant</Typography>
        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Threshold</Typography>
        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Current</Typography>
        <Typography className={styles.covenantCell} sx={{ fontWeight: 500 }}>Status</Typography>
      </Box>
      {(section.rows || []).map((row, idx) => (
        <Box key={idx} className={styles.covenantRow}>
          <Typography className={styles.covenantCell}>{row.covenant_name}</Typography>
          <Typography className={styles.covenantCell}>{row.threshold}</Typography>
          <Typography className={styles.covenantCell}>{row.current_value}</Typography>
          <Box className={styles.covenantCell} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 16, height: 16, bgcolor: row.status_color, borderRadius: 1, mr: 1 }}></Box>
            <Typography>{row.status}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );

  // Render a single accordion item
  const renderAccordion = (section, isLeftColumn) => (
    <Box key={section.id}>
      <Box className={styles.accordion}>
        <Box
          className={styles.accordionTitle}
          onClick={() => handleAccordionToggle(section.id)}
        >
          <Typography className={styles.accordionHeader}>{section.title}</Typography>
          <Box className={styles.accordionIcon}>
            {expandedAccordion === section.id ? (
              <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
            ) : (
              <ExpandMoreIcon />
            )}
          </Box>
        </Box>
      </Box>
      {expandedAccordion === section.id && (
        <Box
          className={`${styles.accordionContent}${section.id === 1 ? ` ${styles.borrowerAccordionContent}` : ''}`}
          sx={isLeftColumn ? {overflowX: "hidden"} : undefined}
        >
          {section.type === 'covenant_table' ? renderCovenantSection(section) : renderDetailsSection(section)}
        </Box>
      )}
    </Box>
  );

  return (
    <Box className={styles.reportGenerationPage}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.backgroundVideo}
      >
        <source src={assets['Banking_Capital_Market_Operate_Table_Dashboard_Background_Video']} type="video/mp4" />
      </video>

      {/* Background Overlay */}
      <Box className={styles.backgroundOverlay} />

      {/* Main content */}
      <Box className={styles.mainContainer}>
        {/* Left: Schedule Template with gradient border and grow */}
        <Box className={styles.leftColumn}>
          <Grow in={animateLeft} timeout={800} appear>
            <GradientBorderBox>
              <Box className={styles.scheduleTemplatePanel}>
                <Box className={styles.panelHeader}>
                  <Typography className={styles.panelTitle}>{scheduleData.title || 'FR Y-14 Schedule Template'}</Typography>
                </Box>

                <Box className={styles.templateContent}>
              <Box className={styles.accordionColumn}>
                {leftSections.map((section) => renderAccordion(section, true))}
              </Box>
              <Box className={styles.accordionColumn}>
                {rightSections.map((section) => renderAccordion(section, false))}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-start" mt={2}>
              <Button className={styles.submitButton}>
                <Typography className={styles.buttonText}>{actionButtons[0]?.label || 'Submit to Regulator'}</Typography>
              </Button>

              <Button className={styles.saveButton}>
                <Stack direction="row" alignItems="center">
                  <InsertDriveFileOutlined className={styles.buttonIcon} />
                  <Typography className={styles.buttonText}>{actionButtons[1]?.label || 'Save Drafts'}</Typography>
                </Stack>
              </Button>

              <Button className={styles.generateButton}>
                <Stack direction="row" alignItems="center">
                  <PictureAsPdfOutlined className={styles.buttonIcon} />
                  <Typography className={styles.buttonText}>{actionButtons[2]?.label || 'Generate PDF'}</Typography>
                </Stack>
              </Button>
            </Stack>
              </Box>
            </GradientBorderBox>
          </Grow>
        </Box>

        {/* Right column - Report Builder Workflow */}
        <Grow in={animateRight} timeout={800} appear>
          <GradientBorderBox>
            <Box className={styles.rightColumn}>
              <Box className={styles.panelHeader}>
                <Typography className={styles.panelTitle}>{workflowData?.title || 'Report Builder Workflow'}</Typography>
              </Box>

              <Box className={styles.workflowContainer}>
                {/* Workflow Steps SVG */}
                <Box
                  component="img"
                  src={assets['Banking_Capital_Market_Operate_Table_Report_Workflow_Step.svg']}
                  alt="Report Builder Workflow Steps"
                  className={styles.workflowStepsImage}
                />

                {/* Document SVGs Container */}
                <Box className={styles.docsContainer}>
                  {/* First Document */}
                  <Box
                    component="img"
                    src={assets['Banking_Capital_Market_Operate_Table_Report_Builder_Document.svg']}
                    alt="Report Builder Document 1"
                    className={styles.docImage}
                  />

                  {/* Second Document */}
                  <Box
                    component="img"
                    src={assets['Banking_Capital_Market_Operate_Table_Report_Builder_Document.svg']}
                    alt="Report Builder Document 2"
                    className={styles.docImage}
                  />

                  {/* Third Document */}
                  <Box
                    component="img"
                    src={assets['Banking_Capital_Market_Operate_Table_Report_Builder_Document.svg']}
                    alt="Report Builder Document 3"
                    className={styles.docImage}
                  />
                </Box>
              </Box>
            </Box>
          </GradientBorderBox>
        </Grow>

        {/* Detailed Findings */}
        <Grow in={animateFindings} timeout={800} appear>
          <Box className={styles.findingsPanel}>
            <Box  className={styles.findingsImage}>
            <GradientBorderBox>
              <DetailedFindings
                findings={findingsData.findings || []}
                warningMessage={findingsData.warningMessage || ''}
                cardMinWidth="300px"
                cardMaxWidth="400px"
              />
            </GradientBorderBox>
            </Box>
          </Box>
        </Grow>
      </Box>

      {/* Navigation buttons */}
      <Fade in={animateNav} timeout={800}>
        <Box className={styles.navigationButtons}>
        <Button
          className={styles.backButton}
          onClick={handleGoBack}
        >
          <Typography className={styles.backButtonText}>Back</Typography>
        </Button>
        <Button
          className={styles.nextButton}
          onClick={handleNextStep}
        >
          <Typography className={styles.nextButtonText}>Next</Typography>
        </Button>
      </Box>
      </Fade>

      {/* EY Logo */}
      <Fade in={animateLogo} timeout={800}>
        <Box
          component="img"
          src={assets['Banking_Capital_Market_Operate_Table_EY_Logo.svg']}
          alt="EY Logo"
          className={styles.eyLogo}
          onClick={() => { navigate('/'); window.location.reload(); }}
          sx={{
            cursor: 'pointer',
            transition: 'opacity 0.3s ease',
            '&:hover': { opacity: 0.8 }
          }}
        />
      </Fade>
    </Box>
  );
}

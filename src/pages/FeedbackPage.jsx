import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Fade, Grow, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useButtonSound } from '../hooks';
import { useVisualizationDataSet } from '../context/ConfigContext';

// SVG assets
import endFrame from '../assets/images/feedback_end_frame.svg';
import tickIcon from '../assets/images/feedback_tick.svg';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#000000',
  minHeight: '100vh',
  padding: theme.spacing(3),
  color: '#FFFFFF',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const MainCard = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '1892 / 1003',
  overflow: 'hidden',
});

const FrameBackground = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  zIndex: 1,
});

const ContentOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
});

const CardsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '5%',
  width: '100%',
  position: 'absolute',
  bottom: '10%',
  left: 0,
  right: 0,
  zIndex: 2,
});

const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: '#F3F3F5',
  color: '#000000',
  borderRadius: '8px',
  padding: theme.spacing(1, 2),
  fontWeight: 500,
  textTransform: 'none',
  fontSize: '16px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
}));

/** Yellow border frame SVG shared by both cards (card01 viewBox) */
const CardFrame01 = () => (
  <svg viewBox="0 0 529 352" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
    <path d="M503.177 343.333H152.5V342.389H502.143V120.973H503.177V343.333Z" fill="#FFE600"/>
    <path d="M152.505 343.334H89.3727L10.9648 271.713V81.2602L99.9255 0H503.181V73.0534H502.148V0.943727H100.368L11.998 81.6647V271.309L89.7786 342.39H152.505V343.334Z" fill="#FFE600"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M502.656 121.087C488.155 121.087 476.348 110.302 476.348 97.0563C476.348 83.8106 488.155 73.0254 502.656 73.0254C517.194 73.0254 529.001 83.8106 529.001 97.0563C529.001 110.302 517.194 121.087 502.656 121.087ZM502.656 73.9691C488.708 73.9691 477.381 84.3162 477.381 97.0563C477.381 109.796 488.708 120.143 502.656 120.143C516.603 120.143 527.968 109.796 527.968 97.0563C527.968 84.3162 516.603 73.9691 502.656 73.9691Z" fill="#FFE600"/>
    <path d="M514.138 97.0571C514.138 91.26 509.009 86.5752 502.663 86.5752C496.353 86.5752 491.188 91.26 491.188 97.0571C491.188 102.854 496.353 107.539 502.663 107.539C509.009 107.539 514.138 102.854 514.138 97.0571Z" fill="#FFE600"/>
    <path d="M22.9504 171.771C22.9504 165.974 17.7847 161.289 11.4752 161.289C5.12878 161.289 0 165.974 0 171.771C0 177.568 5.12878 182.253 11.4752 182.253C17.7847 182.253 22.9504 177.568 22.9504 171.771Z" fill="#FFE600"/>
    <path d="M31.5457 99.0621C30.9922 99.0621 30.4756 98.8936 30.0698 98.5228C29.258 97.7814 29.258 96.6017 30.0698 95.8602L113.865 19.3186C114.234 18.9815 114.787 18.7793 115.304 18.7793H444.395C445.502 18.7793 446.424 19.6219 446.424 20.6667C446.424 21.7116 445.502 22.5541 444.395 22.5541H116.189L32.9846 98.5228C32.5788 98.8936 32.0622 99.0621 31.5457 99.0621Z" fill="#FFE600"/>
    <path d="M11.4688 64.8841L80.0618 2.22852H11.4688V64.8841Z" fill="#FFE600"/>
    <g opacity="0.6">
      <path d="M152.499 352.002H74.9398L74.7553 351.867L3.46875 285.537L4.20671 284.863L75.3456 351.058H152.499V352.002Z" fill="#FFE600"/>
    </g>
  </svg>
);

/** Yellow border frame SVG for card02 */
const CardFrame02 = () => (
  <svg viewBox="0 0 523 348" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
    <path d="M496.662 338.85H150.526V337.919H495.643V119.393H496.662V338.85Z" fill="#FFE600"/>
    <path d="M150.53 338.853H88.2155L10.8228 268.167V80.1996L98.6317 0H496.667V72.0999H495.647V0.931409H99.0687L11.8425 80.5987V267.767L88.6161 337.921H150.53V338.853Z" fill="#FFE600"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M496.15 119.513C481.837 119.513 470.183 108.868 470.183 95.7954C470.183 82.7226 481.837 72.0781 496.15 72.0781C510.5 72.0781 522.154 82.7226 522.154 95.7954C522.154 108.868 510.5 119.513 496.15 119.513ZM496.15 73.0095C482.383 73.0095 471.202 83.2216 471.202 95.7954C471.202 108.369 482.383 118.581 496.15 118.581C509.917 118.581 521.134 108.369 521.134 95.7954C521.134 83.2216 509.917 73.0095 496.15 73.0095Z" fill="#FFE600"/>
    <path d="M507.481 95.7846C507.481 90.0631 502.419 85.4395 496.154 85.4395C489.926 85.4395 484.828 90.0631 484.828 95.7846C484.828 101.506 489.926 106.13 496.154 106.13C502.419 106.13 507.481 101.506 507.481 95.7846Z" fill="#FFE600"/>
    <path d="M22.6533 169.529C22.6533 163.807 17.5545 159.184 11.3266 159.184C5.06238 159.184 0 163.807 0 169.529C0 175.25 5.06238 179.874 11.3266 179.874C17.5545 179.874 22.6533 175.25 22.6533 169.529Z" fill="#FFE600"/>
    <path d="M31.1398 97.7623C30.5935 97.7623 30.0836 97.5959 29.683 97.23C28.8817 96.4982 28.8817 95.334 29.683 94.6022L112.393 19.0596C112.757 18.7269 113.304 18.5273 113.813 18.5273H438.644C439.737 18.5273 440.647 19.359 440.647 20.3901C440.647 21.4213 439.737 22.2529 438.644 22.2529H114.687L32.5601 97.23C32.1595 97.5959 31.6496 97.7623 31.1398 97.7623Z" fill="#FFE600"/>
    <path d="M11.3286 64.0351L79.0336 2.19727H11.3286V64.0351Z" fill="#FFE600"/>
    <g opacity="0.6">
      <path d="M150.525 347.41H73.9696L73.7875 347.277L3.42383 281.814L4.15223 281.148L74.3702 346.479H150.525V347.41Z" fill="#FFE600"/>
    </g>
  </svg>
);

/** Interactive star SVG - matches card02 star shape */
const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 43 46" fill="none" xmlns="http://www.w3.org/2000/svg"
    onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
    style={{ cursor: 'pointer' }}>
    <path
      d="M21.26 1.858C21.357 1.61 21.71 1.61 21.806 1.858L27.163 15.677C27.203 15.781 27.3 15.853 27.41 15.862L41.35 17.061C41.603 17.083 41.71 17.396 41.522 17.568L30.873 27.356C30.796 27.426 30.763 27.532 30.785 27.634L34.034 42.245C34.09 42.501 33.807 42.697 33.588 42.553L21.694 34.758C21.596 34.694 21.47 34.694 21.373 34.758L9.48 42.553C9.26 42.697 8.977 42.501 9.034 42.245L12.282 27.634C12.305 27.532 12.271 27.426 12.195 27.356L1.545 17.568C1.358 17.396 1.465 17.083 1.718 17.061L15.657 15.862C15.768 15.853 15.864 15.781 15.905 15.677L21.26 1.858Z"
      fill={filled ? '#FFE600' : '#D7D7DC'}
      style={{ transition: 'fill 0.2s ease' }}
    />
  </svg>
);

/** Interactive Delivery Options Card - replaces static card01.svg */
const DeliveryCard = ({ width = 324, title = 'Delivery options', choices = ['Email', 'SMS'], submitLabel = 'Submit' }) => {
  const [selected, setSelected] = useState({ 0: true });

  const handleToggle = (idx) => {
    setSelected((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checkboxSx = {
    color: '#7F7F91',
    p: 0.5,
    '&.Mui-checked': { color: '#00C864' },
    '& .MuiSvgIcon-root': { fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } },
  };

  const labelSx = {
    color: '#FCFCFC',
    fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
    fontWeight: 400,
  };

  return (
    <Box sx={{
      width: { xs: 180, sm: 252, md: width },
      aspectRatio: '529 / 352',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <CardFrame01 />

      {/* Content */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        zIndex: 2, pt: '16%',
      }}>
        {/* Row 1: Title — matches RatingCard title */}
        <Typography sx={{
          color: '#FCFCFC',
          fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.4rem' },
          fontWeight: 300,
          mb: { xs: 0.75, md: 1.5 },
          letterSpacing: '0.3px',
        }}>
          {title}
        </Typography>

        {/* Row 2: Checkboxes side by side — matches RatingCard stars row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 }, mb: { xs: 1, md: 2 } }}>
          {choices.map((choice, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox checked={!!selected[idx]} onChange={() => handleToggle(idx)} sx={checkboxSx} />
              }
              label={<Typography sx={labelSx}>{choice}</Typography>}
              sx={{ m: 0 }}
            />
          ))}
        </Box>

        {/* Row 3: Submit button — matches RatingCard submit */}
        <Box sx={{
          backgroundColor: '#F3F3F5', borderRadius: '6px',
          px: { xs: 2, md: 3 }, py: { xs: 0.5, md: 1 },
          cursor: 'pointer', transition: 'background-color 0.2s ease',
          '&:hover': { backgroundColor: '#FFFFFF' },
        }}>
          <Typography sx={{
            color: '#2E2E38',
            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
            fontWeight: 400,
          }}>
            {submitLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

/** Interactive Rating Card - replaces static card02.svg */
const RatingCard = ({ width = 324, title = 'Rate us', submitLabel = 'Submit' }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;
  const starSize = Math.round(width * 0.085);

  return (
    <Box sx={{
      width: { xs: 180, sm: 252, md: width },
      aspectRatio: '523 / 348',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <CardFrame02 />

      {/* Content */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        zIndex: 2, pt: '16%',
      }}>
        {/* Title */}
        <Typography sx={{
          color: '#FCFCFC',
          fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.4rem' },
          fontWeight: 300,
          mb: { xs: 0.75, md: 1.5 },
          letterSpacing: '0.3px',
        }}>
          {title}
        </Typography>

        {/* Interactive stars */}
        <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1, md: 1.5 }, mb: { xs: 1, md: 2 } }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <StarIcon
                size={starSize}
                filled={star <= displayRating}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            </motion.div>
          ))}
        </Box>

        {/* Submit button */}
        <Box sx={{
          backgroundColor: '#F3F3F5', borderRadius: '6px',
          px: { xs: 2, md: 3 }, py: { xs: 0.5, md: 1 },
          cursor: 'pointer', transition: 'background-color 0.2s ease',
          '&:hover': { backgroundColor: '#FFFFFF' },
        }}>
          <Typography sx={{
            color: '#2E2E38',
            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
            fontWeight: 400,
          }}>
            {submitLabel}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default function FeedbackPage() {
  const navigate = useNavigate();
  const [animateFrame, setAnimateFrame] = useState(false);
  const [animateTick, setAnimateTick] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [animateNav, setAnimateNav] = useState(false);

  // Get data from appDatabase
  const feedbackData = useVisualizationDataSet('feedback', 'Feedback Form');

  // Staggered animation timing
  useEffect(() => {
    const frameTimer = setTimeout(() => setAnimateFrame(true), 300);
    const tickTimer = setTimeout(() => setAnimateTick(true), 800);
    const textTimer = setTimeout(() => setAnimateText(true), 1400);
    const cardsTimer = setTimeout(() => setAnimateCards(true), 2000);
    const navTimer = setTimeout(() => setAnimateNav(true), 2600);

    return () => {
      clearTimeout(frameTimer);
      clearTimeout(tickTimer);
      clearTimeout(textTimer);
      clearTimeout(cardsTimer);
      clearTimeout(navTimer);
    };
  }, []);

  // Handle back to home with sound effect
  const handleBackToHome = useButtonSound(() => {
    navigate(feedbackData.cta_target);
  });

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Grow in={animateFrame} timeout={800}>
          <Box sx={{ width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={animateFrame ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <MainCard>
                {/* Decorative border frame */}
                <FrameBackground src={endFrame} alt="" />

                {/* Tick + text content */}
                <ContentOverlay>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: '-24%',
                  }}>
                    {/* Tick icon with scale animation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={animateTick ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <Box
                        component="img"
                        src={tickIcon}
                        alt="Success"
                        sx={{
                          width: { xs: 80, sm: 100, md: 120 },
                          height: { xs: 80, sm: 100, md: 120 },
                        }}
                      />
                    </motion.div>

                    {/* Success message */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={animateText ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                      <Typography
                        sx={{
                          color: '#FFFFFF',
                          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                          fontWeight: 300,
                          textAlign: 'center',
                          mt: 3,
                          maxWidth: '350px',
                          lineHeight: 1.4,
                        }}
                      >
                        {feedbackData.success_message || "You've successfully created your personalized loan journey."}
                      </Typography>
                    </motion.div>
                  </Box>
                </ContentOverlay>

                {/* Cards at bottom */}
                <CardsContainer>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={animateCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0 }}
                  >
                    <DeliveryCard
                      width={324}
                      title={feedbackData.options?.[0]?.label}
                      choices={feedbackData.options?.[0]?.choices}
                      submitLabel={feedbackData.submit_label}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={animateCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.2 }}
                  >
                    <RatingCard
                      width={324}
                      title={feedbackData.options?.[1]?.label}
                      submitLabel={feedbackData.submit_label}
                    />
                  </motion.div>
                </CardsContainer>
              </MainCard>
            </motion.div>
          </Box>
        </Grow>

        <Fade in={animateNav} timeout={1000}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -1, position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animateNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BackButton onClick={handleBackToHome}>
                {feedbackData.cta_label}
              </BackButton>
            </motion.div>
          </Box>
        </Fade>
      </Container>
    </PageContainer>
  );
}

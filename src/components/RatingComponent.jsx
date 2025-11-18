import React, { useState } from 'react';
import { Box, Typography, Button, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: '#FFFFFF',
  width: '100%',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 500,
  marginBottom: theme.spacing(4),
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiRating-iconFilled': {
    color: '#FFFFFF',
  },
  '& .MuiRating-iconEmpty': {
    color: '#D7D7DC',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F3F3F5',
  color: '#000000',
  borderRadius: '8px',
  padding: theme.spacing(1.5, 4),
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
  alignSelf: 'flex-start',
}));

const RatingComponent = () => {
  const [value, setValue] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    console.log('Rating submitted:', value);
    // Handle submission logic here
  };

  return (
    <RatingContainer>
      <Title>Rate us</Title>
      
      <StyledRating
        name="feedback-rating"
        value={value}
        onChange={handleRatingChange}
        precision={1}
        size="large"
        icon={<StarIcon fontSize="inherit" style={{ width: '48px', height: '48px' }} />}
        emptyIcon={<StarIcon fontSize="inherit" style={{ width: '48px', height: '48px' }} />}
      />
      
      <SubmitButton onClick={handleSubmit}>
        Submit
      </SubmitButton>
    </RatingContainer>
  );
};

export default RatingComponent;

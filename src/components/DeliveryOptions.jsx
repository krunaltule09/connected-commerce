import React, { useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

const DeliveryOptionsContainer = styled(Box)(({ theme }) => ({
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

const OptionsGroup = styled(FormGroup)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const QRCodeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(4),
}));

const QRCode = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  objectFit: 'contain',
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#FFFFFF',
  '&.Mui-checked': {
    color: '#FFFFFF',
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

const DeliveryOptions = () => {
  const [deliveryOptions, setDeliveryOptions] = useState({
    email: true,
    sms: false,
  });

  const handleChange = (event) => {
    setDeliveryOptions({
      ...deliveryOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    console.log('Selected delivery options:', deliveryOptions);
    // Handle submission logic here
  };

  return (
    <DeliveryOptionsContainer>
      <Title>Delivery options</Title>
      
      <QRCodeContainer>
        <QRCode 
          src="/assets/Frame 1010107978.svg" 
          alt="QR Code for delivery options" 
        />
      </QRCodeContainer>
      
      <OptionsGroup>
        <FormControlLabel
          control={
            <StyledCheckbox 
              checked={deliveryOptions.email} 
              onChange={handleChange} 
              name="email" 
            />
          }
          label="Email"
        />
        <FormControlLabel
          control={
            <StyledCheckbox 
              checked={deliveryOptions.sms} 
              onChange={handleChange} 
              name="sms" 
            />
          }
          label="SMS"
        />
      </OptionsGroup>
      
      <SubmitButton onClick={handleSubmit}>
        Submit
      </SubmitButton>
    </DeliveryOptionsContainer>
  );
};

export default DeliveryOptions;

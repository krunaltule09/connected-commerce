import { Box } from '@mui/material';

export default function GradientBorderBox({ children, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 2,
        bgcolor: '#1A1A24',
        border: '0.1px solid',
        borderImage: 'linear-gradient(90deg, #EEF96E 0%, rgba(244, 167, 157, 0) 100%);',
        borderImageSlice: 1,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

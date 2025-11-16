import { Box } from '@mui/material';

export default function GradientBorderBox({ children, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: '#1A1A24',
        border: '0.1px solid',
        borderColor: 'transparent',
        borderImage: 'linear-gradient(130deg,rgba(255, 230, 0, 1) 0%, rgba(46, 46, 56, 1) 60%) 1',
        borderImageSlice: 1,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

import { Typography } from '@mui/material';

export default function SectionTitle({ children, sx = {} }) {
  return (
    <Typography
      variant="h6"
      sx={{
        color: '#FFE600',
        fontFamily: 'var(--font-family-primary, Inter, Roboto, Helvetica, Arial, sans-serif)',
        fontWeight: 400,
        fontSize: '1.25rem',
        lineHeight: '40px',
        letterSpacing: '-0.02em',
        mb: 2,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

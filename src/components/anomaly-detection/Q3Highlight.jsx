import React from 'react';
import { Typography } from '@mui/material';

export default function Q3Highlight({ highlights = [] }) {
  return (
    <article className="bg-[#1a1a24] flex flex-col gap-3 p-0 relative rounded-lg w-full max-w-4xl mx-auto">
      {/* Yellow border overlay */}
      <div
        aria-hidden="true"
        className="absolute border-[#ffe600] border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg"
      />

      <Typography
          variant="h6"
          sx={{
            color: '#FFE600',
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            fontWeight: 400,
            mb: 0.5,
            pl: 2,
            pt: 2
          }}
        >
          Q3 Highlight
        </Typography>

      {/* Highlights List */}
      <div className="flex flex-col gap-4" style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '16px' }}>
        {highlights.map((item, index) => (
          <section key={index} className="flex flex-col gap-1">
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: { xs: '0.8rem', md: '0.875rem' },
                mb: 0.25,
                fontWeight: 400,
                pl: 0
              }}
            >
              {item.title}
            </Typography>
            <Typography sx={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: { xs: '0.7rem', md: '0.8rem' },
                fontWeight: 300,
                mb: 0.5,
                pl: 0,
                pr: 4
              }}
              >
              {item.description}
            </Typography>
          </section>
        ))}
      </div>
    </article>
  );
}

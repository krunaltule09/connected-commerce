import React from 'react';
import { Typography } from '@mui/material';

/**
 * @typedef {Object} HighlightItem
 * @property {string} title - The title of the highlight
 * @property {string} description - The description of the highlight
 */

/**
 * @typedef {Object} Q3HighlightProps
 * @property {HighlightItem[]} [highlights] - Array of highlight items to display
 */

const defaultHighlights = [
  {
    title: "DSCR Improvement",
    description: "DSCR increased from 1.10 in Q2 → 1.15 in Q3, driven by higher operating cash flow."
  },
  {
    title: "Cash Flow Growth",
    description: "Operating cash flow rose to $22K, marking a +22% increase quarter-over-quarter."
  },
  {
    title: "Interest Costs Stabilized",
    description: "Interest expense increased only slightly ($4.0K → $4.5K), slowing the negative pressure on coverage."
  },
  {
    title: "Delayed Shipments Reduced",
    description: "Shipment delays dropped from 5 to 3, contributing to stronger cash collections."
  },
  {
    title: "Operating Revenue Rebounded",
    description: "Revenue improved following improved fulfillment performance (Promised vs Delivered variance reduced by 8%)."
  }
];

/**
 * Q3Highlight component displays a list of highlights for Q3
 * @param {Q3HighlightProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export default function Q3Highlight({ highlights = defaultHighlights }) {
  return (
    <article className="bg-[#1a1a24] flex flex-col gap-6 p-6 relative rounded-lg w-full max-w-4xl mx-auto">
      {/* Yellow border overlay */}
      <div 
        aria-hidden="true" 
        className="absolute border-[#ffe600] border-[0.5px] border-solid inset-0 pointer-events-none rounded-lg" 
      />
      
      <Typography 
          variant="h6" 
          sx={{ 
            color: '#FFE600 ', 
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            fontWeight: 400, 
            mb: 1,
            pl: 2,
            pt: 2
          }}
        >
          Q3 Highlight
        </Typography>
      
      {/* Highlights List */}
      <div className="flex flex-col gap-6">
        {highlights.map((item, index) => (
          <section key={index} className="flex flex-col gap-1">
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: { xs: '0.9rem', md: '1rem' },
                mb: 0.5,
                fontWeight: 400,
                
                 pl: 2 
              }}
            >
              {item.title}
            </Typography>
            <Typography sx={{
                color: 'rgba(255, 255, 255, 1)',
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                
                fontWeight: 300,
                mb: 2,
                 pl: 2 
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

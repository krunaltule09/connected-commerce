import React from 'react';
import { Box } from '@mui/material';

const Q3ReportPage = () => {
  // Extract the SVG content from the original file
  const svgContent = `<svg id="eZP5evtfBjK1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 736 375" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" project-id="9accfd5bbaa74614b1e856006ffa6104" export-id="df7c656fa3604a8da3f0e7297ab1d7d5" cached="false" style="background-color:transparent"><g transform="translate(368 187.5)"><g><path d="M354.312,136.271c0,0-620.803,0-620.803,0s0-.384,0-.384s620.127,0,620.127,0s.372-176.639.372-176.639.501,0,.501,0-.197,177.023-.197,177.023Z" fill="#ffe600" stroke-width="0"/></g><g><path d="M-266.205,136.269c0,0-41.24,0-41.24,0s-51.218-36.261-51.218-36.261s0-206.118,0-206.118s58.112-41.142,58.112-41.142s654.872,0,654.872,0s.238,80,.238,80-.502-.5-.502-.5-.411-79.022-.411-79.022-653.908,0-653.908,0-57.726,40.868-57.726,40.868s0,205.709,0,205.709s50.808,35.989,50.808,35.989s40.975,0,40.975,0s0,.477,0,.477Z" fill="#ffe600" stroke-width="0"/></g><g><path d="M-345.378,-84.596c-.362,0-.7-.141-.965-.45-.531-.619-.531-1.603,0-2.222c0,0,54.773-43.87,54.773-43.87.241-.281.603-.45.941-.45c0,0,215.115,0,215.115,0c.723,0,1.326.703,1.326,1.575s-.603,1.575-1.326,1.575c0,0-214.536,0-214.536,0s-54.388,43.392-54.388,43.392c-.265.309-.602.45-.94.45Z" fill="#32ffff" stroke-width="0"/></g><g><path d="M-358.999,-106.252c0,0,59-41.5,59-41.5s-59,0-59,0s0,41.5,0,41.5Z" fill="#ffe600" stroke-width="0"/></g><g><path d="M-266.256,144.877c0,0-43.697.125-43.697.125s-.121-.076-.121-.076-50.222-34.673-50.222-34.673.483-.38.483-.38s50.125,34.597,50.125,34.597s43.432-.125,43.432-.125s0,.532,0,.532Z" fill="#ffe600" stroke-width="0"/></g></g></svg>`;

  return (

        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{ width: '100%', height: '100%' }}
        />
  
  );
};

export default Q3ReportPage;

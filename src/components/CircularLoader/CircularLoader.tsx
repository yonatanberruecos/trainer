// components/CircularLoader.js
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const CircularLoader = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // optional: to add a semi-transparent background
        zIndex: 9999, // ensure it's above other elements
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default CircularLoader;

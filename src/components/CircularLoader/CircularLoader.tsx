import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const CircularLoader = ({ text = 'Loading...' }) => {
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
        backgroundColor: 'rgba(9, 9, 15, 0.85)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        gap: 2,
      }}
    >
      <CircularProgress
        sx={{
          color: '#00ff87',
          filter: 'drop-shadow(0 0 8px rgba(0, 255, 135, 0.6))',
        }}
        size={52}
        thickness={3}
      />
      <Typography
        variant="h6"
        sx={{
          color: '#f0f0f5',
          fontWeight: 600,
          fontSize: '1rem',
          letterSpacing: '0.5px',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default CircularLoader;

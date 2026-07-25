'use client'
import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

interface BannerProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
}

export default function Banner({ open, message, severity = 'info', onClose }: BannerProps) {
  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          left: '0%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          width: '100%',
          maxWidth: 480,
          px: 2,
        }}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={onClose}
          sx={{ boxShadow: 6, borderRadius: 2 }}
        >
          {message}
        </Alert>
      </Box>
    </Slide>
  );
}

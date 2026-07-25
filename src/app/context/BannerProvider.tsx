'use client'
import { createContext, useCallback, useContext, useState } from 'react';
import type { AlertColor } from '@mui/material/Alert';
import Banner from '../../components/Banner';

interface BannerState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface BannerContextValue {
  showBanner: (message: string, severity?: AlertColor) => void;
  hideBanner: () => void;
}

const BannerContext = createContext<BannerContextValue>({
  showBanner: () => {},
  hideBanner: () => {},
});

export const useBanner = () => useContext(BannerContext);

export const BannerProvider = ({ children }: { children: React.ReactNode }) => {
  const [banner, setBanner] = useState<BannerState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showBanner = useCallback((message: string, severity: AlertColor = 'info') => {
    setBanner({ open: true, message, severity });
  }, []);

  const hideBanner = useCallback(() => {
    setBanner((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <BannerContext.Provider value={{ showBanner, hideBanner }}>
      {children}
      <Banner
        open={banner.open}
        message={banner.message}
        severity={banner.severity}
        onClose={hideBanner}
      />
    </BannerContext.Provider>
  );
};

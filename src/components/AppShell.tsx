'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import AmplifyProvider from '../app/AmplifyProvider';
import { BannerProvider } from '../app/context/BannerProvider';
import { MainContextAppProvider } from '../app/context/MainContextAppProvider';

/**
 * Renders the global app chrome (Header + fixed bottom Footer) on every route
 * EXCEPT the marketing landing page ("/"), which ships its own navbar/footer.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pb-20 md:pb-[120px]">
        <AmplifyProvider>
          <BannerProvider>
            <MainContextAppProvider>{children}</MainContextAppProvider>
          </BannerProvider>
        </AmplifyProvider>
      </main>
      {/* <Footer /> */}
    </>
  );
}

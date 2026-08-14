/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // NOTE: The built-in `i18n` option is a Pages Router feature. With the App
  // Router it doesn't create real locale routes, but it still runs
  // Accept-Language detection and redirects "/" -> "/es", which prevented the
  // landing page from rendering under the root domain. Language handling is
  // done client-side via I18nProvider/LanguageSwitcher, so it's removed here.
};

export default nextConfig;

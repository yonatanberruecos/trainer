import Image from 'next/image';
import Link from 'next/link';

const PRODUCT_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Para entrenadores', href: '#para-entrenadores' },
  { label: 'Preguntas frecuentes', href: '#faq' },
];

const LEGAL_LINKS = [
  { label: 'Política de privacidad', href: '/privacy' },
  { label: 'Términos de servicio', href: '/privacy?tab=terms' },
  { label: 'Eliminación de datos', href: '/privacy?tab=data-deletion' },
  { label: 'Contacto', href: 'mailto:contacto@trainixai.com' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z',
  },
  {
    label: 'X',
    href: '#',
    icon: 'M18.244 2H21.5l-7.5 8.57L23 22h-6.75l-5.28-6.9L4.9 22H1.64l8.02-9.17L1 2h6.92l4.77 6.31L18.244 2zm-1.18 18h1.83L7.03 3.86H5.06L17.064 20z',
  },
  {
    label: 'YouTube',
    href: '#',
    icon: 'M23 12s0-3.5-.44-5.17a2.78 2.78 0 00-1.96-1.97C18.9 4.42 12 4.42 12 4.42s-6.9 0-8.6.44a2.78 2.78 0 00-1.96 1.97C1 8.5 1 12 1 12s0 3.5.44 5.17a2.78 2.78 0 001.96 1.97c1.7.44 8.6.44 8.6.44s6.9 0 8.6-.44a2.78 2.78 0 001.96-1.97C23 15.5 23 12 23 12zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-trainix-bg">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Image
              src="/trainix.png"
              alt="Trainix"
              width={130}
              height={44}
              className="h-9 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.35))' }}
            />
            <p className="mt-4 max-w-xs text-sm text-trainix-muted">Entrena más inteligente.</p>

            {/* Socials */}
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-trainix-muted transition-colors hover:border-trainix-green/30 hover:text-trainix-green"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-sora text-sm font-semibold uppercase tracking-wide text-white">Producto</h3>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-trainix-muted transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-sora text-sm font-semibold uppercase tracking-wide text-white">Legal y soporte</h3>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-trainix-muted transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-trainix-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Trainix es un producto de GenFit. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Términos de servicio de YouTube
            </a>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Política de privacidad de Google
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

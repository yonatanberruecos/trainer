import Link from 'next/link';
import AppMockup from './AppMockup';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section id="inicio" className="scroll-anchor relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="animate-pulse-glow pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-trainix-green/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="animate-pulse-glow pointer-events-none absolute top-40 right-0 h-[360px] w-[360px] rounded-full bg-trainix-blue/20 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-trainix-green/25 bg-trainix-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-trainix-green">
              <span className="h-1.5 w-1.5 rounded-full bg-trainix-green" />
              Entrenamiento personalizado con IA
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-sora text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Genera tu{' '}
              <span className="bg-trainix-gradient bg-clip-text text-transparent">rutina perfecta</span>{' '}
              con ayuda de la{' '}
              <span className="bg-trainix-gradient bg-clip-text text-transparent">inteligencia artificial</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-trainix-muted lg:mx-0 lg:text-lg">
              Crea rutinas personalizadas de acuerdo con tus características corporales, experiencia,
              disponibilidad y objetivos. Recibe ejercicios, series, repeticiones y videos explicativos
              para entrenar con mayor claridad cada día de la semana.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/fit"
                className="w-full rounded-xl bg-trainix-gradient px-7 py-3.5 text-center text-base font-semibold text-trainix-bg shadow-lg shadow-trainix-green/25 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                Generar mi rutina
              </Link>
              <a
                href="#como-funciona"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Ver cómo funciona
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-5 text-sm text-trainix-muted">
              Sin tarjetas de crédito. Crea y guarda tus rutinas en minutos.
            </p>
          </Reveal>
        </div>

        {/* Right: mockup */}
        <Reveal delay={200} className="flex justify-center lg:justify-end">
          <AppMockup />
        </Reveal>
      </div>
    </section>
  );
}

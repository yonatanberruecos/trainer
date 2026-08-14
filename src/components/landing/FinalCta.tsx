import Link from 'next/link';
import Reveal from './Reveal';

export default function FinalCta() {
  return (
    <section className="scroll-anchor relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-trainix-green/20 bg-trainix-surface px-6 py-14 text-center sm:px-12">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-trainix-green/20 blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-trainix-blue/20 blur-[110px]"
            />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-sora text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Deja de improvisar y empieza a entrenar con un plan
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-trainix-muted sm:text-lg">
                Genera una rutina personalizada con ejercicios, series, repeticiones y videos
                explicativos según tus objetivos.
              </p>

              <div className="mt-8">
                <Link
                  href="/fit"
                  className="inline-block rounded-xl bg-trainix-gradient px-8 py-4 text-base font-semibold text-trainix-bg shadow-xl shadow-trainix-green/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  Crear mi rutina con IA
                </Link>
              </div>

              <p className="mt-6 text-sm text-trainix-muted">
                Trainix, un producto desarrollado por GenFit.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

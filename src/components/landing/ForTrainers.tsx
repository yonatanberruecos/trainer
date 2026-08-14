import Link from 'next/link';
import Reveal from './Reveal';

const BENEFITS = [
  'Reduce el tiempo de planificación',
  'Genera puntos de partida personalizados',
  'Organiza ejercicios por días',
  'Permite crear diferentes versiones de una rutina',
  'Facilita compartir planes con clientes',
];

export default function ForTrainers() {
  return (
    <section id="para-entrenadores" className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-wide text-trainix-blue">
                Para entrenadores personales
              </span>
              <h2 className="mt-3 font-sora text-3xl font-bold text-white sm:text-4xl">
                Una herramienta para crear rutinas con mayor rapidez
              </h2>
              <p className="mt-5 text-base leading-relaxed text-trainix-muted sm:text-lg">
                Trainix también puede complementar el trabajo de entrenadores personales. Utiliza la
                plataforma como apoyo para estructurar rutinas iniciales, explorar diferentes opciones y
                agilizar la organización de ejercicios.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 rounded-xl border border-trainix-blue/25 bg-trainix-blue/10 p-4">
                <p className="text-sm text-white">
                  <strong className="font-semibold">Nota:</strong> Trainix no reemplaza la experiencia,
                  supervisión ni criterio de un profesional del entrenamiento.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8">
                <Link
                  href="/fit"
                  className="inline-block rounded-xl bg-trainix-gradient px-7 py-3.5 text-base font-semibold text-trainix-bg shadow-lg shadow-trainix-blue/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  Probar Trainix
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-trainix-surface p-4"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-trainix-green/15 text-trainix-green">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-white">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

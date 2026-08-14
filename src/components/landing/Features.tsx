import Reveal from './Reveal';

const FEATURES = [
  { title: 'Rutinas generadas con inteligencia artificial', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { title: 'Planes para diferentes objetivos', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4v6l4 2' },
  { title: 'Organización por días de la semana', icon: 'M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Series y repeticiones recomendadas', icon: 'M4 6h16M4 12h16M4 18h10' },
  { title: 'Videos explicativos mediante YouTube', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Rutinas guardadas', icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z' },
  { title: 'Posibilidad de generar múltiples planes', icon: 'M4 5a2 2 0 012-2h8a2 2 0 012 2v2m2 0h2a2 2 0 012 2v10a2 2 0 01-2 2H10a2 2 0 01-2-2v-2' },
  { title: 'Personalización según nivel y disponibilidad', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
  { title: 'Interfaz simple para consultar durante el entrenamiento', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
];

export default function Features() {
  return (
    <section className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-sora text-3xl font-bold text-white sm:text-4xl">
            Todo lo que necesitas para entrenar con un plan claro
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-trainix-surface p-5 transition-colors hover:border-trainix-blue/30">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-trainix-blue/25 bg-trainix-blue/10 text-trainix-blue">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={f.icon} />
                  </svg>
                </div>
                <p className="pt-1.5 text-sm font-medium leading-snug text-white">{f.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

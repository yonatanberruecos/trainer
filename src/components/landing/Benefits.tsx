import Reveal from './Reveal';

const BLOCKS = [
  {
    title: 'Planificación personalizada',
    text: 'Tu rutina se adapta a la información que proporcionas.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Más confianza al entrenar',
    text: 'Conoce qué ejercicio realizar, cuántas series completar y cómo ejecutar el movimiento.',
    icon: 'M5 13l4 4L19 7',
  },
  {
    title: 'Flexibilidad',
    text: 'Genera diferentes rutinas para distintos objetivos o etapas de entrenamiento.',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  },
  {
    title: 'Acceso permanente',
    text: 'Consulta tus rutinas guardadas en cualquier momento.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-sora text-3xl font-bold text-white sm:text-4xl">
            Entrena con más claridad y menos improvisación
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <article className="h-full rounded-2xl border border-white/10 bg-trainix-surface p-6">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-trainix-gradient text-trainix-bg">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} />
                  </svg>
                </div>
                <h3 className="font-sora text-lg font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-trainix-muted">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

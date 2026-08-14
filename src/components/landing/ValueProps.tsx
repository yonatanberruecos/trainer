import Reveal from './Reveal';

const CARDS = [
  {
    title: 'Rutinas personalizadas',
    text: 'Genera planes basados en tu edad, nivel de experiencia, peso, estatura, disponibilidad semanal y objetivo personal.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Ejercicios explicados',
    text: 'Cada ejercicio incluye series, repeticiones y un video demostrativo para ayudarte a comprender correctamente el movimiento.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Entrena cuando quieras',
    text: 'Guarda tus rutinas y consúltalas desde cualquier dispositivo mientras estás entrenando.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

export default function ValueProps() {
  return (
    <section className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-sora text-3xl font-bold text-white sm:text-4xl">
            Una forma más clara de estructurar tu entrenamiento
          </h2>
          <p className="mt-5 text-base leading-relaxed text-trainix-muted sm:text-lg">
            Trainix organiza tu rutina según tu información y tus objetivos. Ya sea que entrenes por tu
            cuenta o cuentes con un entrenador personal, puedes utilizar la plataforma para construir
            planes de entrenamiento más completos, claros y fáciles de seguir.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <article className="group h-full rounded-2xl border border-white/10 bg-trainix-surface p-7 transition-colors hover:border-trainix-green/30">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-trainix-green/25 bg-trainix-green/10 text-trainix-green">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="font-sora text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-trainix-muted">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

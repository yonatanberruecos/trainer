import Reveal from './Reveal';

const TESTIMONIALS = [
  {
    quote:
      'Antes perdía mucho tiempo buscando ejercicios. Con Trainix tengo mi semana organizada y puedo consultar cada movimiento.',
    author: 'Usuario de prueba',
  },
  {
    quote:
      'Me ayuda a crear una base para mis rutinas y luego ajustarlas según la evolución de cada cliente.',
    author: 'Usuario de prueba',
  },
  {
    quote: 'Me gusta poder guardar diferentes rutinas según el objetivo que esté trabajando.',
    author: 'Usuario de prueba',
  },
];

export default function Testimonials() {
  return (
    <section className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-sora text-3xl font-bold text-white sm:text-4xl">
            Lo que dicen quienes prueban Trainix
          </h2>
          <p className="mt-3 text-sm text-trainix-muted">
            Contenido de demostración. Reemplázalo por testimonios reales antes de publicar.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-trainix-surface p-7">
                <svg className="h-8 w-8 text-trainix-green/50" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5V6zm9 0A5.17 5.17 0 0011 11.17V18h6.83v-6.83H14.5a1.67 1.67 0 011.67-1.67V6z" />
                </svg>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm font-medium text-trainix-muted">— {t.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

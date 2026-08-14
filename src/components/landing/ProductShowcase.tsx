import Reveal from './Reveal';

const SCREENS = [
  { label: 'Información corporal', desc: 'Formulario de datos', tint: 'green' },
  { label: 'Selección de objetivos', desc: 'Define tu meta', tint: 'blue' },
  { label: 'Rutina semanal', desc: 'Organizada por días', tint: 'green' },
  { label: 'Detalle de ejercicio', desc: 'Series y repeticiones', tint: 'blue' },
  { label: 'Video explicativo', desc: 'Aprende la técnica', tint: 'green' },
  { label: 'Rutinas guardadas', desc: 'Consulta cuando quieras', tint: 'blue' },
];

export default function ProductShowcase() {
  return (
    <section className="scroll-anchor relative border-y border-white/5 bg-trainix-surface/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-sora text-3xl font-bold text-white sm:text-4xl">
            Una experiencia diseñada para acompañarte en el gimnasio
          </h2>
          <p className="mt-5 text-base leading-relaxed text-trainix-muted sm:text-lg">
            Consulta tu rutina, revisa tus repeticiones y reproduce los videos de cada ejercicio sin
            perder tiempo buscando información en diferentes plataformas.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCREENS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 90}>
              <figure className="overflow-hidden rounded-2xl border border-white/10 bg-trainix-surface">
                {/* Faux screen */}
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${
                    s.tint === 'green'
                      ? 'from-trainix-green/15 to-trainix-bg'
                      : 'from-trainix-blue/15 to-trainix-bg'
                  }`}
                >
                  <div className="w-3/4 space-y-2.5 rounded-xl border border-white/10 bg-trainix-bg/70 p-4 backdrop-blur">
                    <div className={`h-2.5 w-1/2 rounded-full ${s.tint === 'green' ? 'bg-trainix-green/60' : 'bg-trainix-blue/60'}`} />
                    <div className="h-2 w-full rounded-full bg-white/10" />
                    <div className="h-2 w-5/6 rounded-full bg-white/10" />
                    <div className="h-2 w-2/3 rounded-full bg-white/10" />
                  </div>
                </div>
                <figcaption className="p-5">
                  <p className="font-sora text-base font-semibold text-white">{s.label}</p>
                  <p className="mt-1 text-sm text-trainix-muted">{s.desc}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

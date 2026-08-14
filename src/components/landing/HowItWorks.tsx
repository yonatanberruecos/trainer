import Reveal from './Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Cuéntanos sobre ti',
    text: 'Ingresa tu edad, peso, estatura, nivel de experiencia y preferencias de entrenamiento.',
  },
  {
    n: '02',
    title: 'Define tu objetivo',
    text: 'Selecciona si quieres ganar masa muscular, perder grasa, mejorar tu condición física o trabajar zonas específicas.',
  },
  {
    n: '03',
    title: 'La IA crea tu rutina',
    text: 'Trainix organiza ejercicios, series, repeticiones y días de entrenamiento según tu información.',
  },
  {
    n: '04',
    title: 'Guárdala y empieza',
    text: 'Consulta tu rutina en cualquier momento y utiliza los videos para guiarte durante el entrenamiento.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-trainix-green">Cómo funciona</span>
          <h2 className="mt-3 font-sora text-3xl font-bold text-white sm:text-4xl">
            Tu próxima rutina en pocos pasos
          </h2>
        </Reveal>

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-trainix-green/40 via-trainix-blue/40 to-transparent lg:block"
          />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 100} className="relative">
              <div className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-trainix-green/30 bg-trainix-bg font-sora text-lg font-bold text-trainix-green">
                {step.n}
              </div>
              <h3 className="font-sora text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-trainix-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

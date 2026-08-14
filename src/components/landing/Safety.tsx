import Reveal from './Reveal';

const RECOMMENDATIONS = [
  'Consultar a un profesional de la salud antes de iniciar un programa de ejercicio.',
  'Informar lesiones, limitaciones o condiciones médicas.',
  'Suspender el ejercicio si se presenta dolor, mareo o dificultad respiratoria.',
  'Priorizar una técnica correcta sobre el peso utilizado.',
];

export default function Safety() {
  return (
    <section className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-trainix-surface p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-trainix-green/25 bg-trainix-green/10 text-trainix-green">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <h2 className="font-sora text-2xl font-bold text-white sm:text-3xl">
                Entrena de forma responsable
              </h2>
            </div>

            <p className="mt-5 text-base leading-relaxed text-trainix-muted">
              Las rutinas generadas por Trainix tienen fines informativos y de orientación general. No
              constituyen asesoría médica, fisioterapéutica ni reemplazan el acompañamiento de un
              entrenador certificado.
            </p>

            <ul className="mt-6 space-y-3">
              {RECOMMENDATIONS.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-trainix-green" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

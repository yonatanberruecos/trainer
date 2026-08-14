'use client';

import { useState } from 'react';
import Reveal from './Reveal';

const FAQS = [
  {
    q: '¿Trainix reemplaza a un entrenador personal?',
    a: 'No. Trainix es una herramienta de apoyo para generar y organizar rutinas. Un entrenador puede supervisar la técnica, adaptar el plan y realizar ajustes según tu evolución.',
  },
  {
    q: '¿Cómo se crea una rutina?',
    a: 'El usuario ingresa información sobre sus características corporales, experiencia, disponibilidad y objetivos. La inteligencia artificial utiliza esos datos para generar una propuesta de entrenamiento.',
  },
  {
    q: '¿Puedo crear más de una rutina?',
    a: 'Sí. Puedes generar diferentes rutinas para distintos objetivos y guardarlas para consultarlas posteriormente.',
  },
  {
    q: '¿Los ejercicios incluyen videos?',
    a: 'Sí. Los ejercicios pueden incluir videos explicativos obtenidos mediante los servicios de la API de YouTube.',
  },
  {
    q: '¿Puedo usar Trainix desde el gimnasio?',
    a: 'Sí. La interfaz es ligera y fácil de consultar desde un teléfono móvil.',
  },
  {
    q: '¿Trainix ofrece asesoría médica?',
    a: 'No. Trainix no brinda diagnósticos, tratamientos ni recomendaciones médicas.',
  },
  {
    q: '¿Mis rutinas quedan guardadas?',
    a: 'Sí. Los usuarios registrados pueden guardar y consultar sus rutinas cuando las necesiten.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-anchor relative py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-trainix-green">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 font-sora text-3xl font-bold text-white sm:text-4xl">
            Resolvemos tus dudas
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={(i % 4) * 60}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-trainix-surface">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-sora text-base font-medium text-white">{item.q}</span>
                      <svg
                        className={`h-5 w-5 flex-shrink-0 text-trainix-green transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-trainix-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

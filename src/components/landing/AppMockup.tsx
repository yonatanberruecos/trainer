/**
 * Stylized phone mockup of the Trainix "routine of the day" screen.
 * Pure markup (no external images) so it stays crisp at any size.
 */
export default function AppMockup() {
  const exercises = [
    { name: 'Press de banca', sets: '4', reps: '10' },
    { name: 'Press inclinado con mancuernas', sets: '3', reps: '12' },
    { name: 'Aperturas en polea', sets: '3', reps: '15' },
    { name: 'Fondos en paralelas', sets: '3', reps: '12' },
  ];

  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]">
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border border-white/10 bg-trainix-surface p-3 shadow-2xl shadow-trainix-green/10 ring-1 ring-white/5">
        {/* Notch */}
        <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />

        {/* Screen */}
        <div className="overflow-hidden rounded-[2rem] bg-trainix-bg">
          <div className="space-y-4 p-5 pt-8">
            {/* Greeting */}
            <div>
              <p className="text-xs text-trainix-muted">Buenos días 👋</p>
              <p className="font-sora text-lg font-semibold text-white">Hola, Andrés</p>
            </div>

            {/* Objective */}
            <div className="rounded-xl border border-trainix-green/20 bg-trainix-green/10 px-4 py-3">
              <p className="text-[10px] uppercase tracking-wide text-trainix-green">Objetivo</p>
              <p className="text-sm font-medium text-white">Ganar masa muscular</p>
            </div>

            {/* Routine of the day */}
            <div className="flex items-center justify-between">
              <p className="font-sora text-sm font-semibold text-white">Rutina de hoy</p>
              <span className="rounded-full bg-trainix-blue/15 px-2.5 py-1 text-[10px] font-medium text-trainix-blue">
                Día 1 · Pecho
              </span>
            </div>

            {/* Exercises */}
            <ul className="space-y-2.5">
              {exercises.map((ex) => (
                <li
                  key={ex.name}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-trainix-surface-2 p-2.5"
                >
                  {/* Video thumbnail */}
                  <div className="relative flex h-11 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-trainix-green/25 to-trainix-blue/25">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white">{ex.name}</p>
                    <p className="text-[10px] text-trainix-muted">
                      {ex.sets} series · {ex.reps} reps
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Start button */}
            <button
              type="button"
              className="w-full rounded-xl bg-trainix-gradient py-3 text-sm font-semibold text-trainix-bg"
            >
              Comenzar entrenamiento
            </button>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="animate-float absolute -left-6 top-16 hidden rounded-xl border border-trainix-green/25 bg-trainix-surface/90 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur sm:block">
        <span className="mr-1">🤖</span> Rutina creada por IA
      </div>
      <div className="animate-float-slow absolute -right-8 top-40 hidden rounded-xl border border-trainix-blue/25 bg-trainix-surface/90 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur sm:block">
        📅 5 días por semana
      </div>
      <div className="animate-float absolute -left-4 bottom-24 hidden rounded-xl border border-white/10 bg-trainix-surface/90 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur sm:block">
        🎯 Objetivo: ganar masa muscular
      </div>
      <div className="animate-float-slow absolute -right-6 bottom-8 hidden rounded-xl border border-trainix-green/25 bg-trainix-surface/90 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur sm:block">
        ▶️ Video explicativo incluido
      </div>
    </div>
  );
}

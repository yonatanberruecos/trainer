// Maps a stored workout objective (LOSS / MUSCLE / FLEXIBILITY) to its translation key.
// Returns null when the objective is unknown, so callers can fall back to the raw value.
export function getObjectiveTranslationKey(objective: string): string | null {
  switch (objective.toUpperCase()) {
    case 'LOSS': return 'mylist.objectiveLoss';
    case 'MUSCLE':
    case 'BUILD': return 'mylist.objectiveMuscle';
    case 'FLEXIBILITY': return 'mylist.objectiveFlexibility';
    default: return null;
  }
}

export interface Exercise {
  name: string;
  // form_notes: string; // notes about how to properly perform
  // setup_notes: string; // notes about how to setup machine
}
export interface ExercisesData {
  [id: string]: Exercise;
}

export interface Workout {
  name: string;
  datetime: string;
  exercises: WorkoutExercise[];
}
export interface WorkoutData {
  [id: string]: Workout;
}
export interface WorkoutExercise {
  exercise_id: string | undefined;
  // ex 225lbs 4x8
  sets: number;
  avg_reps: number;
  avg_weight: number;
}

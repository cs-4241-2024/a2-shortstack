import {
  Exercise,
  ExercisesData,
  Workout,
  WorkoutData,
  WorkoutExercise,
} from "./types.ts";

const WORKOUTS_FILE = "data/workouts.json";
const EXERCISES_FILE = "data/exercises.json";

export async function readExercises(): Promise<ExercisesData> {
  const json = await Deno.readTextFile(EXERCISES_FILE);
  return JSON.parse(json) as ExercisesData;
}

export async function addExercise(newExercise: Exercise): Promise<void> {
  const exercises = await readExercises();
  exercises[crypto.randomUUID()] = newExercise;
  const json = JSON.stringify(exercises, null, 2);
  await Deno.writeTextFile(EXERCISES_FILE, json);
}

export async function readWorkouts(): Promise<WorkoutData> {
  const json = await Deno.readTextFile(WORKOUTS_FILE);
  return JSON.parse(json) as WorkoutData;
}

export async function readWorkout(id: string): Promise<Workout> {
  const workouts = await readWorkouts();
  return workouts[id];
}

export async function newWorkout(): Promise<string> {
  const workouts = await readWorkouts();
  const newWorkout: Workout = {
    name: "",
    datetime: new Date().toISOString(),
    exercises: [],
  };
  const id = crypto.randomUUID();
  workouts[id] = newWorkout;
  const json = JSON.stringify(workouts, null, 2);
  await Deno.writeTextFile(WORKOUTS_FILE, json);
  return id;
}

export async function addExerciseToWorkout(
  workoutID: string,
): Promise<boolean> {
  const workouts = await readWorkouts();
  if (!workouts[workoutID]) {
    return false;
  }

  const newExercise: WorkoutExercise = {
    exercise_id: undefined,
    sets: 4,
    avg_reps: 8,
    avg_weight: 225,
  };
  workouts[workoutID].exercises.push(newExercise);
  const json = JSON.stringify(workouts, null, 2);
  await Deno.writeTextFile(WORKOUTS_FILE, json);

  return true;
}

export async function removeExerciseFromWorkout(
  workoutID: string, exerciseIndex: number
): Promise<boolean> {
  const workouts = await readWorkouts();
  if (!workouts[workoutID]) {
    return false;
  }

  workouts[workoutID].exercises.splice(exerciseIndex, 1);
  const json = JSON.stringify(workouts, null, 2);
  await Deno.writeTextFile(WORKOUTS_FILE, json);

  return true;
}

export async function saveWorkout(
  workoutID: string,
  formData: FormData,
): Promise<boolean> {
  const workouts = await readWorkouts();
  if (!workouts[workoutID]) {
    return false;
  }

  const numExercises = workouts[workoutID].exercises.length;
  const newExercises: WorkoutExercise[] = [];

  for (let i = 0; i < numExercises; i++) {
    const prefix = `exercise[${i}]-`;
    const newExercise: WorkoutExercise = {
      exercise_id: formData.get(prefix + "id") as string,
      sets: Number(formData.get(prefix + "sets")),
      avg_reps: Number(formData.get(prefix + "avg_reps")),
      avg_weight: Number(formData.get(prefix + "avg_weight")),
    };
    newExercises.push(newExercise);
  }

  workouts[workoutID].name = formData.get("name") as string;
  workouts[workoutID].exercises = newExercises;

  const json = JSON.stringify(workouts, null, 2);
  await Deno.writeTextFile(WORKOUTS_FILE, json);

  return true;
}


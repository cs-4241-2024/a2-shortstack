import { Application, Router } from "@oak/oak";
import {
  Handlebars,
  HandlebarsJS,
} from "https://deno.land/x/handlebars/mod.ts";
import {
  readExercises,
  addExercise,
  newWorkout,
  readWorkout,
  readWorkouts,
  addExerciseToWorkout,
  saveWorkout,
  removeExerciseFromWorkout,
} from "./io.ts";

const handle = new Handlebars();
const router = new Router();

router.get("/", async (context) => {
  context.response.body = await handle.renderView("index");
});

router.get("/new_workout", async (context) => {
  const id = await newWorkout();
  context.response.redirect("/workout/" + id);
});

router.get("/workout/:id", async (context) => {
  const origin = context.request.url.origin;
  const exercises = await readExercises();
  const id = context?.params?.id;
  let workout;
  if (id && (workout = await readWorkout(id))) {
    context.response.body = await handle.renderView("workout", {
      exercises,
      workout,
      origin
    });
  } else {
    context.response.status = 400;
    context.response.body = "Invalid workout ID";
  }
});

router.post("/workout/:id/add_exercise", async (context) => {
  const id = context?.params?.id;
  console.log(1, id);
  if (id && (await addExerciseToWorkout(id))) {
    context.response.status = 201;
    context.response.body = { message: "Exercise added successfully" };
  } else {
    context.response.status = 400;
    context.response.body = "Invalid workout ID";
  }
});

router.post("/workout/:workout_id/remove_exercise/:exercise_index", async (context) => {
  const workoutID = context?.params?.workout_id;
  const exerciseIndex = Number(context?.params?.exercise_index);
  if (workoutID && !isNaN(exerciseIndex) && (await removeExerciseFromWorkout(workoutID, exerciseIndex))) {
    context.response.status = 201;
    context.response.body = { message: "Exercise removed successfully" };
  } else {
    context.response.status = 400;
    context.response.body = "Invalid workout ID";
  }
});

router.post("/workout/:id/save", async (context) => {
  const id = context?.params?.id;
  const formData = await context.request.body?.formData();
  if (id && formData && (await saveWorkout(id, formData))) {
    context.response.status = 201;
    context.response.body = { message: "Exercise saved successfully" };
  } else {
    context.response.status = 400;
    context.response.body = "Error"; //troll
  }
});

router.get("/workouts", async (context) => {
  const workouts = await readWorkouts();
  const exercises = await readExercises();
  const empty = Object.keys(workouts).length == 0;
  context.response.body = await handle.renderView("workouts", {
    exercises,
    workouts,
    empty
  });
});

router.get("/exercises", async (context) => {
  const exercises = await readExercises();
  const empty = Object.keys(exercises).length == 0;
  context.response.body = await handle.renderView("exercises", { exercises, empty });
});

router.post("/new_exercise", async (context) => {
  const formData = await context.request.body?.formData();
  await addExercise({
    name: formData.get("name") as string,
    // form_notes: formData.get("form_notes") as string,
    // setup_notes: formData.get("setup_notes") as string,
  });
  context.response.status = 201;
  context.response.body = { message: "Exercise added successfully" };
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context, next) => {
  if (
    context.request.url.pathname.startsWith("/js/") ||
    context.request.url.pathname.startsWith("/css/")
  ) {
    await context.send({
      root: Deno.cwd() + "/views",
    });
  } else {
    await next();
  }
});

// deno-lint-ignore no-explicit-any
(HandlebarsJS as any).registerHelper("eq", (a: any, b: any) => a == b);
// deno-lint-ignore no-explicit-any
(HandlebarsJS as any).registerHelper("or", (a: any, b: any) => a || b);
// deno-lint-ignore no-explicit-any
(HandlebarsJS as any).registerHelper("formatDate", (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    hour12: true
  }).replace(',', '');
});

await app.listen({ port: 3000 });

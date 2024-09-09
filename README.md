# Workout Logger Fast (WlF)
Do you find yourself wasting time during your workout logging
every set on your workout app? Do you feel like this is a waste
of time but still want some data?

If so, look no further than WlF! With WlF, theres no need
to log things perfectly. You can simply write `225lbs 4x8`
for an exercise, which is good enough for future reference
(even if not exact). Its easy enough that you can simply
log your workout at the end in a few minutes, so you
can have a distraction free workout.

## Technical Achievements
- Add, delete, and edit exercises for each workout
- Data saved in JSON format
- Handlebars SSR + templating
- Seamless page refreshing + SSR gives feel of single-page app
- Deno + TypeScript + Oak server
- Automatically populated select for workouts

## Design/Evaluation Achievements
- NES-style
- Google fonts

## Running
__Watch__:
```bash
deno run dev
```

## Roadmap
 - exercise page + notes
 - remove exercise
 - workout summary on workouts page
 - better server fault tolerance

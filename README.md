# To-Do List Application

## Project Summary

This To-Do List application is a dynamic, single-page web application that was designed with a dark autumn theme in mind. It allows users to add, edit, and delete tasks, and each task has a calculated deadline based on its priority. The application uses HTML, CSS, JavaScript, and Node.js, and has active client-server as well as a way to manipulate the data through the front end.

## Technical Achievements

- **Single-Page Application**

  - The application is a single-page app that has a form for users to submit to do data and displays the current state of the server-side data. Actions such as adding, editing, and deleting tasks, update the task list in real-time.

- **Add, Delete, and Edit Functionality**

  - The application includes a form that allows users to add new tasks, a delete function to remove tasks, and an edit function to modify existing tasks details such as the name and the priority of the task.

- **Deadline Calculation**
  - The server calculates a `deadline` based on the `creation_date` and `priority` of each task. Tasks with high priority are assigned shorter deadlines compared to low-priority.
- **Node.js HTTP Server**

  - The server manages HTTP requests to deliver content, handle form submissions, and update task data. Also, Node.js is used to serve static files, process JSON data, and maintain an in-memory dataset of tasks, efficiently responding to client actions.

- **Responsive User interface with JavaScript**
  - JavaScript is able to create table rows for tasks and update the displayed data immedietly as the application uses JavaScript fetch requests to interact with the server.
- **Passes the W3C Markup Validation**
  ![Screenshot of To-Do List Application](https://cdn.glitch.global/45d2c2d4-c421-472e-abef-f0390d50c43a/Screenshot%202024-09-08%20at%208.53.19%E2%80%AFPM.png?v=1725849996832)

## Design Achievements

- **Dark Autumn Aesthetic**

  - The user interface features a dark color palette inspired by autumn, with orange, green, and brown. This design creates a warm and themed experience.

- **Enhanced Typography with Google Fonts**
  - The application uses the `Merriweather` font from Google Fonts, providing an elegant, readable typeface.
- **Responsive Layout**

  - Flexbox is used to layout the form and task table that adjusts smoothly to different screen sizes.

- **Interactive Buttons**
  - Buttons are styled with hover effects and changes color when user has cursor over button, making the site more engaging.
- **Color Contrast**
  - The colors used throughout the application ensure high contrast for legibility and aesthetic.

## Evaluation Achievements

### User Evaluation 1:

- **Evaluator:** [Afonseca]
- **Problem Encountered:** [Did not report any issues]
- **Surprising Comments:** [Overall said the website looked cute and easy to use]
- **Suggested Changes:** [no suggested changes at this time]

### User Evaluation 2:

- **Evaluator:** [Jay]
- **Problem Encountered:** [Also did not report any issues]
- **Surprising Comments:** [overall said they really like the dark theme of the project as it contrasts well]
- **Suggested Changes:** [Suggested making the background something more engaging than a solid color and also making the deadlines manually editable]

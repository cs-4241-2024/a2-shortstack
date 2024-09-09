Kenneth Smith a2 
https://a2-kjavsmith.glitch.me

# Simple Todo App

This project is a **two-tier web application** that allows users to manage a list of tasks with varying priorities and deadlines. It features a fully interactive interface where users can add, edit, and delete tasks, and the data is dynamically updated and reflected on both the client and server sides. The project is built using **HTML, CSS, JavaScript (for the front end)** and **Node.js** (for the back end), demonstrating real-time communication between the server and client.

## Features

### Baseline Requirements
The baseline requirements for the application were as follows:

1. **Server**:
   - The server serves static files (HTML, CSS, and JavaScript) and also maintains a **tabular dataset** in memory, consisting of tasks. Each task contains:
     - **Task Name**: The description of the task.
     - **Priority**: A numerical value (1-5) representing the priority of the task.
     - **Deadline**: The due date for the task.

2. **Results Functionality**:
   - The app displays all tasks currently stored in the server's memory.
   - Tasks are displayed in a tabular format, showing the task name, priority, deadline, and options to edit or delete.

3. **Form/Entry Functionality**:
   - Users can add tasks by filling out a form that includes:
     - **Task Name**: Input field for the name of the task.
     - **Priority**: A number between 1 and 5, where 1 is the lowest priority and 5 is the highest.
     - **Deadline**: A date input to specify the due date of the task.
   - Users can delete tasks or edit existing ones, both of which trigger real-time updates of the task list.

4. **Server Logic**:
   - Upon receiving new or updated task data, the server processes the data and includes derived fields, such as task urgency based on the deadline and priority.
   - The server communicates back to the client whenever changes are made (e.g., adding, deleting, or editing tasks).

5. **Derived Fields**:
   - Tasks due within the next 7 days are automatically flagged as urgent and styled with **bold text** to indicate their importance.
   - Tasks are colored dynamically based on their priority level, ensuring visual distinction between tasks of varying importance.

### Functionalities Demonstrated

#### HTML
- The app features a single HTML form where users can input:
  - **Task name** (text input)
  - **Priority** (number input between 1 and 5)
  - **Deadline** (date input)
- The task list is displayed using a **table** element, which updates dynamically as users interact with the app.
- All HTML elements are structured to ensure accessibility and proper validation.

#### CSS
- The app uses **CSS** to style the form, table, and various elements of the page. The styling demonstrates:
  - **CSS Selectors** for both element-level and class-based styles.
  - Priority-specific styles to visually distinguish tasks based on urgency.
  - Layouts using **CSS Grid** and **Flexbox** to create a responsive and intuitive design.
- The color scheme includes:
  - **Black background** with **orange text** for the main layout.
  - **Priority-based color changes** for the tasks:
    - Priority 1: White background, black text.
    - Priority 2: Purple background, white text.
    - Priority 3: Pink background, black text.
    - Priority 4: Blue background, white text.
    - Priority 5: Red background, white text.
  
#### JavaScript
- **JavaScript** is used extensively for front-end interaction:
  - Fetches data from the server using **AJAX** (Fetch API) to dynamically update the task list without requiring a page reload.
  - Adds, deletes, and edits tasks via client-side scripts that communicate with the server-side logic.
  - Implements event handling for form submission, task deletion, and task editing.
  - Updates the UI in real-time, showing changes to the task list dynamically as the user interacts with the app.

#### Node.js
- The app uses **Node.js** to handle server-side operations:
  - A **Node.js HTTP server** processes requests to fetch, add, delete, and update tasks.
  - Data is stored in memory (in a simple array) during the session, simulating a database.
  - The server generates **derived fields** such as task urgency based on the deadline and priority, and returns this data to the client.

## Extra Technical and Design Achievements

### Technical Achievements

1. **Single Page Application (SPA)**:
   - The app operates as a **single-page application**, where data is dynamically updated without a full-page reload. The form submission, task deletion, and task editing are all handled through JavaScript, and the server returns updated data that is immediately reflected in the UI.

2. **Priority-Based Styling**:
   - Each task in the list has a **background and text color** determined by its priority. This was implemented using CSS classes that are dynamically added to each task row based on the priority value.
     - Priority 1: White background, black text.
     - Priority 2: Purple background, white text.
     - Priority 3: Pink background, black text.
     - Priority 4: Blue background, white text.
     - Priority 5: Red background, white text.
  
3. **Deadline Alerts**:
   - Tasks with a deadline within the next 7 days are automatically marked as urgent and displayed with **bold text**, helping users quickly identify tasks that are due soon.

4. **Task Editing**:
   - Users can **edit existing tasks** via a prompt system that allows them to update the task name, priority, and deadline. The changes are immediately reflected in the task list after the server processes the updates.

### Design Achievements

1. **User Testing and Feedback**:
   - The app was tested by two users who provided feedback via the **think-aloud protocol**, where they performed tasks and provided real-time feedback on the interface.

   #### User Testing Results:

   **User 1: Isabel **
   - **Task Given**: Add a task named "Study for exam" with priority 4 and deadline "2024-09-15", then edit it to priority 2 and deadline "2024-09-10", and finally delete it.
   - **Problems encountered**:
     - John mentioned that the **Edit** and **Delete** buttons were too close together, causing him to  delete the task and having to do it again.
   - **Surprising comments**:
     - John expected the app to offer a clearer indication of when tasks were close to their deadlines, such as a popup or notification.
   - **Changes I would make**:
     - Increase the space between the **Edit** and **Delete** buttons to prevent accidental deletions.
     - Add additional urgency indicators, such as color shifts or alerts, for tasks that are close to their deadline.

   **User 2: Jane Doe**
   - **Task Given**: Add a task named "Finish project" with priority 5 and deadline "2024-09-20", then delete it.
   - **Problems encountered**:
     - Jane mentioned that it was not immediately clear what the different priority colors represented.
   - **Surprising comments**:
     - Jane liked the color-coded system once she understood it but suggested adding a small legend or tooltip to explain the priority-based color coding.
   - **Changes I would make**:
     - Add a legend or tooltip to clarify the priority-based color system, especially for new users.

### Installation and Setup Instructions

To run the app locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/simple-todo-app.git
   cd simple-todo-app

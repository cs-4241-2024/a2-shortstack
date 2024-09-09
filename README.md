# Student Management System

This project is a web application designed to manage student data, including adding, updating, and deleting student records. The application uses a two-tier architecture with a Node.js server and a client-side interface built with HTML, CSS, and JavaScript. The server maintains a dataset of student records and computes derived fields such as grade letters and class statistics.

Link to Glitch project: [a2-aldencutler.glitch.me]

CSS Positioning Technique:

- The application uses CSS Flexbox for layout management of the submission form. Flexbox is utilized to create a responsive and flexible layout for the form and table elements, ensuring that the interface is user-friendly and visually appealing across different screen sizes.

## Instructions

Adding a Student:

- Fill out the form fields for the student's name, class year, and grade. Click the "Add/Update" button to add the student to the table. The server will compute the grade letter and update the class statistics.

Updating a Student:

- Modify the existing student's details in the form fields. Click the "Add/Update" button to update the student's entry in the table.

Deleting a Student:

- Enter the student's name in the form field. Click the "Delete" button to remove the student from the table and update the class statistics.

Viewing Class Statistics:

- The class statistics, including average grades and student counts for each class year, are automatically updated and displayed in the stats table on the page whenever a student is added, updated, or deleted from the database.

## Technical Achievements

- **Single-Page Application**: Implemented a single-page application that provides a form for users to submit data and always shows the current state of the server-side data. When the user submits data, the server responds by sending back the updated data, including the derived field calculated on the server, and the client updates its data display accordingly.
- **Data Modification**: Added functionality to modify existing data on the server. Users can update student records directly from the form, and the changes are reflected in both the server-side dataset and the client-side display.
- **Persistent Data**: On page reload, the page automatically fetches any existing students (if any), adds them to the table, and updates the class statistics.

## Design/Evaluation Achievements

- **Modular Design**: Implemented a modular design by separating functionality into different files such as `student.js`, `main.js`, and `server.js`. This design allows for better organization of code and easier maintenance and readability.
  - Used ES6 modules to import/export functions between files, enabling better encapsulation and separation of functionality.
- **Dynamic Updates**: Utilized dynamic updates to the class statistics table to provide real-time feedback to users when adding, updating, or deleting student records. The statistics are automatically recalculated and displayed on the page without requiring a full page reload.
- **Usability Testing**: Conducted usability testing to evaluate the user experience of the application. The feedback from the testing helped identify areas for improvement, such as adding clearer instructions and error messages for users.
  - **Student 1**:
    - *Last Name*: Welcher
    - *Problems*: He said he would recommend "putting a note that the name has to be the same to update"
    - *Comments*: He liked the layout of the page and said it was overall easy to use, other than the functionality for updating data not being as intuitive as it could be.
    - *Changes*: I would probably change the way the data is updated. While doing a think-aloud for another student, I noticed that I was able to change the data directly from the table and press a save button to update the data. I think this is a much more intuitive way for users to update data, being much more similar to other applications like Excel or Google Sheets.

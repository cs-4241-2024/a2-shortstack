Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===
## Mood Tracker
A Mood Tracker is an application that keeps track of your overall emotional state over a period of time. I inspired mysef from the iOS applciation Daylio, but basically the goal is to have a friendly user interface where users can log their mental status whenever needed, by enabling them to select a mood from the drop down and optionally write a comment to serve as context behind this mood input. When the button submit is clicked, the mood is synthised, the current date and time is added to the mood object, an id is generated, and a mood score is integrated. This new mood is then shown on the mood table log where the user can read and vizualise their past mood logs, kind of like a journal. 

Application Usage Instructions:
1. Select a mood from the dropdown (this step is mandatory in submitting the form, otherwise an alert message will pop up and warn you).
2. Write a comment to explain your mood if desired (this step is optional).
3. Click on the button submit to log your mood
4. All the form fields will clear up, allowing you to re-submit a form at length
5. Look around the page, you have access to a table, with logged moods, the status, the time, the mood score
6. You can also delete a mood if you have restropective regret or if this mood doesnt belong to you by clicking on the delete button

The CSS uses flexbox for layout positioning in the .mood-form class to ensure the form elements are aligned vertically and centered. Class selectors are applied to style form elements (.form-input, .form-select, .form-textarea, and .form-button) and the table, providing consistent styling and ensuring readability. To use the application, include the mood-form class on the form element and the respective class selectors on input elements and buttons for proper styling.

## Technical Achievements
- **Single-page App**: My single-app application provides a form for users to fill out, and submit. The table shows the log/data submitted by the form, or in more technical terms, the current state of the server-side data. When a user sends data by clicking on the submit button, the server responds by sending back the updated data (updated because it adds a mood score, and a timestamp to the original data) and the client displays the updated data in the table

### Design/Evaluation Achievements
- **Design Achievement 1**: No Design Achievments

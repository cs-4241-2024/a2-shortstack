A2 - Carter Moore

https://webware-a2-cratermore.glitch.me/

## Book Tracker
This website allows you to add books that you're going to read, are currently reading or have read to track your progress towards a reading goal for the year. The Node.js server handles every GET, POST, DELETE, and PUT request. Every **finished** book counts towards your goal and also displays how many pages you read on average each day based on your start date, end date, and the number of pages in the book.

## Technical Achievements
- **Single-Page App**: The data table takes up the main content while a button opens a dialog modal that contains the form to add new books. Every request to the server that affects the book data returns the updated server-side data so that the client can re-render the table.
- **Modify Status Data**: For books that have not already been read, you can change the status of that book (e.g. not started -> reading). Changing a book's status also affects the date fields - for example if I change a book from not started to reading, the started date automatically populates with today's date.

### Design/Evaluation Achievements
- **UI Study with V. Jagadeesh**: Some buttons could have been more visually responsive, and it was a little confusing trying to update a book's status. I was surprised that the user did not have any trouble using the add book form. I would now like to update my button placement/styling, and make the form clear your submission when cancelling or submitting.

James Cannon https://a2-jcannon64.glitch.me

## Game Wishlist

My application is a wishlist where a user can input a game, its genre, its cost, and a discount, and the server will calculate the cost after the discount before putting it in a table. Users can also delete games from the table, which updates on the same page. I used a flexbox with a column direction to center everything on the page, as well as center the text within the table. Directions are on the page, but please make sure to not include $ or % when inputting the cost and discount because it displays those by default and will mess up calculations.

## Technical Achievements

- **Single Page App**: The form for users to submit data and the current server-side data are both displayed on the same page, which is updated every time the user submits data. The challenging part about this was figuring out how to update the data display immediately after data input.
- **Deleting Data**: Users can delete specific rows of data using delete buttons on the right side of the table. The most challenging parts of this were adding new delete buttons into the table and figuring out how to associate them with the correct table index.

### Design/Evaluation Achievements

- **Tested User Interface**:

1. Neuffer
2. This user felt that the blue might be too bright, that the text boxes should clear after each input, and that some of the inputs like cost and discount should be limited to a certain type.
3. The most surprising comment was that it would be cool to sort the table in different ways, since although I also thought it would be cool, it seemed out of my scope for this assignment.
4. I would change my interface by trying to clear each input form box after the user clicks the submit button, which both makes sense and saves time by not having to backspace everything everytime.

- **Tested User Interface**:

1. Ficarra
2. This user had problems with the size of the input text boxes and the fact that letters can be entered into the number columns which created null values.
3. The most surprising comment was that the existing data wouldn't appear until the submit button was clicked, which was confusing to me because every test before and after this worked perfectly fine in that regard. This may have been a miscommunication or a rare bug.
4. I would change my interface by having the cost and discount input boxes only accept integers and floats, which would eliminate the need for more specific instructions and prevent some values from not showing up in the table.

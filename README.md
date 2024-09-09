## Vivek Jagadeesh A2 - An aplication for managing purchases
Deployment link - https://a2-vivekjag1.glitch.me/

This application allows users to manage their purchases and keep track of their expendetures. 

## Base Requirements 
The base requirements were met in the following ways 
1. The server maintains an array of JSON objects that are created using the html frontend 
2. Results are immedietly shown to the right of the input window 
3. An HTML form is used to enter elements (right-side of the page) and to delete/modift elements. Note that elements can be deleted from the delete button or from the update menu. 
4. The server creates a affoardable field using the others. It determines this by checking if the purchase amount is less than or equal to 15% of the cash on hand. If it is, then its affoardable. 
5. The primary elements are styled with CSS . 
6. Element Selectors were used for dialog, input and select. ID selectors were used for the main container (which uses a flexbox), header text, and disclaimer below the hero text. Class selectors were used for the input area, results area, and form headers. 
7. All layouts use flexbox, includeing 
    - the form 
    - the entire page layout 
    - Each "window"
8. Poppins is used in the body tag of the css to provide a google font rule for all text. 
9. FE JavaScript is used to make requests to the BE. 
10. The BE Node server derives fields and updates records. 
11. All pages validate
## Technical Achievements
1. The application is a single page app and the table to the right updates dynamically as records are created and updated. 
2. All fields of an item can be modified using the edit item button
3. Tested user interface with C.Moore
   - I had C.Moore create a purchase which was NOT affordable, then edit the purchase so it was affoardable, then edit the title before finally deleting the purchase via the form. 
   - Problems the user had with my design: The user found entering a cash on hand and price value confusing because they were not number pickers and there were no directives to include decimal points or not 
   - Suprising comments: I was suprised to learn that that my UI could be made more intuitive by adding some additional directives. 
   - Things I would change: I would make all of the fields more clear (both in the table and in the forms) so that the user understands how to use the application. I would also liked to have made the form clear when a submission was processed. 




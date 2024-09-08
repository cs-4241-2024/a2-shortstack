## Vivek Jagadeesh A2 - An aplication for managing purchases
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

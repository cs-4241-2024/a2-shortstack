

## Restaurant Order Service
- Made by Tri Vien Le

This Application is used to order food from a restaurant and get to the see the cumulative total price of all orders based on your order. You can input your name, food options, and the quantity of your selected food item. After submitting your food request, the program will automatically calculate the price based on your order. 
The application stores the orders on the server and returns back an array of all orders, which is also displayed on the right side of the app window. From the ordered list of food orders, you can also edit/delete the orders which will affect the cumulative total price of all orders. You can play around and see the calculations.
I specifically chose the color scheme and theme to fit a fast-food restaurant with the vibrant red and off-white background to give it a more McDonald's vibe. 


## Technical Achievements
- **Single Page app with functionality**: I have created a single page app for a restaurant service of ordering food. There is a form to submit food requests [full name, food option, food quantity]. The app stores the submitted food requests in the console log with inputted fields [pushed into appdata], sending back the updated data array with all the orders. The data is displayed along with the cumulative total price (calculated by the server/front end) based opn your food option and food quantity. The food orders are also displayed on the right side of the app.
- **Editing/Deleting**: You can edit the orders on the right side of the app after submitting the food order. You can also delete the order. You do both actions by pressing the edit/delete button next to the order. This will also affect the cumulative total price of all food orders if you modify the orders. This also affect the server data if you edit/delete an order.
- **Validation**: The website is validated and receives no errors when validated. 
- **Communication with server via fetch or similar methods**: Implemented the fetch method to input the food order submitted into the appdata array and returns the updated data array in the server. Sends the POST request to the server with the form data (json).
- **Server Logic**: Client sends data such as name, food, quantity and cumulative total price, which is process by the server to generate additional/derived data. The client-side script will calculate the cumulative total price based on the quantity and price of the food item, serving as the derived data locally and then sent ot the server to be pushed into the server data (appdata).
- **Results functionality to display entire dataset**: The renderOrderedItems() displays all the ordered items, which is the food orders. The function loops through the orderedItemArray and displays each item on the list, which is seen on the right of side of the app. Console log also displays the data from the server as well. The orders are being pulled from the server side array (appdata).
- **Adding entries**: The user can add food orders, choosing food options and quantity, which is then pushed into the appdata array on the server side.

### Design/Evaluation Achievements
- **[First Evaluation]**: Finished an evaluation for Stryder Crouse on the application.
- **[Second Evaluation]**: Finished an Evaluation for Jeremy Kurtz on the application.
- **Flexbox/Grid**: Added a flexbox for the buttons in the list items to be horizontal and spaced evenly with the listed items. Added a grid layout for the form (display: grid) with spacing between the form elements. Grid layout in ordered list items (ul#orderedItemsList).
- **HTML/CSS ID Selector**: Implemented #totalPriceField (ID = totalPriceField) and ul#orderedItemsList(ID = orderedItemsList) in the CSS stylesheet.
- **HTML/CSS Class Selector**: implemented a class for the button input, class="submit-btn", and added styling in the CSS stylesheet via [.submit-btn].
- **HTML/CSS Element Selector**: Implemented styling for element selectors such as: body, form, H1, ul, li.
- **External Stylesheet**: All the CSS styling is in the external stylesheet (main.css) and is in [<link rel="stylesheet" href="css/main.css" />] on top of index.html.

### Testing
- Last Name: Crouse
- Problems: Check back-end if it stores data? They refresh the page and their ordered items are gone. [Fixed]
- Comments: Used negative quantity for orders, resulting in negative cumulative data.
- Feedback: Make the ordered items into a table, so it doesn't pop out when ordering food items.

- Last Name: Kurtz
- Problems: Cancel Button doesn't work. No functionality. [Fixed]
- Comments: Color Scheme is good. It fits the vibe of a restaurant order app.
- Feedback: Little disorienting when you add/edit orders. Maybe make a table?

Glitch: https://narrow-habitual-year.glitch.me

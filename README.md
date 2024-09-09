## Laptop Loan Tracker

Christian Rua http://a2-christianr839.glitch.me

This project is a simple form that allows an IT desk to keep track of laptops that are on loan. Users fill out a form indicating the ID number of the laptop and the name of the individual it's being loaned to and their information will be stored server-side and displayed in the table.

There are two rules regarding laptop IDs: Only positive integers are allowed and there can be no duplicates. The application will provide a warning if either of these occur (if you insert a decimal, the floor of that value will be used).

If multiple clients are in use at the same time, the user may select the "pull from server" button to retrieve any data that is stored on the server. Additionally, the table sorts itself and has an additional column to flag any people who appear more than once in the table (this is not case-sensitive).

I used a flexbox column for my UI positioning as well as colors from an Adobe color wheel.

## Technical Achievements

- **Displaying Current State of Data**: Unless there is an error (duplicate or bad ID), the table of loaned laptops will always refresh itself to reflect the current state of the server when a submission is made OR a row is removed (using the 'remove' button alongside each). There are two additional processing steps that also occur: rows are sorted by laptop ID (descending) and a check is done to flag any duplicate names in the table.

## Design/Evaluation Achievements

None

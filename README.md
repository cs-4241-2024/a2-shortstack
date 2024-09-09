## Classmate Tracker
This app is meant to be an easy way to store contact information of classmates that you meet at school.
Users can add classmates and their information to the table. Based on the inputted age, the app
will determine the grade of the student. Users can also delete people from the table.
I used techniques such as CSS display: flex for my main body.
Clicking the add or delete button will send a POST request to the server, and will either add or delete based
on the button pressed. If its add, the server will calculate the expected grade of the classmate and also add that to the data.
The table will then be updated.
The app contains two different html forms.
The app contains a table to display the results of the appdata.
Class, ID and element selectors are all used.
CSS flex box was used.
CSS fonts were used.

Javascript was used for maintaining the functionality of the add and delete buttons.
It was also used to handle communication between the front end and the server, to update and display the appdata.

## Technical Achievements
- **Tech Achievement 1**: I made my website into a single page app. Once data is submitted to the server, the website
automatically updates to reflect the request. All the forms and data is displayed on a single page.

### Design/Evaluation Achievements
- **Design Achievement 1 & 2**
People tested on: Kalavantis, Kapoor.

    A couple of the problems the users had with my design was the formatting of the submit button. They thought it wasnt as strait foreward for how to submit a classmates info. One also mentioned the color scheme could be better, which was 
    supprising because I thought it looked nice and simple.
    Based on this feedback I would probably implement multiple submit boxes, so that all the info doesnt have to be inputted
    as a long string into one box. 

OTHER NOTES:
    Professor approved that I would be able to submit this by midnight, after the noon deadline without using my free late pass
    or loseing points. He just told me to mention it in the read me.

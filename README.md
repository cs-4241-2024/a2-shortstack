## A2 - MKNEUFFER - Matthew Neuffer
https://a2-mkneuffer.glitch.me/

## Age and Date Finder

I created a website that allows you to enter any date and it will return the age of someone born on that date and what day of the week it was.
For the CSS styling, I used basic colors to create contrast, and put the primary content into a box that keeps the users attention at the center of the screen.
There is also a header, that has the title of the page. For the CSS, I used some flex-boxes to positon the content. For the body I used columns to have everything vertically aligned. Then for the list of dates I left it as rows, so that the delete button would be next to the date, not under.
The site displays the oldest age entered and the youngest age entered. This updates when the array is modified using the submit button.

## Technical Achievements

- **Tech Achievement 1**: For this idea, When the user enters the date, it is added to the array which is displayed unter the list of dates collipsable section. In this list, I also added a delete button which will delete that date entry from the array.
  Each object in the array has a Date (The date that was entered), then from this it parses through getting the day, month, and year. Then it also generates the fields for age and day of the week. So in total, from the 1 date entry, it calculates and creates 5 other fields for the object.
  The site and list of dates is updated with new entries and when entries are deleted. To begin with content, I filled in two dates that start the array.
- **Tech Achievement 2**: As I mentioned before, I added the delete button next to each date in the list of dates. This uses the delete request method in the server protocol. When the button next to the date is pressed, that corresponding date is removed from the array.

### Design/Evaluation Achievements

- **Design Achievement 1**: Think Aloud
  - Participant Last Name: Cannon
  - Problems with the Design: One issue is catching errors with the data entered and excluding edge cases such as negative numbers. I used regex to only accept the date format I wanted, but it would be nice if I could accept multiple formats, allowing the user a more straight forward experience. The buttons also may be a bit small. The user said that the dropdown for the list of dates might be a little unnecessary and the colors might be a little bland.
  - Comments that surprised me: A comment that suprised me was the thought that the youngest age should be above the oldest age. I didnt really take into consideration this thought, but I guess it would make sense for the lower number to come first. Also, I didnt really think about it when making it because in the moment it made the most sense, but "oldest age" and "youngest age" might not be best way of phrasing it.
  - What would I change based on the feedback: Based on the feedback, I might lighten up the color pallet, as the grey is a bit dark. I also might add some text formatting such as bolding to the titles like "Oldest Age". Also, I used details tag that we discussed in class, but that might not be super intuitive, so I might replace that with a list that is always visible a more intuitive button.

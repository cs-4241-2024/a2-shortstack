Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

## Your Web Application Title
Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.

This project is a simple one page app that calculates the pressure force on a ball submerged in liquid! Play around with the sliders and choose either water or oil and compare the calculated force values.

Glitch [link](https://piquant-feline-allium.glitch.me)

Validator [link](https://validator.w3.org/nu/?doc=https%3A%2F%2Fpiquant-feline-allium.glitch.me)


## Technical Achievements
- **Tech Achievement 1**: I implemented the app in a single page so the server only sends back last row of the table: `response.end(JSON.stringify(appdata[appdata.length-1]));`. The client also processes only the last row and appends it to the displayed table.


### Design/Evaluation Achievements
- **Design Achievement 1**: I requested feedback from WPI students. Unfortunately they were not current Webware students but their feedback was still useful and I even had the chance to incorporate some of it!
    - Student 1: Kayhart. Problems included lack of column headers and units. When shown, I had not yet applied CSS styling so I was surprised to hear that the barebones look was "no frills, just functional is ok". What I ended up changing was adding column headers and units.
    - Student 2: Gutman. Problems included the slider could be a bit more obvious and the alternating colors in the row tables are too similar. Also suggested starting the row colors with lighter rather than darker. I was surprised about the comment on the slider since it looked intuitive to me and I used the default HTML slider tool. I implemented the suggestions about the table but not for the slider.

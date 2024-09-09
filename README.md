## Anime Tracker Web App
https://a2-ajayamoorthy.glitch.me 
This web app allows you to track what anime you're watching and what you progress is in that show. The user just needs to enter a username, the show title, and what episode number they're on and the tracker generates a card display of their information. 

The CSS positioning technique that was used was a flexbox. 

The `Derived Fields` in this project rely on the use of the Jikan API (an API that connects to myanimelist.net which hold a lot of information about various animes), which is what allows each card to have a cover image. This API is also used to show the user their progress, and it works by taking the number of the last episode watched and the show name to generate the actual progress value. As a bonus, the date the entry is created is also logged.

## Technical Achievements
- **Tech Achievement 1**: This webapp is a single page app where the contents of the server-side data are always displayed as long as they exist. The display also updates every time the submit button is pressed. To demonstrate this functionality, the code comes with one "hard coded" example.

### Design/Evaluation Achievements
- **Design Achievement 1**: 
- **Design Achievement 2**: This isn't one of the achievement options but I was able to use a public API in order to improve the visuals of the app and that was a challenge that I wanted to bring attention to. The code checks the value of the "showTitle" field and cross references myanimelist's database to get the cover image and total number of episodes, amongst other pieces of data. 

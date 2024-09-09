## Match Me!
Glitch: https://a2-hannatrinh.glitch.me
Match Me is a simple shape game where players match colored shapes to their silhouettes. Each turn, the game shuffles the shapes to increase difficulty and keep the game engaging. The project is written in JavaScript and run using Node.js.

## Technical Achievements
- **Single-Page Application**: The game is built as a single-page app where users can match shapes and the server keeps track of the game's current state. The interface updates in real-time, displaying the current score and a list of scores of all the games played.

- **Data Management**: Players submit their name in the form section that gets processed on the server and reflected after the user finished the game.

- **Data Management 2**: The game stores name, score, and time.

- **CSS Design with Flexbox**: Used Flexbox for positioning buttons, shapes and sillohuettes, ensuring responsive design. Animations such as button hover effects and error message transitions improve user interaction.

- **Dynamic Difficulty**: The game shuffles the shapes after each correct match to maintain challenge and unpredictability. The algorithm used to shuffle the shapes was from Fisher Yate's Algorithm.

- **Enabling Deletion Data**: The game offers the users to reset the scores with a button and the result displayed immediately, this sends a request to the server side which empties the array which is how the list of scores are being stored.

### Design/Evaluation Achievements
- **Visual Design**: All shapes and sillohuettes are designed using CSS, including properties like border-radius, background-colour, and width/height to create different shapes. The website also utilizes "Comfortaa" cursive font.

- **User Feedback**: 
- Kalavantis: The score was improperly displaying time which was not effective. I would definitely use a better approach to accurately display the play duration time.

## [Kay Siegall](https://a2-ksiegall.glitch.me/)
My website is a simple implementation of the Snake Game, where you control a line of green pixels (the snake) travelling to collect red pixels (the apples, since as we all know, snakes love apples). Once you die, the website prompts you to sumbit your score, which then gets added to the leaderboard. I spent a little too long coding this snake game lmao

## Technical Achievements
- **Snake Gameplay**: Using html/css/js, I created a working version of the Snake game, which allows you to play with both on-screen buttons and keyboard arrows.
- **POST Request Communication**: Using JavaScript's built in functionality, submitting a score sends a POST request back to the server with your name and score.
- **Serverside Data Handling**: When the server receives the score message, it saves the time, which is then sent back to the client for displaying. The data is stored as an array of dictionary entries, which allows for a very simple response procedure when asked for the data.
- **Personal High Score Updating**: If, after submitting a score, you get a new high score, you can modify your previous best by simply resubmitting with your new score!
- **Leaderboard Data Point Deletion**: There is a static form on the webpage for deleting score elements, separate from the score submission
- **HTML Tables**: Used html's <table> tag to allow for a modular table that can be managed by js.
- **setInterval**: Used js's setinterval method to continually call my gameTick function at regular intervals for processing the game

### Design/Evaluation Achievements
- **Flex-grid for large item positioning**: My website uses a html grid to position the game board next to the text + leaderboards.
- **Flex-div for game button positions+sizes**: Self explanatory, use a flex div to evenly space the four game buttons
- **Grid for gameplay+positioning**: The implementation of the Snake game makes heavy use of various CSS elements, including media screens and grids that we can edit by pixel.
- **Score submission form hover effects**: Self explanatory
- **Score Submission form visibility**: The score submission form does not appear until after the game has been completed. It disappears once the score has been submitted.


### Feedback

**Riley**:
- Pointed out bug where game speed tends to be variable, seemingly random when reloading webpage
    - (The first time they loaded the game, the snake went very fast and was hard to control)
- Pointed out that game resets on score submission, 
- No other major issues with structure, the rest of the website was used as intended.

**Welcher**:
- Pointed out that the score submission always appears in the bottom right, regardless of the size of the window, which *feels* incorrect.
- Pointed out that the cancel button for score submission doesn't always close the popup, thus not resetting the game.
- No other major issues with structure, website used as intended.

**Changes I would make**:
- I would fix the game speed bug if i had time / knew why it happened
- Make score submission popup appear in the center of the screen or overlapping the game panel.
- I would fix the cancel button as well
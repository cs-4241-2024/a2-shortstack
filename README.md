# Highscore Racer

To illustrate server data storage, I created a simple racing game. Instructions to play the game are on the page, so I won't repeat them here. Some important points:

The CSS technique I used is a flexbox, the HTMLCanvas displaying the race track and the right side of the screen are both in a flex row.

The derived field calculated by the server is the total time. The client only passes the three lap times, the server adds them together.

I chose to use the google font Roboto, which can be seen in my style.css file.

Glitch Link: https://a2-eddie048.glitch.me/

## Technical Achievements

### Single Page App

The entire application is one page. On the left is the racing game, and on the right, all previous highscores. (And options to modify and delete them).

### Modifying Existing Data

I couldn't think of a normal way to modify high scores for a racing game, so I opted for a silly function. If you press the 'shuffle' button next to any row, it randomly shuffles the lap times (while keeping the total time the same) using a POST request.

## Design/Evaluation Achievements

### User Testing

1. Conducted with a student with the last name of Iyer
2. Some aspects of the UI were not clear. It was not clear where the checkpoint was or the current lap.
3. I was surprised that the user was expecting a confirmation or a success message after a deletion or modification of the data.
4. Based on feedback, I would add a checkpoint icon, a lap counter, a finish line, and alert / confirmation dialogue.

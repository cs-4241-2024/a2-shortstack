// FRONT-END (CLIENT) JAVASCRIPT HERE

(function () {
  let selected;
  let score = 0;
  const dropZones = document.querySelectorAll(".drop");
  const startGameBtn = document.querySelector(".play-btn");
  const endGamebtn = document.querySelector(".end-btn");
  const errorMsg = document.querySelector("#error");
  const scoreDisplay = document.querySelector("#score");
  const submitname = document.querySelector("#submitname");

  const startGame = () => {
    window.location.reload();
  };

  const endGame = () => {
    errorMsg.style.display = "none";
    startGameBtn.style.display = "inline";
    addScore();
    document.querySelector(".drag-section").style.border = "none";
    endGamebtn.style.display = "none";
  };

  const addScore = () => {
    let num = score;
    document.querySelector('#score').innerText = score; // Update the score display

    let name = document.querySelector("#name").value;

    fetch('/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score: num, name: name })
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    showScore();
  };

  const shuffle = () => {
    // Shuffles the holes
    $(".drop-section").each(function () {
      var divs = $(this).find('div');
      for (var i = 0; i < divs.length; i++) $(divs[i]).remove();
      //the fisher yates algorithm, from http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
      var i = divs.length;
      if (i == 0) return false;
      while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = divs[i];
        var tempj = divs[j];
        divs[i] = tempj;
        divs[j] = tempi;
      }
      for (var i = 0; i < divs.length; i++) $(divs[i]).appendTo(this);
    });
  };

  const handleSubmitName = (e) => {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    fetch('/save-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    }).then(response => response.json())
      .then(data => {
        console.log('Successfully saved name:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  document.querySelector("#form").addEventListener("submit", handleSubmitName);

  const handleDrop = (e) => {
    if (document.querySelector(".drag-section").childElementCount === 1) {
      // Calls end condition if all the shapes are matched 
      endGame();
    }
    if (e.target.classList.contains(selected.className)) {
      // Handles the correct dropped shape: Increment score
      errorMsg.style.opacity = 0; // Hides the error message
      e.target.classList.remove("drop"); // Removes the drop class
      selected.remove(); // Removes the selected shape
      score++;
      document.querySelector('#score').innerText = score; // Updates the score
      return;
    } else if (score === 0) {
      // Condition to not get a negative score
      errorMsg.style.opacity = 100; // Shows the error message
      return;
    }
    // Handles the wrong dropped shape: Decrement score
    errorMsg.style.opacity = 100;
    score--;
    document.querySelector('#score').innerText = score;
  };

  const handleDragStart = (e) => {
    selected = e.target;
    e.target.style.opacity = 0.5;
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = 1;
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const showScore = () => {
    fetch('/scores')
      .then(response => response.json())
      .then(data => {
        // Clear the list before adding new scores
        const ul = document.querySelector("ul");
        ul.innerHTML = "";
        console.log('Success:', data);
        const scores = data.scores;
        scores.forEach((entry, index) => {
          $(".List").append('<li>' + "[Game " + index + "] : " + entry.name + " - " + entry.score + '</li>');
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  document.addEventListener('dragstart', (e) => handleDragStart(e));
  document.addEventListener('dragend', (e) => handleDragEnd(e));
  dropZones.forEach((zone) => {
    zone.addEventListener('drop', (e) => handleDrop(e));
    zone.addEventListener("dragover", (e) => allowDrop(e));
  });


  startGameBtn.style.display = "none";
  errorMsg.style.opacity = 0;
  scoreDisplay.innerText = score;

  // Initialize the game
  $(".play-btn").click(startGame);
  $(".end-btn").click(endGame);

  $("#reset").click(() => {
    //  Clears scoreboard
    console.log("Reset Score");
    fetch('/reset-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  $(document).ready(function (e) {
    shuffle();
    showScore();
  });

})();
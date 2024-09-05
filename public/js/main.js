// FRONT-END (CLIENT) JAVASCRIPT HERE

(function () {
  let selected;
  let score = 0;
  let isGameStarted = false;
  const dropZones = document.querySelectorAll(".drop");
  const startGameBtn = document.querySelector(".play-btn");
  const endGamebtn = document.querySelector(".end-btn");
  const errorMsg = document.querySelector("#error");
  const scoreDisplay = document.querySelector("#score");
  const nameInput = document.querySelector("#name");

  const disableDragAndDrop = () => {
    document.querySelectorAll('.drag-section div').forEach((item) => {
      item.setAttribute('draggable', false);
    });
  };

  const enableDragAndDrop = () => {
    document.querySelectorAll('.drag-section div').forEach((item) => {
      item.setAttribute('draggable', true);
    });
  };

  const startGame = () => {
    window.location.reload();
    isGameStarted = true;
    enableDragAndDrop();
    // window.location.reload();
  };

  const checkIfNameExists = () => {
    const playerName = nameInput.value.trim();

    if (!playerName) {
      errorMsg.style.display = "inline";
      errorMsg.style.opacity = 100;
      errorMsg.innerText = "Please enter your name";
      return;
    }
    errorMsg.style.display = "none";
  }

  const handleNameInput = (e) => {
    const playerName = nameInput.value.trim();

    if (playerName && !isGameStarted) {
      isGameStarted = true;
      enableDragAndDrop();
      errorMsg.style.display = "none";
    } else if (!playerName) {
      isGameStarted = false;
      disableDragAndDrop();
      errorMsg.style.opacity = 100;
      errorMsg.innerText = "Please enter your name to play";
    }
  }

  const endGame = () => {
    errorMsg.style.display = "none";
    startGameBtn.style.display = "inline";
    addScore();
    endGamebtn.style.display = "none";
    isGameStarted = false;
    disableDragAndDrop();
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
    if (!isGameStarted) {
      return;
    }

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
      errorMsg.innerText = "Wrong shape!";
      errorMsg.style.opacity = 100; // Shows the error message
      return;
    }
    // Handles the wrong dropped shape: Decrement score
    errorMsg.style.opacity = 100;
    errorMsg.style.display = "inline";
    errorMsg.innerText = "Wrong shape!";
    score--;
    document.querySelector('#score').innerText = score;
  };

  const handleDragStart = (e) => {
    if (!isGameStarted) {
      return;
    }
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
  disableDragAndDrop();
  nameInput.addEventListener("input", handleNameInput);
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
    checkIfNameExists();
  });

})();
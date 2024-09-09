// FRONT-END (CLIENT) JAVASCRIPT HERE

const clickBtn = document.querySelector(".click-area");
const displayText = document.querySelector(".display-text");
const showTime = document.getElementById("show-time");
const highscoreTable = document.getElementById("highscore");

let waiting = false; //Waiting for user click
let time = 0;
let timeStart;

function play() {
  const randomTime = Math.floor(Math.random() * (8000 - 2000)) + 1000;
  console.log(randomTime); //debugging
  clickBtn.style.backgroundColor = ""; //button color is null, so it goes back to its original red color
  displayText.textContent = ""; //no text when playing

  setTimeout(() => {
    timeStart = Date.now();
    clickBtn.style.backgroundColor = "green";
    waiting = true;
  }, randomTime); //Button turns green after the random amount of time.
}

clickBtn.addEventListener("click", () => {
  if (waiting) { //if the button is clicked and waiting is true, then display the text and prompt the user to input their name
    const timer = Date.now() - timeStart;
    waiting = false;
    displayText.textContent = `Your time was ${timer} ms. Click to play again!`;

    setTimeout(() => {
      const name = window.prompt("Enter your name to submit your score!");
      if (name) {
        updateHighscores(name, timer);
      }
    }, 500);
  } else {
    play();
  }
});

function updateHighscores(name, time) {
  const newRow = document.createElement("tr");
  const newCell = document.createElement("td");
  const newTimeCell = document.createElement("td");

  newCell.textContent = name;
  newTimeCell.textContent = time + "ms";

  newRow.appendChild(newCell);
  newRow.appendChild(newTimeCell);
  highscoreTable.appendChild(newRow);

  fetch("/submit", { //Submit the scores to the server so that they are kept on reload
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, time: time }),
  })
    .then((response) => response.text())
    .then((text) => console.log("Server response:", text));
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("/highscores")
    .then((response) => response.json())
    .then((highscores) => {
      highscoreTable.innerHTML = "";
      highscores.forEach((score) => {
        updateHighscores(score.name, score.time);
      });
    });
});

const submitFunc = async function (event) {
  event.preventDefault();

  const input = document.querySelector("#yourname");
  const timer = document.querySelector("button").getAttribute("data-time");

  const json = { yourname: input.value, time: timer };
  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const text = await response.text();
  console.log("text:", text);
};


const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}

// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const input = document.querySelector("#yourname"),
    json = { yourname: input.value },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const text = await response.text();

  console.log("text:", text);
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};

// Set up race track
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const size = window.innerHeight;
canvas.width = size;
canvas.height = size;

ctx.fillStyle = "#2ab50b";
ctx.fillRect(0, 0, size, size);

const racetrack = document.getElementById("racetrack");
ctx.drawImage(racetrack, 0, 0, 800, 800);

// Draw racecar
const racecar = document.getElementById("racecar");
ctx.drawImage(racecar, 260, 45, 100, 50);

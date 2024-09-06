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
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const size = window.innerHeight;
canvas.width = size;
canvas.height = size;

ctx.fillStyle = "#2ab50b";
ctx.fillRect(0, 0, size, size);

const racetrack = document.getElementById("racetrack");
ctx.drawImage(racetrack, 0, 0, size, size);

// Store racecar values
let velocity = 0,
  x = size / 3,
  y = size / 18,
  direction = 0;
const carWidth = size / 8;
const carLenght = size / 16;

// Draw racecar
const racecar = document.getElementById("racecar");
ctx.drawImage(racecar, x, y, size / 8, size / 16);

// Draw timer
ctx.fillStyle = "Black";
ctx.font = "25px serif";
ctx.fillText("0.0", 10, 30);

// Draw status text
let statusText =
  "Use WASD or arrow keys to reach the checkpoint at the bottom of the map.";
ctx.fillText(statusText, 10, size - 10);

// Store inputs
let forward = false,
  backward = false,
  right = false,
  left = false;

// Timer
let startTime = 0;
let prevLap = 0;

// Add input listeners
document.addEventListener("keydown", (e) => {
  // Check if race is not started, if not, start race
  if (startTime == 0) {
    startTime = Date.now();
    prevLap = startTime;
    requestAnimationFrame(run);
  }

  switch (e.key) {
    case "ArrowUp":
    case "w":
      forward = true;
      break;
    case "ArrowDown":
    case "s":
      backward = true;
      break;
    case "ArrowRight":
    case "d":
      right = true;
      break;
    case "ArrowLeft":
    case "a":
      left = true;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      forward = false;
      break;
    case "ArrowDown":
    case "s":
      backward = false;
      break;
    case "ArrowRight":
    case "d":
      right = false;
      break;
    case "ArrowLeft":
    case "a":
      left = false;
      break;
  }
});

// Lap controls
const lapTimes = [];
let checkpoint = false;

// Game running function
const run = () => {
  // Check for crossing checkpoint and lap
  if (!checkpoint && y > (size * 3) / 4) {
    statusText = "Checkpoint reached!";
    checkpoint = true;
  } else if (checkpoint && y < size / 8 && x > size / 3) {
    checkpoint = false;
    const lapTime = Date.now();
    lapTimes.push(lapTime - prevLap);
    statusText =
      "Lap " + lapTimes.length + " time: " + (lapTime - prevLap) / 1000;
    prevLap = lapTime;
  }

  if (right && !left) {
    direction += 0.02;
  } else if (left && !right) {
    direction -= 0.02;
  }

  if (forward && !backward) {
    velocity += 0.04;
  } else if (backward && !forward) {
    velocity -= 0.04;
  }

  x += velocity * Math.cos(direction);
  y += velocity * Math.sin(direction);

  // Draw grass
  ctx.fillStyle = "#2ab50b";
  ctx.fillRect(0, 0, size, size);

  // Draw track
  ctx.drawImage(racetrack, 0, 0, size, size);

  // Check for car being on grass, if so slow down
  const data = ctx.getImageData(x + carWidth / 2, y + carLenght / 2, 1, 1).data;
  if (data[0] == 42) {
    if (velocity > 1) {
      velocity -= 0.5;
    } else if (velocity < -1) {
      velocity += 0.5;
    }
  }

  // Draw car
  ctx.translate(x + carWidth / 2, y + carLenght / 2);
  ctx.rotate(direction);
  ctx.drawImage(racecar, -carWidth / 2, -carLenght / 2, carWidth, carLenght);
  ctx.resetTransform();

  // Draw timer
  ctx.fillStyle = "Black";
  let time = Math.floor((Date.now() - startTime) / 100) / 10;
  ctx.fillText(time + (time % 1 == 0 ? ".0" : ""), 10, 30);

  // Draw status text
  ctx.fillText(statusText, 10, size - 10);

  if (lapTimes.length < 3) requestAnimationFrame(run);
};

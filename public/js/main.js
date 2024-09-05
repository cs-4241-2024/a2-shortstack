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
ctx.font = "30px serif";
ctx.fillText("0.00", 10, 30);

// Store inputs
let forward = false,
  backward = false,
  right = false,
  left = false;

// Add input listeners
document.addEventListener("keydown", (e) => {
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

// Timer
let startTime = Date.now();

// Game running function
const run = () => {
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
      velocity -= 0.8;
    } else if (velocity < -1) {
      velocity += 0.8;
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

  requestAnimationFrame(run);
};

// Start race
requestAnimationFrame(run);

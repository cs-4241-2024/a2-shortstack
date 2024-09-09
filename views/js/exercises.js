const form = document.querySelector("#new-exercise-form");
form.addEventListener("submit", submitNewExercise);

function submitNewExercise(event) {
  const url = "/new_exercise";
  const request = new XMLHttpRequest();
  request.open("POST", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      form.reset();
      seamlessReload();
    } else {
      console.error("Request failed with status:", request.status);
    }
  };

  request.onerror = function () {
    console.error("Request failed");
  };

  request.send(new FormData(event.target));
  event.preventDefault();
}

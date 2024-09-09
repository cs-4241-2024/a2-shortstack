// Add Exercise
async function addExercise(event) {
  await saveWorkout(null);
  const url = window.location.pathname + "/add_exercise";
  const request = new XMLHttpRequest();
  request.open("POST", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      seamlessReload();
    } else {
      console.error("Request failed with status:", request.status);
    }
  };

  request.onerror = function () {
    console.error("Request failed");
  };

  request.send();
  event.preventDefault();
}

// Remove Exercise
async function removeExercise(event, index) {
  await saveWorkout(null);
  const url = window.location.pathname + "/remove_exercise/" + index;
  const request = new XMLHttpRequest();
  request.open("POST", url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      seamlessReload();
    } else {
      console.error("Request failed with status:", request.status);
    }
  };

  request.onerror = function () {
    console.error("Request failed");
  };

  request.send();
  event.preventDefault();
}

// Save
const form = document.querySelector("#workout-form");
form.addEventListener("submit", saveWorkout);

function saveWorkout(event) {
  if (event) event.preventDefault();

  const url = window.location.pathname + "/save";
  const formData = new FormData(form);

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", url, true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        if (event) {
          form.reset();
          seamlessReload();
        }
        resolve(request.response);
      } else {
        console.error("Request failed with status:", request.status);
        reject(new Error(`Request failed with status: ${request.status}`));
      }
    };

    request.onerror = function () {
      console.error("Request failed");
      reject(new Error("Request failed"));
    };

    request.send(formData);
  });
}

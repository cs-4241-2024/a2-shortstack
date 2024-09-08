// FRONT-END (CLIENT) JAVASCRIPT HERE

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#taskForm"); // Ensure form selector is correct
  const taskInput = document.getElementById("task");
  const descriptionInput = document.getElementById("description");
  const dateInput = document.getElementById("date");
  const priorityInput = document.getElementById("priority");
  const inProgressTable = document.querySelector("#inProgressTable");
  const completedTable = document.querySelector("#completedTable");

  function renderTasks() {
    inProgressTable.innerHTML = "";
    completedTable.innerHTML = "";

    tasks.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.description}</td>
        <td>${task.date}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td><button onclick="deleteTask(${index})">Delete</button></td>
      `;
      if (task.status === "In Progress") {
        inProgressTable.appendChild(row);
      } else {
        completedTable.appendChild(row);
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Collect form data
    const task = taskInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;

    // Send data to the server
    fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, description, date, priority }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Notify user
        renderTasks(data.tasks); // Update the table
      })
      .catch((error) => console.error("Error:", error));
  });

  // Fetch tasks on page load
  fetch("/tasks")
    .then((response) => response.json())
    .then((data) => {
      renderTasks(data);
    });
});

// const submit = async function (event) {
//   // stop form submission from trying to load
//   // a new .html page for displaying results...
//   // this was the original browser behavior and still
//   // remains to this day
//   event.preventDefault();

//   // get the value of the input field
//   const task = document.getElementById("task").value;
//   const description = document.getElementById("description").value;
//   const date = document.getElementById("date").value;
//   const priority = document.getElementById("priority").value;

//   const input = document.querySelector("#yourname"),
//     json = { yourname: input.value },
//     body = JSON.stringify(json);

//   const response = await fetch("/submit", {
//     method: "POST",
//     body,
//   });

//   const text = await response.json();

//   console.log("text:", text);

//   data.map((item) => item.model).forEach(console.log);
// };

// window.onload = function () {
//   const button = document.querySelector("button");
//   button.onclick = submit;
// };

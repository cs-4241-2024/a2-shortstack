document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#taskForm");
  const inProgressTable = document.querySelector("#inProgressTable tbody");
  const completedTable = document.querySelector("#completedTable tbody");

  let editingTaskIndex = null;
  let tasks = []; // Store tasks

  // Function to calculate days left from the current date to the due date
  function calculateDaysLeft(dueDate) {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDifference = dueDateObj - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysLeft;
  }

  // Function to render tasks in the table
  function renderTasks(taskList) {
    tasks = taskList; // Update the local tasks array
    console.log("Rendering tasks:", tasks);

    inProgressTable.innerHTML = ""; // Clear previous data
    completedTable.innerHTML = ""; // Clear previous data

    tasks.forEach((task, index) => {
      const daysLeft = calculateDaysLeft(task.dueDate);
      console.log(`Task: ${task.task}, Days Left: ${daysLeft}`);
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.description}</td>
        <td>${task.creationDate}</td>
        <td>${task.dueDate}</td>
        <td>${daysLeft >= 0 ? daysLeft : "Past Due"}</td>
        <td>${task.priority}</td>
        <td>${task.status}</td>
        <td>
          ${
            task.status === "In Progress"
              ? `<button class="edit-btn" onclick="editTask(${index})">Edit</button>
               <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
               <button class="complete-btn" onclick="completeTask(${index})">Complete</button>`
              : `<button class="in-progress-btn" onclick="markInProgress(${index})">In Progress</button>
               <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>`
          }
        </td>
      `;

      // Apply red background if days left <= 1
      if (daysLeft <= 1 && task.status === "In Progress") {
        console.log(`Applying pastel red to task: ${task.task}`);
        row.classList.add("pastel-red");
      }

      if (task.status === "In Progress") {
        inProgressTable.appendChild(row);
      } else {
        completedTable.appendChild(row);
      }
    });
  }

  // Function to handle deleting a task
  window.deleteTask = (index) => {
    fetch(`/delete/${index}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        renderTasks(data.tasks); // Update the table with the new tasks after deletion
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle completing a task
  window.completeTask = (index) => {
    fetch(`/complete/${index}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        renderTasks(data.tasks); // Update the table with the new tasks after completion
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle marking a completed task back as "In Progress"
  window.markInProgress = (index) => {
    fetch(`/in-progress/${index}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => {
        renderTasks(data.tasks); // Update the table with the new tasks after marking in progress
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle editing a task
  window.editTask = (index) => {
    const taskToEdit = tasks[index];
    document.getElementById("task").value = taskToEdit.task;
    document.getElementById("description").value = taskToEdit.description;
    document.getElementById("date").value = taskToEdit.dueDate;
    document.getElementById("priority").value = taskToEdit.priority;

    editingTaskIndex = index;
    form.querySelector('button[type="submit"]').textContent = "Update Task";
  };

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = document.getElementById("task").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    if (editingTaskIndex !== null) {
      // Update existing task
      fetch(`/edit/${editingTaskIndex}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, description, dueDate, priority }),
      })
        .then((response) => response.json())
        .then((data) => {
          renderTasks(data.tasks);
          editingTaskIndex = null;
          form.querySelector('button[type="submit"]').textContent = "Submit";
          form.reset();
        })
        .catch((error) => console.error("Error:", error));
    } else {
      // Add new task
      fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, description, dueDate, priority }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          renderTasks(data.tasks);
          form.reset();
        })
        .catch((error) => console.error("Error:", error));
    }
  });

  // Fetch tasks on page load
  fetch("/tasks")
    .then((response) => response.json())
    .then((data) => {
      renderTasks(data);
    })
    .catch((error) => console.error("Error:", error));
});

// Function to handle form submission and add a new task
const submit = async function(event) {
  event.preventDefault();

  // Get task input and priority selection
  const taskInput = document.querySelector('#task').value;
  const priorityInput = document.querySelector('#priority').value;
  const taskData = {
    task: taskInput,
    priority: priorityInput
  };

  // Send the task data to the server
  await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });

  // Reload the tasks to reflect the new addition
  loadTasks();
};

// Function to load tasks from the server and display them in the table
const loadTasks = async function() {
  const response = await fetch('/tasks');
  const tasks = await response.json();

  const tableBody = document.querySelector('#taskTable tbody');
  tableBody.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="text" value="${task.task}" id="task-${index}" readonly></td>
      <td>
        <select id="priority-${index}" disabled>
          <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
          <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
        </select>
      </td>
      <td>${task.creation_date}</td>
      <td>${task.deadline}</td>
      <td>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="saveTask(${index})" style="display:none;">Save</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

// Function to edit a task
const editTask = function(index) {
  // Enable editing of task fields
  document.querySelector(`#task-${index}`).removeAttribute('readonly');
  document.querySelector(`#priority-${index}`).removeAttribute('disabled');

  // Show the Save button and hide the Edit button
  document.querySelector(`button[onclick="editTask(${index})"]`).style.display = 'none';
  document.querySelector(`button[onclick="saveTask(${index})"]`).style.display = 'inline-block';
};

// Function to save the edited task
const saveTask = async function(index) {
  const taskInput = document.querySelector(`#task-${index}`).value;
  const priorityInput = document.querySelector(`#priority-${index}`).value;

  const taskData = {
    index,
    task: taskInput,
    priority: priorityInput
  };

  // Send the updated task data to the server
  await fetch('/edit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });

  // Reload tasks to reflect the changes
  loadTasks();
};

// Function to delete a task
const deleteTask = async function(index) {
  await fetch('/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index })
  });

  loadTasks();
};

// Load tasks on page load and set up form submission handler
window.onload = function() {
  const form = document.querySelector('#taskForm');
  form.onsubmit = submit;
  loadTasks();
};

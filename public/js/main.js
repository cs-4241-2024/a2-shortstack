// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  event.preventDefault();

  const descriptionInput = document.querySelector('#description'),
        priorityInput = document.querySelector('#priority'),
        dueDateInput = document.querySelector('#dueDate');

  const task = {
    description: descriptionInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value
  };

  const response = await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });


  if (response.ok) {
    await loadTasks(); 
    document.querySelector('#taskForm').reset();  
  } else {
    console.error('Failed to add task');
  }
};


const loadTasks = async function() {
  try {
    const response = await fetch('/tasks');  
    if (response.ok) {
      const tasks = await response.json();  

      const taskTableBody = document.querySelector('#taskTable tbody');
      taskTableBody.innerHTML = '';  


      tasks.forEach(task => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td><input type="text" value="${task.description}" disabled></td>
          <td>
            <select disabled>
              <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
              <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
              <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>
          </td>
          <td><input type="date" value="${task.dueDate}" disabled></td>
          <td>${task.urgency !== undefined ? task.urgency : 'N/A'}</td>
          <td>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button class="edit-btn">Edit</button>
            <button class="save-btn" style="display: none;">Save</button>
          </td>
        `;


        row.querySelector(".edit-btn").addEventListener("click", function() {

          row.querySelectorAll("input, select").forEach(input => input.disabled = false);

          row.querySelector(".edit-btn").style.display = "none";
          row.querySelector(".save-btn").style.display = "inline";
        });


        row.querySelector(".save-btn").addEventListener("click", function() {

          const updatedTask = {
            id: task.id,
            description: row.querySelector("input[type='text']").value,
            priority: row.querySelector("select").value,
            dueDate: row.querySelector("input[type='date']").value
          };


          updateTask(updatedTask);

          row.querySelectorAll("input, select").forEach(input => input.disabled = true);

          row.querySelector(".save-btn").style.display = "none";
          row.querySelector(".edit-btn").style.display = "inline";
        });

        taskTableBody.appendChild(row);
      });
    } else {
      console.error('Failed to fetch tasks');
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
};

const updateTask = async function(task) {
  try {
    const response = await fetch(`/tasks/${task.id}`, {  
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    if (response.ok) {
      const updatedTask = await response.json();
      loadTasks();  
    } else {
      console.error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};


const deleteTask = async function(taskId) {
  try {
    const response = await fetch(`/tasks/${taskId}`, { method: 'DELETE' });

    if (response.ok) {
      const data = await response.json();  
      loadTasks();  
    } else {
      console.error('Failed to delete task.');
    }
  } catch (error) {
    console.error('Error in DELETE request:', error);
  }
};


window.onload = function() {
  loadTasks();  
  const form = document.querySelector('#taskForm');
  form.onsubmit = submit;
};

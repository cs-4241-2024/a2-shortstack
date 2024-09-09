document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoTableBody = document.getElementById('todo-table-body');

    // Function to fetch and display all todos
    const fetchTodos = () => {
        fetch('/todos')
            .then(response => response.json())
            .then(data => {
                renderTodos(data);
            })
            .catch(err => console.error('Error fetching todos:', err));
    };

    // Handle form submission and adding a new task
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = document.getElementById('task').value;
        const priority = document.getElementById('priority').value;
        const deadline = document.getElementById('deadline').value;

        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task, priority, deadline }),
        })
        .then(response => response.json())
        .then(data => {
            form.reset();
            renderTodos(data); // Refresh the todo list with the updated data
        })
        .catch(err => console.error('Error adding task:', err));
    });

    // Delete a task and refresh the UI
    window.deleteTask = (id) => {
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (!confirmed) return;

        fetch(`/delete/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            renderTodos(data); // Refresh the todo list after deletion
        })
        .catch(err => console.error('Error deleting task:', err));
    };

    // Edit a task
    window.editTask = (id) => {
        const task = prompt('Enter new task:');
        const priority = prompt('Enter new priority (1-5):');
        const deadline = prompt('Enter new deadline (yyyy-mm-dd):');

        fetch(`/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task, priority, deadline }),
        })
        .then(response => response.json())
        .then(data => {
            renderTodos(data); // Refresh the todo list after editing
        })
        .catch(err => console.error('Error editing task:', err));
    };

    // Function to render the list of todos in table format
    const renderTodos = (todos) => {
        todoTableBody.innerHTML = ''; // Clear the table body
        todos.forEach(todo => {
            const tr = document.createElement('tr');

            // Create table cells for task, priority, deadline, and actions
            tr.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.priority}</td>
                <td>${todo.deadline}</td>
                <td>
                    <button onclick="deleteTask('${todo.id}')">Delete</button>
                    <button onclick="editTask('${todo.id}')">Edit</button>
                </td>
            `;

            // Add initial fade-in class
            tr.classList.add('fade-in');

            // Set a timeout to add the 'show' class after the row is inserted into the DOM
            setTimeout(() => {
                tr.classList.add('show');
            }, 100);

            // Add class based on priority for color
            tr.classList.add(`priority-${todo.priority}`);

            // Check if the deadline is within a week and make text bold
            if (isDeadlineSoon(todo.deadline)) {
                tr.classList.add('deadline-soon');
            }

            todoTableBody.appendChild(tr);
        });
    };

    // Function to check if a deadline is within the next 7 days
    const isDeadlineSoon = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate - today;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convert to days

        return daysDiff <= 7;
    };

    // Fetch all todos on initial load
    fetchTodos();
});

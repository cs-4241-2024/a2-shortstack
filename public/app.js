document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskTableBody = document.querySelector('#task-table tbody');

    function fetchTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(data => {
                taskTableBody.innerHTML = '';
                data.forEach(task => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${task.task}</td>
                        <td>${task.priority}</td>
                        <td>${task.creation_date}</td>
                        <td>${task.deadline}</td>
                        <td>
                            <button onclick="deleteTask(${task.id})">Delete</button>
                            <button onclick="editTask(${task.id})">Edit</button>
                        </td>
                    `;
                    taskTableBody.appendChild(row);
                });
            });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            task: formData.get('task'),
            priority: formData.get('priority'),
            creation_date: formData.get('creation_date')
        };

        fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(() => fetchTasks());
    });

    window.deleteTask = (id) => {
        fetch(`/tasks/${id}`, { method: 'DELETE' })
            .then(() => fetchTasks());
    };

    window.editTask = (id) => {
        fetch(`/tasks/${id}`)
            .then(response => response.json())
            .then(task => {
                const newTask = prompt('Enter new task details (format: task,priority,creation_date)', `${task.task},${task.priority},${task.creation_date}`);
                if (newTask) {
                    const [taskText, priority, creationDate] = newTask.split(',');
                    fetch(`/tasks/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ task: taskText, priority, creation_date: creationDate })
                    })
                    .then(() => fetchTasks());
                }
            });
    };

    fetchTasks();
});

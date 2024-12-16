  console.log("here");

document.addEventListener('DOMContentLoaded', () => {
  fetch('/results')
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';
      data.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${task.id}</td>
          <td>${task.task}</td>
          <td>${task.priority}</td>
          <td>${task.creation_date}</td>
          <td>${task.deadline}</td>
          <td>
            <form action="/delete" method="POST">
              <input type="hidden" name="id" value="${task.id}">
              <button type="submit">Complete</button>
            </form>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
});

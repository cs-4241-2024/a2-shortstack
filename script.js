document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('assignment-form');
    const tableBody = document.querySelector('#assignment-table tbody');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const formData = new FormData(form);
        const data = {
            class: formData.get('class'),
            assignment: formData.get('assignment'),
            'due-date': formData.get('due-date'),
            'start-date': formData.get('start-date'),
        };

        try {
            // Send the assignment data to the server
            const response = await fetch('/assignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to add assignment');
            }

            // Clear the form fields
            form.reset();

            // Refresh the assignments list
            refreshAssignments();
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
    });

    async function refreshAssignments() {
        try {
            const response = await fetch('/assignments');
            if (!response.ok) {
                throw new Error('Failed to fetch assignments');
            }

            const assignments = await response.json();
            console.log('Assignments fetched:', assignments); // Debug log

            tableBody.innerHTML = ''; // Clear the existing list

            assignments.forEach(assignment => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${assignment.class}</td>
                    <td>${assignment.name}</td>
                    <td>${assignment.dueDate}</td>
                    <td>${assignment.startDate}</td>
                    <td><button data-id="${assignment.id}">Delete</button></td>
                `;

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    }

   
    refreshAssignments();
});

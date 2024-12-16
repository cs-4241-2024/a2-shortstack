document.getElementById('nameForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nameInput = document.getElementById('nameInput').value;

  // Send the name to the server
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: nameInput }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fetchNames();
    })
    .catch(error => console.error('Error:', error));

  // Clear the input field after submitting
  document.getElementById('nameInput').value = '';
});

function fetchNames() {
  // Fetch the list of names and lengths from the server
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      const nameList = document.getElementById('nameList');

      nameList.innerHTML = ''; // Clear the list before appending new names

      // Loop through each object in the data array (name and length)
      data.forEach((item, index) => {
        const li = document.createElement('li');

        // Set the text content to display the name and its length
        li.textContent = `${item.name} (Length: ${item.length})`;

        // Create a container for the buttons
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        // Create a delete button for each name
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.setAttribute('data-id', index); 
        deleteButton.addEventListener('click', function () {
          deleteName(index);
        });
        
        const checkInButton = document.createElement('button');
        checkInButton.textContent = 'Check-In';
        checkInButton.classList.add('check-btn');

        // Create an edit button for each name
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');

        // Append the edit and delete buttons to the button group container
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(checkInButton);
        buttonGroup.appendChild(deleteButton);
        

        // Append the button group to the list item
        li.appendChild(buttonGroup);
        nameList.appendChild(li);
      });
    })
    .catch(error => console.error('Error:', error));
}


function deleteName(index) {
  fetch(`/names/${index}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log('Deleted:', data);
      fetchNames();
    })
    .catch(error => console.error('Error:', error));
}

// Fetch names on page load
fetchNames();

// Function to fetch and display the existing data on page load
const loadData = async function () {
  const response = await fetch('/data');
  if (response.ok) {
    const data = await response.json();

    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = ''; // Clear the table before populating

    data.forEach((entry, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td><input type="text" value="${entry.employeeid}" disabled /></td>
        <td><input type="text" value="${entry.name}" disabled /></td>
        <td><input type="text" value="${entry.salary}" disabled /></td>
        <td><input type="text" value="${entry.regdate}" disabled /></td>
        <td>${entry.expdate}</td>
        <td>
          <button class="editBtn">Edit</button>
          <button class="deleteBtn">Delete</button>
        </td>
      `;
      newRow.querySelector('.editBtn').onclick = () => toggleEdit(newRow, index);
      newRow.querySelector('.deleteBtn').onclick = () => deleteRow(index);
      tableBody.appendChild(newRow);
    });
  } else {
    console.error('Failed to load data');
  }
};

// Function to toggle between edit and save for a row
const toggleEdit = function (row, index) {
  const inputs = row.querySelectorAll('input');
  const editBtn = row.querySelector('.editBtn');

  if (editBtn.textContent === 'Edit') {
    // Enable editing
    inputs.forEach(input => input.disabled = false);
    editBtn.textContent = 'Save';
  } else {
    // Save changes
    const updatedData = {
      employeeid: inputs[0].value,
      name: inputs[1].value,
      salary: inputs[2].value,
      regdate: inputs[3].value
    };

    // Send the updated data to the server
    fetch(`/edit/${index}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    }).then(response => {
      if (response.ok) {
        loadData(); // Reload data after saving
      } else {
        console.error('Failed to save changes');
      }
    });
  }
};

// Function to delete a row
const deleteRow = function (index) {
  fetch(`/delete/${index}`, {
    method: 'DELETE'
  }).then(response => {
    if (response.ok) {
      loadData(); // Reload data after deleting
    } else {
      console.error('Failed to delete row');
    }
  });
};

// Function to handle form submission and append data to the table
const submit = async function (event) {
  event.preventDefault();

  const employeeID = document.querySelector('#employeeid').value;
  const yourName = document.querySelector('#yourname').value;
  const salary = document.querySelector('#salary').value;
  const regDate = document.querySelector('#regdate').value;

  const data = {
    employeeid: employeeID,
    yourname: yourName,
    salary: salary,
    regdate: regDate
  };

  const response = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    await loadData();
    document.querySelector('#employeeForm').reset();
  } else {
    console.error('Failed to submit data');
  }
};

// Set up the event listener for form submission and load data on page load
window.onload = function () {
  const form = document.querySelector('#employeeForm');
  form.onsubmit = submit;

  // Load data from the server when the page is loaded
  loadData();
};

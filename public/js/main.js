// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  // const input = document.querySelector( '#yourname' ),
  //       json = { yourname: input.value },
  //       body = JSON.stringify( json )
  const taskInput = document.querySelector('#task');
  const startdateInput = document.querySelector('#startdate');
  const duedateInput = document.querySelector('#duedate');

  if( taskInput.value === 'Task Name' ) {
    alert( 'Please enter a task name' );
    return;
  }

  if (startdateInput.value === '' || startdateInput.value === null) {
    alert('Please enter a start date');
    return;
  }

  if (duedateInput.value === '' || duedateInput.value === null) {
    alert('Please enter a due date');
    return;
  }

  const startDate = new Date(startdateInput.value);
  const dueDate = new Date(duedateInput.value);
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  
  const calcDate = Math.round((dueDate - startDate) / (1000 * 60 * 60 * 24));
  
  let calcDaysLeft = (dueDate - today) / (1000 * 60 * 60 * 24);  
  
  if (calcDaysLeft < 0) {
      calcDaysLeft = 0;
  } else {
      calcDaysLeft = Math.ceil(calcDaysLeft);
  }

  const json = {
    task: taskInput.value,
    startdate: startdateInput.value,
    duedate: duedateInput.value,
    daysavailable: calcDate,
    daysleft: calcDaysLeft
  }

  const body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const updatedAppData = await response.json();
  console.log('Updated App Data:', updatedAppData);

  localStorage.setItem('appData', JSON.stringify(updatedAppData));
  
  populateTable(updatedAppData);

  taskInput.value = 'Task Name';
  startdateInput.value = '';
  duedateInput.value = '';
}

window.onload = function() {
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.onclick = submit;

  const appData = JSON.parse(localStorage.getItem('appData'));
  if (appData) {
    populateTable(appData);
  }
}

const populateTable = (data) => {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';

  data.forEach((item, index) => {
      const row = document.createElement('tr');

      const taskCell = document.createElement('td');
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('flex-container');
      const taskInput = document.createElement('input');
      taskInput.type = 'text';
      taskInput.value = item.task;
      taskContainer.appendChild(taskInput);
      taskCell.appendChild(taskContainer);
      row.appendChild(taskCell);

      const startDateCell = document.createElement('td');
      const startDateContainer = document.createElement('div');
      startDateContainer.classList.add('flex-container');
      const startDateInput = document.createElement('input');
      startDateInput.type = 'date';
      startDateInput.value = item.startdate;
      startDateContainer.appendChild(startDateInput);
      startDateCell.appendChild(startDateContainer);
      row.appendChild(startDateCell);

      const dueDateCell = document.createElement('td');
      const dueDateContainer = document.createElement('div');
      dueDateContainer.classList.add('flex-container');
      const dueDateInput = document.createElement('input');
      dueDateInput.type = 'date';
      dueDateInput.value = item.duedate;
      dueDateContainer.appendChild(dueDateInput);
      dueDateCell.appendChild(dueDateContainer);
      row.appendChild(dueDateCell);

      const daysAvailableCell = document.createElement('td');
      daysAvailableCell.textContent = item.daysavailable;
      row.appendChild(daysAvailableCell);

      const daysLeftCell = document.createElement('td');
      daysLeftCell.textContent = item.daysleft;
      row.appendChild(daysLeftCell);

      const saveCell = document.createElement('td');
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';

      saveButton.onclick = () => saveRow(index);
      saveCell.appendChild(saveButton);
      row.appendChild(saveCell);

      const deleteCell = document.createElement('td'); 
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';

      deleteButton.onclick = () => deleteRow(index);
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);


      tableBody.appendChild(row);
  });
};

const deleteRow = async (index) => {
  const response = await fetch(`/delete/${index}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const appData = await response.json(); 
    localStorage.setItem('appData', JSON.stringify(appData)); 
    populateTable(appData);
  } else {
    console.error('Failed to delete the row on the server');
  }
};

const saveRow = async (index) => {
  const tableBody = document.querySelector('#data-table tbody');
  const row = tableBody.children[index];

  const taskInput = row.querySelector('input[type="text"]');
  const startDateInput = row.querySelector('input[type="date"]'); // First date input nth child is not worth the pain
  const dueDateInput = row.querySelectorAll('input[type="date"]')[1]; // Second date input

  // console.log('Task:', taskInput.value);
  // console.log('Start Date:', startDateInput.value);
  // console.log('Due Date:', dueDateInput.value);

  const updatedTask = {
    task: taskInput.value,
    startdate: startDateInput.value,
    duedate: dueDateInput.value,
    daysavailable: Math.round((new Date(dueDateInput.value) - new Date(startDateInput.value)) / (1000 * 60 * 60 * 24)),
    daysleft: Math.ceil((new Date(dueDateInput.value) - new Date()) / (1000 * 60 * 60 * 24))
  };

  const response = await fetch(`/update/${index}`, {
    method: 'PUT',
    body: JSON.stringify(updatedTask),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const updatedAppData = await response.json();
    localStorage.setItem('appData', JSON.stringify(updatedAppData));
    populateTable(updatedAppData);
  } else {
    console.error('Failed to save the row on the server');
  }
};


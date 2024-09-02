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
      taskCell.textContent = item.task;
      row.appendChild(taskCell);

      const startDateCell = document.createElement('td');
      startDateCell.textContent = item.startdate;
      row.appendChild(startDateCell);

      const dueDateCell = document.createElement('td');
      dueDateCell.textContent = item.duedate;
      row.appendChild(dueDateCell);

      const daysAvailableCell = document.createElement('td');
      daysAvailableCell.textContent = item.daysavailable;
      row.appendChild(daysAvailableCell);

      const daysLeftCell = document.createElement('td');
      daysLeftCell.textContent = item.daysleft;
      row.appendChild(daysLeftCell);

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
  const appData = JSON.parse(localStorage.getItem('appData'));
  appData.splice(index, 1);

  localStorage.setItem('appData', JSON.stringify(appData));
  populateTable(appData);
};
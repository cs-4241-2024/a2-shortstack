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
    const updatedData = await response.json();

    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';

    updatedData.forEach(entry => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${entry.employeeid}</td>
        <td>${entry.name}</td>
        <td>${entry.salary}</td>
        <td>${entry.regdate}</td>
        <td>${entry.expdate}</td>
      `;
      tableBody.appendChild(newRow);
    });

    document.querySelector('#employeeForm').reset();
  } else {
    console.error('Failed to submit data');
  }
};

window.onload = function () {
  const form = document.querySelector('#employeeForm');
  form.onsubmit = submit;
};

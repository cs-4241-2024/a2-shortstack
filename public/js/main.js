const appdata = [
  { name: 'Assignment 1', points: 100, score: 90, difficulty: 5 },
  { name: 'Assignment 2', points: 50, score: 45, difficulty: 3 },
  { name: 'Assignment 3', points: 75, score: 70, difficulty: 7 }
];

const submit = function(event) {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const points = document.querySelector('#points').value;
  const score = document.querySelector('#score').value;
  const difficulty = document.querySelector('#difficulty').value;
  const data = { name, points, score, difficulty };

  appdata.push(data);
  console.log('Data added:', data);
  loadTable();
};

const loadTable = function() {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';
  appdata.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.points}</td>
      <td>${row.score}</td>
      <td>${row.difficulty}</td>
      <td>
        <button onclick="editData(${index})">Edit</button>
        <button onclick="deleteData(${index})">Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
};

const editData = function(index) {
  const data = appdata[index];
  document.querySelector('#name').value = data.name;
  document.querySelector('#points').value = data.points;
  document.querySelector('#score').value = data.score;
  document.querySelector('#difficulty').value = data.difficulty;
  document.querySelector('#dataForm').onsubmit = function(event) {
    event.preventDefault();
    updateData(index);
  };
};

const updateData = function(index) {
  const name = document.querySelector('#name').value;
  const points = document.querySelector('#points').value;
  const score = document.querySelector('#score').value;
  const difficulty = document.querySelector('#difficulty').value;
  const data = { name, points, score, difficulty };

  appdata[index] = data;
  console.log('Data updated:', data);
  loadTable();
  document.querySelector('#dataForm').onsubmit = submit;
};

const deleteData = function(index) {
  appdata.splice(index, 1);
  console.log('Data deleted at index:', index);
  loadTable();
};

window.onload = function() {
  const form = document.querySelector('#dataForm');
  form.onsubmit = submit;
  loadTable();
};



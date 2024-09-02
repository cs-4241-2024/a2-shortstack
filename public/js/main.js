const appdata = [
  { model: 'toyota', year: 1999, mpg: 23, age: new Date().getFullYear() - 1999 },
  { model: 'honda', year: 2004, mpg: 30, age: new Date().getFullYear() - 2004 },
  { model: 'ford', year: 1987, mpg: 14, age: new Date().getFullYear() - 1987 }
];

const submit = function(event) {
  event.preventDefault();

  const model = document.querySelector('#model').value;
  const year = document.querySelector('#year').value;
  const mpg = document.querySelector('#mpg').value;
  const data = { model, year, mpg, age: new Date().getFullYear() - year };

  appdata.push(data);
  console.log('Data added:', data);
  loadTable();
};

const loadTable = function() {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';
  appdata.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.model}</td><td>${row.year}</td><td>${row.mpg}</td><td>${row.age}</td>`;
    tableBody.appendChild(tr);
  });
};

window.onload = function() {
  const form = document.querySelector('#dataForm');
  form.onsubmit = submit;
  loadTable();
};
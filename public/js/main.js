const submit = async function(event) {
  event.preventDefault();

  const model = document.querySelector('#model').value;
  const year = document.querySelector('#year').value;
  const mpg = document.querySelector('#mpg').value;
  const json = { model, year, mpg };
  const body = JSON.stringify(json);

  const response = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });

  const text = await response.text();
  console.log('text:', text);
  loadTable();
};

const loadTable = async function() {
  const response = await fetch('/data');
  const data = await response.json();
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';
  data.forEach(row => {
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
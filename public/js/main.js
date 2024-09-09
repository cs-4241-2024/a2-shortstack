let appdata = [];
const submitCar = async function(event) {
  event.preventDefault();

  const model = document.querySelector("#model").value.trim();
  const year = parseInt(document.querySelector("#year").value);
  const mpg = parseInt(document.querySelector("#mpg").value);
  
  console.log("Car Data:", { model, year, mpg });

  if (!model || isNaN(year) || isNaN(mpg)) {
      window.alert("Please fill in all fields correctly");
      return;
  }

  const cardata = { model, year, mpg };

  try {
      const response = await fetch('/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardata)
      });
      const data = await response.json();
      updateCarTable(data);
  } catch (error) {
      console.error('Error:', error);
  }
};

const editCar = function(index) {
    const car = appdata[index]; 

    document.querySelector("#model").value = car.model;
    document.querySelector("#year").value = car.year;
    document.querySelector("#mpg").value = car.mpg;
};

const removeCar = async function(index) {
    try {
        const response = await fetch(`/delete/${index}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        updateCarTable(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const submitEdit = async function(index) {
  removeCar(index);
  const model = document.querySelector("#model").value.trim();
  const year = parseInt(document.querySelector("#year").value);
  const mpg = parseInt(document.querySelector("#mpg").value);
  
  console.log("Car Data:", { model, year, mpg });

  if (!model || isNaN(year) || isNaN(mpg)) {
      window.alert("Please fill in all fields correctly");
      return;
  }

  const cardata = { model, year, mpg };
  try{
    const response = await fetch('/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardata)
      });
  } catch (error) {
    console.error('Error:', error);
  }
};

const updateCarTable = function(data) {
  appdata = data;
  const table = document.querySelector("#car-table");
  table.innerHTML = "<tr><th>Model</th><th>Year</th><th>MPG</th><th>Years Old</th><th>Actions</th></tr>";
  
  data.forEach((car, index) => {
      const row = `
          <tr>
              <td>${car.model}</td>
              <td>${car.year}</td>
              <td>${car.mpg}</td>
              <td>${car.yearsOld}</td>
              <td>
                <button onclick="editCar(${index})">Edit</button>
                <button onclick="submitEdit(${index})">Submit Edit</button>
                <button onclick="removeCar('${index}')">Remove</button>
              </td>
          </tr>
      `;
      table.innerHTML += row;
  });
};

window.onload = function() {
  document.querySelector("#car-form").addEventListener("submit", submitCar);

  fetch('/data', { method: 'GET' })
      .then(response => response.json())
      .then(data => updateCarTable(data))
      .catch(error => console.error('Error:', error));
};

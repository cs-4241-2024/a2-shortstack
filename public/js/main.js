// FRONT-END (CLIENT) JAVASCRIPT HERE


const updateTable = async function() {
  const response = await fetch('/submit', {
    method: 'POST',
    body: JSON.stringify({ action: 'get' }),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()

  const tableBody = document.querySelector('#productsTable tbody')
  tableBody.innerHTML = '' // Clear the table
  data.forEach(p => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${p.product}</td>
      <td>${p.releaseYear}</td>
      <td>${p.releaseCost}</td>
      <td>${p.currentCost}</td>
    `;
    tableBody.appendChild(newRow);
  });
}

const addProduct = async function (event) {
  event.preventDefault();

  const product = document.querySelector('#product').value;
  const releaseYear = document.querySelector('#releaseYear').value;
  const releaseCost = document.querySelector('#releaseCost').value;
  const currentCost = 0;

  const data = {
    action: 'add',
    product,
    releaseYear: parseInt(releaseYear),
    releaseCost: parseInt(releaseCost),
    currentCost: parseInt(currentCost)
  };

  const response = await fetch('/submit', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  await updateTable();
};

const deleteProduct = async function (event) {
  event.preventDefault();

  const product = document.querySelector('#productName').value;

  const data = {
    action: 'delete',
    product
  };

  const response = await fetch('/submit', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  await updateTable();
};

window.onload = function () {
  updateTable();

  const addProductForm = document.querySelector('.Form');
  const deleteProductForm = document.querySelector('#deleteForm');
  addProductForm.onsubmit = addProduct;
  deleteProductForm.onsubmit = deleteProduct;


  // const deleteProductForm = document.querySelector('#deleteProductForm');
  // deleteProductForm.onsubmit = deleteProduct;
};
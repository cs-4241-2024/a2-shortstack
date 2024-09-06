// FRONT-END (CLIENT) JAVASCRIPT HERE

// Initialize cumulativeTotalPrice and orderedItemsArray outside of the submit function
let cumulativeTotalPrice = 0;
let orderedItemsArray = []; // To store all the orders

const submit = async function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  const nameInput = document.querySelector("#name"),
      foodInput = document.querySelector("#food"),
      quantityInput = document.querySelector("#quantity");

  const json = {
    name: nameInput.value,
    food: foodInput.value,
    quantity: quantityInput.value,
  };

  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const text = await response.text();
  console.log("text:", text);

  const foodOptions = {
    10: "Burger",
    5: "Fries",
    3: "Milkshake"
  };

  // Get the selected food price and food name
  const selectedFoodPrice = parseInt(foodInput.value);
  const selectedFoodName = foodOptions[selectedFoodPrice];

  // Get the quantity of the order
  const quantity = parseInt(quantityInput.value);

  // Calculate the total price for this submission
  const totalPrice = selectedFoodPrice * quantity;

  // Add the current total to the cumulative total
  cumulativeTotalPrice += totalPrice;

  // Add the current order to the array
  orderedItemsArray.push({
    name: nameInput.value,
    foodName: selectedFoodName,
    foodPrice: selectedFoodPrice,
    quantity: quantity
  });

  // Update the total price field with the cumulative total
  const totalPriceField = document.querySelector("#totalPriceField");
  totalPriceField.innerHTML = `<h3>Cumulative Total Price: $${cumulativeTotalPrice}</h3>`;

  // Render the ordered items in the list
  renderOrderedItems();
};

// Function to render ordered items and create edit buttons
function renderOrderedItems() {
  const orderedItemsList = document.querySelector("#orderedItemsList");
  orderedItemsList.innerHTML = ''; // Clear the list before re-rendering

  orderedItemsArray.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.id = `item-${index}`;
    listItem.innerHTML = `
      <span>${item.name} ordered ${item.quantity} x ${item.foodName} ($${item.foodPrice} each)</span>
      <button onclick="editItem(${index})">Edit</button>
      <button onclick="deleteItem(${index})">Delete</button>
    `;
    orderedItemsList.appendChild(listItem);
  });
}

// Function to edit an existing order
function editItem(index) {
  const item = orderedItemsArray[index];

  // Replace the list item with editable fields
  const listItem = document.querySelector(`#item-${index}`);

  listItem.innerHTML = `
    <input type="text" id="editName-${index}" value="${item.name}" />
    <select id="editFood-${index}">
      <option value="10" ${item.foodPrice === 10 ? 'selected' : ''}>Burger ($10)</option>
      <option value="5" ${item.foodPrice === 5 ? 'selected' : ''}>Fries ($5)</option>
      <option value="3" ${item.foodPrice === 3 ? 'selected' : ''}>Milkshake ($3)</option>
    </select>
    <input type="number" id="editQuantity-${index}" value="${item.quantity}" min="1" max="5" />
    <button onclick="saveItem(${index})">Save</button>
    <button onclick="cancelEdit(${index})">Cancel</button>
  `;
}

function saveItem(index) {
  const nameInput = document.querySelector(`#editName-${index}`).value;
  const foodPrice = parseInt(document.querySelector(`#editFood-${index}`).value);
  const quantity = parseInt(document.querySelector(`#editQuantity-${index}`).value);

  const foodOptions = {
    10: "Burger",
    5: "Fries",
    3: "Milkshake"
  };

  const foodName = foodOptions[foodPrice];

  // Adjust the cumulative total price by subtracting the current item's total and adding the updated one
  cumulativeTotalPrice -= orderedItemsArray[index].foodPrice * orderedItemsArray[index].quantity;
  cumulativeTotalPrice += foodPrice * quantity;

  // Update the order in the array
  orderedItemsArray[index] = {
    name: nameInput,
    foodName: foodName,
    foodPrice: foodPrice,
    quantity: quantity
  };

  // Update the total price field with the new cumulative total
  const totalPriceField = document.querySelector("#totalPriceField");
  totalPriceField.innerHTML = `<h3>Cumulative Total Price: $${cumulativeTotalPrice}</h3>`;

  // Re-render the list with updated values
  renderOrderedItems();
}

function cancelEdit(index) {
  // Re-render the list to revert the item back to its original state
  renderOrderedItems();
}

// Function to delete an item from the list
function deleteItem(index) {
  // Adjust the cumulative total price by subtracting the item's total
  cumulativeTotalPrice -= orderedItemsArray[index].foodPrice * orderedItemsArray[index].quantity;

  // Remove the item from the array
  orderedItemsArray.splice(index, 1);

  // Update the total price field
  const totalPriceField = document.querySelector("#totalPriceField");
  totalPriceField.innerHTML = `<h3>Cumulative Total Price: $${cumulativeTotalPrice}</h3>`;

  // Re-render the list
  renderOrderedItems();
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};
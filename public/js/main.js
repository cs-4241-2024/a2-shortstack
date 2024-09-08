// Initialize cumulativeTotalPrice and orderedItemsArray with values from localStorage, if available
let cumulativeTotalPrice = localStorage.getItem("cumulativeTotalPrice")
    ? parseFloat(localStorage.getItem("cumulativeTotalPrice"))
    : 0;

let orderedItemsArray = localStorage.getItem("orderedItemsArray")
    ? JSON.parse(localStorage.getItem("orderedItemsArray"))
    : [];

// Update the total price field with the cumulative total on page load
const totalPriceField = document.querySelector("#totalPriceField");
totalPriceField.innerHTML = `<h3>Cumulative Total Price: $${cumulativeTotalPrice}</h3>`;

// Render the ordered items in the list on page load
renderOrderedItems();

const submit = async function (event) {
  event.preventDefault();

  const nameInput = document.querySelector("#name"),
      foodInput = document.querySelector("#food"),
      quantityInput = document.querySelector("#quantity");

  // Validation: Ensure all fields are filled out
  if (!nameInput.value || !foodInput.value || !quantityInput.value) {
    alert("Please fill out all fields before submitting the form.");
    return; // Stop form submission if validation fails
  }

  const json = {
    name: nameInput.value,
    food: foodInput.value,
    quantity: quantityInput.value,
    cumulativeTotalPrice: cumulativeTotalPrice
  };

  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body: JSON.stringify(json),
    headers: { "Content-Type": "application/json" },
  });


  const text = await response.text();
  console.log("text:", text);

  const foodOptions = {
    10: "Burger",
    5: "Fries",
    3: "Milkshake",
  };

  const selectedFoodPrice = parseInt(foodInput.value);
  const selectedFoodName = foodOptions[selectedFoodPrice];
  const quantity = parseInt(quantityInput.value);

  const totalPrice = selectedFoodPrice * quantity;

  cumulativeTotalPrice += totalPrice;

  orderedItemsArray.push({
    name: nameInput.value,
    foodName: selectedFoodName,
    foodPrice: selectedFoodPrice,
    quantity: quantity,
  });

  // Save to localStorage
  localStorage.setItem("cumulativeTotalPrice", cumulativeTotalPrice);
  localStorage.setItem("orderedItemsArray", JSON.stringify(orderedItemsArray));

  totalPriceField.innerHTML = `<h3>Cumulative Total Price: $${cumulativeTotalPrice}</h3>`;

  renderOrderedItems();
};

function renderOrderedItems() {
  const orderedItemsList = document.querySelector("#orderedItemsList");
  orderedItemsList.innerHTML = "";

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

function editItem(index) {
  const item = orderedItemsArray[index];
  const listItem = document.querySelector(`#item-${index}`);
  listItem.innerHTML = `
    <input type="text" id="editName-${index}" value="${item.name}" />
    <select id="editFood-${index}">
      <option value="10" ${
      item.foodPrice === 10 ? "selected" : ""
  }>Burger ($10)</option>
      <option value="5" ${
      item.foodPrice === 5 ? "selected" : ""
  }>Fries ($5)</option>
      <option value="3" ${
      item.foodPrice === 3 ? "selected" : ""
  }>Milkshake ($3)</option>
    </select>
    <input type="number" id="editQuantity-${index}" value="${
      item.quantity
  }" min="1" max="5" />
    <button onclick="saveItem(${index})">Save</button>
  `;
}

function saveItem(index) {
  const nameInput = document.querySelector(`#editName-${index}`).value;
  const foodPrice = parseInt(
      document.querySelector(`#editFood-${index}`).value
  );
  const quantity = parseInt(
      document.querySelector(`#editQuantity-${index}`).value
  );

  const foodOptions = {
    10: "Burger",
    5: "Fries",
    3: "Milkshake",
  };

  const foodName = foodOptions[foodPrice];

  cumulativeTotalPrice -=
      orderedItemsArray[index].foodPrice * orderedItemsArray[index].quantity;
  cumulativeTotalPrice += foodPrice * quantity;

  orderedItemsArray[index] = {
    name: nameInput,
    foodName: foodName,
    foodPrice: foodPrice,
    quantity: quantity,
  };

  localStorage.setItem("cumulativeTotalPrice", cumulativeTotalPrice);
  localStorage.setItem("orderedItemsArray", JSON.stringify(orderedItemsArray));

  totalPriceField.innerHTML = `<h3>Cumulative Total Price: $${cumulativeTotalPrice}</h3>`;
  renderOrderedItems();
}

function deleteItem(index) {
  cumulativeTotalPrice -=
      orderedItemsArray[index].foodPrice * orderedItemsArray[index].quantity;

  orderedItemsArray.splice(index, 1);

  localStorage.setItem("cumulativeTotalPrice", cumulativeTotalPrice);
  localStorage.setItem("orderedItemsArray", JSON.stringify(orderedItemsArray));

  totalPriceField.innerHTML = `<h3>Cumulative Total Price: $${cumulativeTotalPrice}</h3>`;
  renderOrderedItems();
}

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};

// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function(event) {
  // stop form submission from trying to load a new .html page for displaying results...
  // this was the original browser behavior and still remains to this day
  event.preventDefault()
  
  const entry = {
      name: document.querySelector("#name").value, // item to buy (string)
      price: document.querySelector("#price").value, // price (number)
      quantity: document.querySelector("#quantity").value, // quantity (number)
  };
  const body = JSON.stringify(entry);
  
  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log("Received data:", data);
      displayTab(data); // call displayTab function after sending data
    } 
    else {
      console.error("Failed to submit data.");
    }
  } 
  
  catch (error) {
    console.error("Error:", error);
  }

  //const tr = document.querySelector('tr') 
  //tr.innerHTML = ""
  
  // data.map(item => item.name)
  //     .forEach(item => {
  //       const td = document.createElement("td")
  //       td.innerText = item
  //       tr.appendChild(td)
  //       console.log(item)
  //     })
      
  // const element = document.createElement('p');
  // element.innerHTML = data.obj
  // document.body.appendChild(element)
  // console.log( 'data:', data )
};

const displayTab = function (dataset) { // adds entries to the table, along with edit/delete button
  const tabBody = document.querySelector("#body");
  tabBody.innerHTML = "";

  for (const entry of dataset) {
    const tr = document.createElement("tr");

    const tdItem = document.createElement("td");
    tdItem.textContent = entry.name;
    tr.appendChild(tdItem);

    const tdQuantity = document.createElement("td");
    tdQuantity.textContent = entry.quantity;
    tr.appendChild(tdQuantity);

    const tdPrice = document.createElement("td");
    tdPrice.textContent = entry.price;
    tr.appendChild(tdPrice);

    const tdTotal = document.createElement("td");
    tdTotal.textContent = entry.total;
    tr.appendChild(tdTotal);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    //editButton.onclick = () => openEditor(entry);
    tr.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    //deleteButton.onclick = () => deleteEntry(entry.id);
    tr.appendChild(deleteButton);

    tabBody.appendChild(tr);
    console.log("entry: " + entry);
  }
};

window.onload = async function() {
  const button = document.querySelector("#submit");
  button.onclick = submit; // call submit when button is pressed
};
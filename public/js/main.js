// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#item'),
  input2 = document.querySelector( '#description'),
  input3 = document.querySelector( '#cost'), input4 = document.querySelector('#tax'),
        json = { item: input.value, description: input2.value, cost: input3.value, tax: input4.value, total: 0, tag: 0 },
        body = JSON.stringify( json )
 //console.log(input)
  const response = await fetch( '/data', {
    method:'POST',
    body
  })
  updateTable(response);
  input.value = '';
  input2.value = '';
  input3.value = '';
  input4.value = '';
        
}

async function deleteItem(tag) {
  console.log('Text: ',tag);
  const response = await fetch('/data', {
    method: 'DELETE',
    body: JSON.stringify({tag}),
  });
  const data = await response.json();
  //console.log('Text:', data.tag.value);
  const table = document.getElementById("list");
  table.innerHTML = "";
  table.innerHTML = `<tr><th>Item</th><th>Description</th><th>Cost</th><th>Tax</th><th>Total</th><th>Delete</th><th>Edit</th></tr>`;
  
  data.forEach(item => {
    table.innerHTML += `<tr><td>${item.item}</td><td>${item.description}</td><td>${item.cost}</td><td>${item.tax}</td><td>${item.total}</td><td><button id = "delete${item.tag}" onclick="deleteItem(${item.tag})">Delete</button id = "edit${item.tag}"></td><td><button onclick="editItem(${item.tag})">Edit</button></td></tr>`;
  });
  
}

async function updateTable(response) {
  const data = await response.json();
  const table = document.getElementById("list");
  table.innerHTML = "";
  table.innerHTML = `<tr><th>Item</th><th>Description</th><th>Cost</th><th>Tax</th><th>Total</th><th>Delete</th><th>Edit</th></tr>`;
  
  data.forEach(item => {
    table.innerHTML += `<tr><td>${item.item}</td><td>${item.description}</td><td>${item.cost}</td><td>${item.tax}</td><td>${item.total}</td><td><button id = "delete${item.tag}" onclick="deleteItem(${item.tag})">Delete</button></td><td><button id = "edit${item.tag}" onclick="editItem(${item.tag})">Edit</button></td></tr>`;
  });
  //console.log('Text:', data.tag);
}

async function editItem(tag){
  document.getElementById("item").value = item.item;
  document.getElementById("description").value = item.description;
  document.getElementById("cost").value = item.cost;
  document.getElementById("tax").value = item.tax;
}



window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
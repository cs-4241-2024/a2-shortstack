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
  const response = await fetch('/data', {
    method: 'DELETE',
    body: JSON.stringify({tag})
  });
  updateTable(response);
}

async function editItem(tag) {
  input1 = document.querySelector('#item');
  input2 = document.querySelector('#description');
  input3 = document.querySelector('#cost');
  input4 = document.querySelector('#tax');
  input1.value = item.item
  input2.value = item.description
  input3.value = item.cost 
  input4.value = item.tax
  const response = await fetch('/data', {
    method: 'PUT',
    body: JSON.stringify({tag})
  });
  updateTable(response);
}

async function updateTable(response) {
  const data = await response.json();
  const table = document.getElementById("list");
  
  data.forEach(item => {
    table.innerHTML += `<tr><td>${item.item}</td><td>${item.description}</td><td>${item.cost}</td><td>${item.tax}</td><td>${item.total}</td><td><button onclick="deleteItem(${item.tag})">Delete</button></td><td><button onclick="editItem(${item.tag})">Edit</button></td></tr>`;
  });
  console.log('Text:', data.tag);
}



window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
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
        json = { item: input.value, description: input2.value, cost: input3.value, tax: input4.value, total: 0, id: 0 },
        body = JSON.stringify( json )
 //console.log(input)
  const response = await fetch( '/data', {
    method:'POST',
    body
  })

  const text = await response.json()
  
  const table = document.getElementById("list");
  table.innerHTML += `<tr><td>${text.item}</td><td>${text.description}</td><td>${text.cost}</td><td>${text.tax}</td><td>${text.total}</td><td><button>Edit</button></td><td><button>Delete</button></td></tr>`;
  
  console.log( 'text:', JSON.stringify(text ));
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
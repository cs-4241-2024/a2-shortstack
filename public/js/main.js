// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#item'),
  input2 = document.querySelector( '#description'),
  input3 = document.querySelector( '#cost'),
        json = { item: input.value, description: input2.value, cost: input3.value, total: cost.value * 1.0625 },
        body = JSON.stringify( json )
 console.log(input)
  const response = await fetch( '/submit', {
    method:'POST',
    body
  })

  const text = await response.json()
  
  /*const element = document.createElement('p')
  element.innerHTML = `<a href="http://wpi.edu"> ${text[0].year} </a>`
  document.body.appendChild( element )*/
  const table = document.querySelector('#list')
  //table.innerHTML = `<tr><th>Item</th><th>Description</th><th>Cost</th><th>Total</th></tr>`
  for (let i = 0; i < text.length; i++) {
    table.innerHTML += `<tr><td>${text[i].item}</td><td>${text[i].description}</td><td>${text[i].cost}</td><td>${text[i].total}</td><th><button>Edit</button></th><th><button>Delete</button></th></tr>`
  }
  document.body.appendChild( table )
  
  
  console.log( 'text:', JSON.stringify(text ));
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
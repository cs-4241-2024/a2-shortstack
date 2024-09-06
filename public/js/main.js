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
        json = { item: input.value, description: input2.value, cost: input3.value },
        body = JSON.stringify( json )
 console.log(input)
  const response = await fetch( '/submit', {
    method:'POST',
    body
  })

  const text = await response.json()
  
  const element = document.createElement('p')
  element.innerHTML = `<a href="http://wpi.edu"> ${text[0].year} </a>`
  document.body.appendChild( element )
  
  console.log( 'text:', JSON.stringify(text ));
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
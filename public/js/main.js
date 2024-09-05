// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#ToDo' )
  const input2 = document.querySelector( '#priority' ),
        json = { ToDo: input.value , priority: input2.value},
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.json()
  const element = document.createElement('li')
  element.innerHTML= text.stringify
  document.body.appendChild(element)

  console.log( 'text:', text )
  //call the ul and add the entries using li
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
 // button.click();
}
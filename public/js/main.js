// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  

  const input = document.querySelector( '#name' )
    json = { name: input.value },
    body = JSON.stringify( json )

  const input2 = document.querySelector ('#musical')
    json = { musical: input2.value },
    body = JSON.stringify( json )

  const input3 = document.querySelector ('#songs')
    json = { songs: input3.value },
    body = JSON.stringify( json )
  

  

  const response = await fetch( '/submit', {
    method:'POST',
    body
  })
      
  const text = await response.json()
  
  const element = document.createElement('p')
  element.innerHTML = `<a href="http://wpi.edu"> ${text[0].name} </a>`
  document.body.appendChild( element )
  
  console.log( 'text:', text )
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
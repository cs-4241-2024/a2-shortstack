const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    
    const input = document.querySelector( '#title' ),
          json = { "title": input.value },
          body = JSON.stringify( json )
  
    const response = await fetch( '/submit', {
      method:'POST',
      body
    })
  
    const text = await response.json()
    
    const element = document.createElement('p')
    element.innerHTML = `<a href="http://wpi.edu"> ${text.obj} </a>`
    document.body.appendChild( element )
    
    console.log( 'text:', text )
  }
  
  window.onload = function() {
    const newBookButton = document.querySelector("#newBook");
    newBookButton.onclick = submit;
    const deleteBookButton = document.querySelector("#deleteBook");
    //deleteBookButton.onclick = deleter;
    
  }
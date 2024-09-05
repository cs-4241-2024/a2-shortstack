// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.json()
  data.map(item => item.model)
      .map(item => item[0].toUpperCase() + item.slice(3))
      .forEach(item => {
          const li = document.createElement('li')
          li.innerText = item
          ul.appendChild(li)
  })
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}

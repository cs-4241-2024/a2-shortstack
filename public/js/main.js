// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector('#item'),
        json = { item: input.value },
        body = JSON.stringify( json )
 
  const response = await fetch( '/submit', { // fetch method to send it up to server
    method:'POST',
    body 
  })

  const data = await response.json()

  const ul = document.querySelector('ul') 
  ul.innerHTML = ""
  
  data.map(item => item.name)
      .forEach(item => {
        const li = document.createElement("li")
        li.innerText = item
        ul.appendChild(li)
        console.log(item)
      })

  // const element = document.createElement('p');
  // element.innerHTML = data.obj
  // document.body.appendChild(element)
  // console.log( 'data:', data )
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}
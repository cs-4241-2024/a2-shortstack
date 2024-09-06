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
  const ul = document.querySelector('ul')
  ul.innerHTML=''
  data.map( item => item )
      .map( item => item[0].toUpperCase() + item.slide(1))
      .forEach(item=> {
      const li = document.createElement('li')
        li.innerText = item
        ul.appendChild(li)
      })
      //.forEach(item=>console.log(item))
  // Take the values the server gives you and make an element out of that!
    // const element = document.createElement('p')
    // element.innerHTML='<a href="http://wpi.edu">wpi</a>'
    // document.body.appendChild(element)

  //console.log( 'text:', text )
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}
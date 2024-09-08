// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const productInput = document.querySelector( '#product' ),
        json1 = { product: productInput.value },
        body1 = JSON.stringify( json1 )

  const releaseYearInput = document.querySelector( '#yearOfRelease' ),
      json2 = { yearOfRelease: releaseYearInput },
      body2 = JSON.stringify( json2 )

  const releaseCostInput = document.querySelector( '#releaseCost' ),
      json3 = { releaseCost: releaseCostInput },
      body3 = JSON.stringify( json3 )
        
  const response = await fetch( '/submit', {
    method:'POST',
    body1,
    body2,
    body3 
  })

  const data = await response.json()

  data.map( item => item.model)
    .forEach(item => console.log(item))

  //data.forEach(d => console.log(d))

  //console.log( 'text:', text )
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}
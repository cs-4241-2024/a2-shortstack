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
      json2 = { yearOfRelease: releaseYearInput.value },
      body2 = JSON.stringify( json2 )

  const releaseCostInput = document.querySelector( '#releaseCost' ),
      json3 = { releaseCost: releaseCostInput.value },
      body3 = JSON.stringify( json3 )
        
  const response = await fetch( '/submit', {
    method:'POST',
    body1,
    body2,
    body3 
  })

  const data = await response.json()

  // data.map( item => item.product)
  //   .forEach(item => console.log(item))
  // data.map( item => item.releaseYear)
  //   .forEach(item => console.log(item))
  // data.map( item => item.releaseCost)
  //   .forEach(item => console.log(item))
  // data.map( item => item.newCost)
  //   .forEach(item => console.log(item))

  /*
  data.map( item => item.product)
    .forEach(item => dataFunction(item))
  // deriving new data field function
  function dataFunction(item1) {
    console.log(item1.newCost);
    item1.newCost = item1.releaseCost;
    const year = item1.yearOfRelease;
    while (year < 2024) {
      item1.newCost *= 1.0328;
      console.log(item1.newCost);
      year++;
    }
    console.log(item1.newCost);
  }
  */

}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}
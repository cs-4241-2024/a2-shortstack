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

  const text = await response.text()

  console.log( 'text:', text )
}
const handleSubmit = async(title, type, store, price, coh) => { 
  const body = JSON.stringify({ 
    "title": title, 
    "category": type, 
    "store": store, 
    "price": price, 
    "cashOnHand": coh
  }); 
  const makeRequest = await fetch('/api/createPurchase', {
    method: 'POST', 
    body
  }); 
  return makeRequest; 
  
}
window.onload =  function() {
   const form = document.getElementById('budgetForm'); 
   const title = document.getElementById('title').value; 
   const type = document.getElementById('types').value; 
   const store = document.getElementById('store').value; 
   const price = document.getElementById('price').value; 
   const coh = document.getElementById('coh').value; 


   form.addEventListener("submit", (event) => { 
    
  event.preventDefault(); 
  form.onsubmit=  handleSubmit(title, type, store, price, coh ).then(); 

  

 


 





  // console.log(title, type, store, price, coh) ;
  //   console.log("test'"); 
  //  })
   }); 
}


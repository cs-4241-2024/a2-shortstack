// FRONT-END (CLIENT) JAVASCRIPT HERE

let data = {}; 

const handleSubmit = async(title, type, store, price, coh) => { 
  console.log("inside function"); 
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
  const getResults = await fetch('/api/getResults', { 
    method:'GET'
  }); 
  return (await getResults.json())

  
  
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
  form.onsubmit=  handleSubmit(title, type, store, price, coh ).then((res) => { 
    console.log("res is", res); 
  }); 

  

 


 





  // console.log(title, type, store, price, coh) ;
  //   console.log("test'"); 
  //  })
   }); 
}


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
    res.map((item, idx) => { 
      const title = res[idx]['title']; 
      const category = res[idx]['category']; 
      const store = res[idx]['store']; 
      const price = res[idx]['price']; 
      const cashOnHand = res[idx]['cashOnHand']; 
      const affoardable = res[idx]['affoardable?']; 
      const resultsTable = document.getElementById('resultsTable'); 
      const resultRow = document.createElement('tr'); 


      const resultTitle = document.createElement('td'); 
      resultTitle.innerHTML = title; 
      const resultCategory = document.createElement('td'); 
      resultCategory.innerHTML = category; 
      const resultStore = document.createElement('td'); 
      resultStore.innerHTML = store; 
      const resultPrice = document.createElement('td'); 
      resultPrice.innerHTML = price; 
      const resultCOH =  document.createElement('td');
      resultCOH.innerHTML = cashOnHand; 
      const resultAffoardable = document.createElement('td'); 
      resultAffoardable.innerHTML = affoardable; 
      


      resultTitle.innerHTML= "test"; 
      resultRow.appendChild(resultTitle); 
      resultRow.appendChild(resultCategory); 
      resultRow.appendChild(resultStore)
      resultRow.appendChild(resultPrice)
      resultRow.appendChild(resultCOH)
      resultRow.appendChild(resultAffoardable); 
      resultsTable.appendChild(resultRow); 

    })





   

  }); 

  

 


 





  // console.log(title, type, store, price, coh) ;
  //   console.log("test'"); 
  //  })
   }); 
}


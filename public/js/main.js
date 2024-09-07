// FRONT-END (CLIENT) JAVASCRIPT HERE

let data = {}; 

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
  const getResults = await fetch('/api/getResults', { 
    method:'GET'
  }); 
  return (await getResults.json())

  
  
}

const handleDelete = async (title) => {
  const body = JSON.stringify({
    "title": title
  }); 
  await fetch('/api/deletePurchase', {
    method: 'POST', 
    body
  }); 



}
window.onload =  function() {
   const form = document.getElementById('budgetForm'); 
 


   form.addEventListener("submit", (event) => { 
    
  event.preventDefault(); 
  const title = document.getElementById('title').value; 
  const type = document.getElementById('types').value; 
  const store = document.getElementById('store').value; 
  const price = document.getElementById('price').value; 
  const coh = document.getElementById('coh').value; 
  form.onsubmit=  handleSubmit(title, type, store, price, coh ).then((res) => { 
    const item = res.at(-1); 
  
    
      const title = item['title']; 
      const category = item['category']; 
      const store = item['store']; 
      const price = item['price']; 
      const cashOnHand = item['cashOnHand']; 
      const affoardable = item['affoardable?']; 
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
      const editButton = document.createElement('button'); 
      editButton.innerHTML = 'update Item'; 
    
      resultRow.appendChild(resultTitle); 
      resultRow.appendChild(resultCategory); 
      resultRow.appendChild(resultStore)
      resultRow.appendChild(resultPrice)
      resultRow.appendChild(resultCOH)
      resultRow.appendChild(resultAffoardable); 
      resultRow.appendChild(editButton); 
      resultsTable.appendChild(resultRow); 
      editButton.onclick = () => { 
        const title = resultTitle.innerHTML; 
        handleDelete(title); 
        resultsTable.removeChild(resultRow); 
        
      }
  }); 

   }); 
}


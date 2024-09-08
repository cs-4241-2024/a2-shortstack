const handleSubmit = async(title, type, store, price, coh) => { 
  const body = JSON.stringify({ 
    "title": title, 
    "category": type, 
    "store": store, 
    "price": price, 
    "cashOnHand": coh
  }); 
   await fetch('/api/createPurchase', {
    method: 'POST', 
    body
  }); 
  const getResults = await fetch('/api/getResults', { 
    method:'GET'
  }); 
  return (await getResults.json())

  
  
}
const getAllItems = async () => {
  const data = await fetch('/api/getResults', {
    method: "GET"
  }); 
  return (await data.json()); 
}

const handleDelete = async (title) => {
  console.log("deleting..."); 
  console.log("title is!", title); 
  const modal = document.getElementById('deleteDialog'); 
  const body = JSON.stringify({
    "title": title
  }); 
  await fetch('/api/deletePurchase', {
    method: 'POST', 
    body
  }); 

  getAllItems().then((res) => {
    console.log("res is", res); 
    buildTable(res, 'delete'); 

  })
  modal.close(); 
}
const handleUpdate = async (title, newTitle, newType, newStore, newPrice, newCoh) => { 
  console.log("Calling update function with a new title of", newTitle); 
  const body = JSON.stringify({
    "oldTitle": title, 
    "title": newTitle, 
    "category": newType, 
    "store": newStore, 
    "price": newPrice, 
    "cashOnHand": newCoh
  }); 
  const makeRequest = await fetch('/api/updatePurchase', {
    method: 'POST', 
    body
  }); 
  const getResults = await fetch('/api/getResults', { 
    method:'GET'
  }); 
  return (await getResults.json()); 


}
const buildTable = (res, mode) => { 
  resultsTable.innerHTML = ''; 
  res.map((item, idx) => {


  
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
    if(idx === 0){

  
     const headers = document.createElement('tr'); 
     const purchaseHeader = document.createElement('th'); 
     purchaseHeader.innerHTML = 'Purchase Title'; 
     const categoryHeader = document.createElement('th'); 
     categoryHeader.innerHTML = 'Category'; 
     const storeHeader = document.createElement('th'); 
     storeHeader.innerHTML = 'Store'; 
     const priceHeader = document.createElement('th'); 
     priceHeader.innerHTML = 'Price'; 
     
     const cohHeader = document.createElement('th'); 
     cohHeader.innerHTML = 'Cash On Hand'
     const affoardableHeader=document.createElement('th'); 
     affoardableHeader.innerHTML = 'Affoardable?'; 
     const editHeader = document.createElement('th'); 
     editHeader.innerHTML = 'edit/delete'
     headers.appendChild(purchaseHeader); 
     headers.appendChild(categoryHeader); 
     headers.appendChild(storeHeader); 
     headers.appendChild(priceHeader); 
     headers.append(cohHeader); 
     headers.append(affoardableHeader); 
     headers.append(editHeader); 
     resultsTable.appendChild(headers); 
    }

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
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'delete item'; 
      
      resultRow.appendChild(resultTitle); 
      resultRow.appendChild(resultCategory); 
      resultRow.appendChild(resultStore)
      resultRow.appendChild(resultPrice)
      resultRow.appendChild(resultCOH)
      resultRow.appendChild(resultAffoardable); 
      resultRow.appendChild(editButton); 
      resultRow.appendChild(deleteButton); 
      
      resultsTable.appendChild(resultRow); 
      editButton.addEventListener('click', (event) =>{
        console.log(resultTitle.innerHTML); 
        console.log('button clicked');  
        handleEditClick(event, resultTitle.innerHTML, resultCategory.innerHTML, resultStore.innerHTML, resultPrice.innerHTML, resultCOH.innerHTML);
      }); 
      deleteButton.addEventListener('click', () => {
        handleDelete(resultTitle.innerHTML); 
        
      })
    })


}
const handleEditClick = (event, oldTitle, category, store, price, coh, ) => { 
  event.preventDefault(); 
  const modal = document.getElementById('deleteDialog'); 
  document.getElementById('updatetitle').value = oldTitle; 
  document.getElementById('updatetypes').value = category;
  document.getElementById('updatestore').value = store; 
  document.getElementById('updateprice').value = price; 
  document.getElementById('updatecoh').value = coh;  
  console.log("the old title was", oldTitle); 
  modal.showModal();
  const buttonUpdate = document.getElementById('submitUpdates'); 
  buttonUpdate.addEventListener('click', (event) => {
    console.log("Button go"); 
  event.preventDefault();
          
  const newtitle = document.getElementById('updatetitle').value; 
  const newType = document.getElementById('updatetypes').value; 
  const newStore =  document.getElementById('updatestore').value; 
  const newPrice = document.getElementById('updateprice').value; 
  const newCoh = document.getElementById('updatecoh').value; 
  handleUpdate(oldTitle, newtitle, newType, newStore, newPrice, newCoh); 
  oldTitle = newtitle; 
  const updatedArr = []; 
  getAllItems().then((res) => {
    buildTable(res, 'update'); 

  })
 
  modal.close(); 
  }); 
}



window.onload =  function() {
  //logic for creating a new item 
   const form = document.getElementById('budgetForm'); 
   form.addEventListener("submit", (event) => { 
    event.preventDefault(); 
    const title = document.getElementById('title').value; 
    const type = document.getElementById('types').value; 
    const store = document.getElementById('store').value; 
    const price = document.getElementById('price').value; 
    const coh = document.getElementById('coh').value; 

    
    form.onsubmit=  handleSubmit(title, type, store, price, coh ).then((res) => { 
      buildTable(res, 'create'); 
  }); 

   }); 
}


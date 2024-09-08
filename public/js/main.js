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

const handleDelete = async (title) => {
  const body = JSON.stringify({
    "title": title
  }); 
  await fetch('/api/deletePurchase', {
    method: 'POST', 
    body
  }); 



}
const handleUpdate = async (title, newTitle, newType, newStore, newPrice, newCoh) => { 
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
const buildTable = (res) => { 
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
      editButton.addEventListener('click', (event) =>{
        console.log(resultTitle.innerHTML); 
        handleEditClick(event, resultTitle.innerHTML, resultCategory.innerHTML, resultStore.innerHTML, resultPrice.innerHTML, resultCOH.innerHTML);
      }); 

}
const handleEditClick = (event, oldTitle, category, store, price, coh, ) => { 
  event.preventDefault(); 
  const modal = document.getElementById('deleteDialog'); 
  const oldType = document.getElementById('types').value; 
  const oldStore = document.getElementById('store').value; 
  const oldPrice = document.getElementById('price').value; 
  const oldCOH = document.getElementById('coh').value; 




  document.getElementById('updatetitle').value = oldTitle; 
  document.getElementById('updatetypes').value = category;
  document.getElementById('updatestore').value = store; 
  document.getElementById('updateprice').value = price; 
  document.getElementById('updatecoh').value = coh;  
  console.log("the old title was", oldTitle); 
  modal.showModal();
  const buttonUpdate = document.getElementById('submitUpdates'); 
  buttonUpdate.addEventListener('click', (event) => {
  event.preventDefault();
          
  const newtitle = document.getElementById('updatetitle').value; 
  const newType = document.getElementById('updatetypes').value; 
  const newStore =  document.getElementById('updatestore').value; 
  const newPrice = document.getElementById('updateprice').value; 
  const newCoh = document.getElementById('updatecoh').value; 
  handleUpdate(oldTitle, newtitle, newType, newStore, newPrice, newCoh); 
 
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
      buildTable(res); 


      
      
      // editButton.onclick = () => { 
     
      //   const deleteButton = document.getElementById('deleteButton');


       

      // }
      // deleteButton.addEventListener('click', (event) => { 
      //   console.log('dkkdkd'); 

      //   event.preventDefault();
      //   handleDelete(title); 
      // }); 
  }); 

   }); 
}


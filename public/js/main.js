// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#exercise' ),
        input2 = document.querySelector('#reps'),
        input3 = document.querySelector('#sets'),
        json = { exercise: input.value,  reps: input2.value, sets: input3.value, },
        body = JSON.stringify( json )


  const response = await fetch( '/submit', {
    method:'POST',
    body
  })

  const text = await response.json()
  console.log( 'text:', text )

  //Resets the values in the inputs
  document.getElementById('exercise').value = ""
  document.getElementById('reps').value = ""
  document.getElementById('sets').value = ""
  document.getElementById('exercise').focus();

  buildTable(text) //to build the table
}

//This builds the table
function buildTable(text){
  const table = document.getElementById('results')
  while (table.firstChild) {
    table.removeChild(table.firstChild)
  }
  
  text.data.forEach((rowData, index) =>{
    const row = document.createElement('tr');
    
    const exerciseCell = document.createElement('td')
    exerciseCell.textContent = rowData.exercise

    const repsCell = document.createElement('td')
    repsCell.textContent = rowData.reps

    const setsCell = document.createElement('td')
    setsCell.textContent = rowData.sets

    const editCell = document.createElement('td')
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit';
    //editButton.onclick = edit

    const deleteCell = document.createElement('td')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete';
    
    
    console.log(rowData)
    deleteButton.onclick = function() {
      deleteRow(index, rowData);
    };

    row.appendChild(exerciseCell)
    row.appendChild(repsCell)
    row.appendChild(setsCell)
    editCell.appendChild(editButton)
    deleteCell.appendChild(deleteButton)
    row.appendChild(editCell)
    row.append(deleteCell)

    table.appendChild(row)
  })
}

const deleteRow = async function(row){
  console.log('Delete Row ' + row)
  const response = await fetch( '/delete', {
    method:'POST',
    body: JSON.stringify({index: row})
  })

  const text = await response.json()
  buildTable(text)
}

//this should clear the page
const clearPage = async function(event){
  
  event.preventDefault()

  const response = await fetch( '/clear', {
    method:'POST',
    body: JSON.stringify({obj: 1})
  })

  const text = await response.json()
  console.log( 'text:', text )

  //empties the table
  const table = document.getElementById('results')
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  document.getElementById('exercise').focus();
}

//sets the button functions onload and focuses on the first box
window.onload = function() {
  const submitButton = document.getElementById("submit")
  submitButton.onclick = submit;
  const clearButton = document.getElementById("clear")
  clearButton.onclick = clearPage;
  document.getElementById('exercise').focus();
}
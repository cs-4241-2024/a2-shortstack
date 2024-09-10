// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const inputType = document.querySelector( '#type' ),
        inputDay = document.querySelector( '#day' ),
        inputRating = document.querySelector( '#rating' ),
        json = { type: inputType.value,
                 day: inputDay.value,
                 rating: inputRating.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.json()
  showTable(data);

}

const showTable = function(data) {
  const table = document.querySelector('table') 
  table.innerHTML = ''

  data.forEach ( item => {
        const tr = document.createElement('tr') 
        const td0 = document.createElement('td')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        
        td0.innerText = table.rows.length + 1
        tr.appendChild(td0)
        td1.innerText = item.type
        tr.appendChild(td1)
        td2.innerText = item.day
        tr.appendChild(td2)
        td3.innerText = item.rating
        tr.appendChild(td3)
        td4.innerText = item.meaning
        tr.appendChild(td4)

        table.appendChild(tr)
      })
}


const deleteRow = async function( event ) {
  event.preventDefault()

  const inputRow = document.querySelector( '#row' ),
        json = { row: inputRow.value },
        body = JSON.stringify( json )

  const response = await fetch( '/delete', {
    method:'DELETE',
    body 
  })

  const data = await response.json()
  showTable(data)
}

const update = async function( event ) {
  event.preventDefault()

  const inputRow = document.querySelector( '#rowEdit' ),
        inputType = document.querySelector( '#typeEdit' ),
        inputDay = document.querySelector( '#dayEdit' ),
        inputRating = document.querySelector( '#ratingEdit' ),
        json = { row: inputRow.value,
                 type: inputType.value,
                 day: inputDay.value,
                 rating: inputRating.value },
        body = JSON.stringify( json )

  const response = await fetch( '/patch', {
    method:'PATCH',
    body 
  })

  const data = await response.json()
  showTable(data)
}

window.onload = function() {
  const button = document.querySelector("#submit");
  button.onclick = submit;

  const button2 = document.querySelector("#delete");
  button2.onclick = deleteRow;

  const button3 = document.querySelector("#update");
  button3.onclick = update;
}
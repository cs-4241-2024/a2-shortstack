// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const inputType = document.querySelector( '#type' ),
        inputDay = document.querySelector( '#day' ),
        inputRating = document.querySelector( '#rating' )
        json = { type: inputType.value,
                 day: inputDay.value,
                 rating: inputRating.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.json()

  const table = document.querySelector('table') 
  table.innerHTML = ''

  data.forEach ( item => {
        const tr = document.createElement('tr') 
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')

        td1.innerText = item.type
        tr.appendChild(td1)
        td2.innerText = item.day
        tr.appendChild(td2)
        td3.innerText = item.rating
        tr.appendChild(td3)
        td4.innerText = item.meaning
        tr.appendChild(td4)

        table.appendChild (tr)
      })
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}
// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const name = document.querySelector('#name'),
        date = document.querySelector('#date'),   
        sold = document.querySelector('#sold'),     
        capacity = document.querySelector('#capacity'),    
        json = { name: name.value, date: date.value, sold: parseInt(sold.value), capacity: parseInt(capacity.value)},
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const data = await response.json()

  const tbody = document.querySelector("tbody")
        tbody.innerHTML = ''

  data.forEach(function(event) {
    const row = document.createElement('tr')
    row.innerHTML = '<td>' + event.name + '</td><td>' + event.date + '</td><td>' + event.sold + '</td><td>' + event.capacity + '</td><td>' + event.status + '</td>'
    tbody.appendChild(row)
  });
}

window.onload = function() {
   const button = document.querySelector("button")
  button.onclick = submit
}
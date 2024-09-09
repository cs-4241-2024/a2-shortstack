// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const wo = document.querySelector( 'input[name="wout"]:checked' ),
        dat = document.querySelector( "#date"),
        st = document.querySelector( "#stime"),
        et = document.querySelector( "#etime"),
        form = document.querySelector("form"),
        json = { workout: wo.value, date: dat.value, stime: st.value, etime: et.value},
        body = JSON.stringify( json )
  
  console.log( body )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const values = await response.json()
  updateTable(values)
  
  // form.reset()
}

function updateTable(values){
  const tbody = document.querySelector('tbody')

  tbody.innerHTML = ''
  values.forEach(value => {
    const [sh, sm] = value.stime.split(":"),
          [eh, em] = value.etime.split(":"),
          h = eh - sh,
          m = em - sm
    
    const element = document.createElement('tr'),
          del = document.createElement('button')
    
    del.innerText = 'Delete'
    del.addEventListener("click", async function(){
      const response = await fetch('/delete', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      
      window.onload()
     
    })
    
    element.innerHTML = `<td>${value.workout}</td>
                       <td>${value.date}</td>
                       <td>${value.stime}</td>
                       <td>${value.etime}</td>
                       <td>${h * 60 + m}</td>`
    
    const td = document.createElement('td').appendChild(del)
    element.appendChild(td)
    tbody.appendChild( element )
  })
  
}


window.onload = async function() {
  
  const response = await fetch( '/gets' )
  
  const values = await response.json()
  
  updateTable(values)
  
  const button = document.querySelector("button");
  button.onclick = submit;
}

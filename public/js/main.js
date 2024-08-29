// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const name = document.querySelector( '#name' ),
        message = document.querySelector( '#message' ),
        json = { name: name.value, message: message.value },
        body = JSON.stringify( json )

  if (name.value === "" || message.value === "") {
    alert("Please fill out both fields.")
    return
  }

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  let res = await response.json()
  let output = document.getElementById("response");
  let li = document.createElement("li");
  
  console.log(res)
  li.textContent = `${res.name}, ${res.message}`;
  output.appendChild(li);
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}
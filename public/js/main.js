// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  //collecting the form input
  const nameInput = document.querySelector( '#name' );
  const debutInput = document.querySelector( '#debut' );
  const colorInput = document.querySelector( '#color' );

  const json = { 
    name: nameInput.value,
    debut: debutInput.value, //parse?? parseInt(debutInput.value)
    color: colorInput.value 
  };
  
  const body = JSON.stringify( json );

  //sending req
  const response = await fetch( '/submit', {
    method:'POST',
    body, 
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json()

  const ul = document.querySelector('ul')
  ul.innerHTML = ''

  data.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `Name: ${item.name}, Debut: ${item.debut}, Color: ${item.color}, Existence: ${item.existence}`;
    ul.appendChild(li);
  });

  nameInput.value = '';
  debutInput.value = '';
  colorInput.value = '';
};

const deleteButton = async function( event ) {

}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
};
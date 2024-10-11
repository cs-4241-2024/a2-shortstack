// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' )
  const json = { 'str' : input.value }
  const body = JSON.stringify( json )
  
  const response = await fetch( '/submit', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body : body
  })

  const text = await response.text()

  console.log( 'text:', text )
  updateFriends()
}

const delete_name = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#editname' )
  const json = { 'str' : input.value }
  const body = JSON.stringify( json )
  
  const response = await fetch( '/delete', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body : body
  })

  const text = await response.text()

  console.log( 'text:', text )
  updateFriends()
}

function updateFriends(){
  fetch('/data').then(response => response.json()).then(data => {
    const friendList = document.getElementById('friend-list');
    friendList.innerHTML = '';
    const headrow = document.createElement('tr');
    
    const headname = document.createElement('td');
    headname.className = "top-row";
    headname.textContent = 'Name';
    headrow.appendChild(headname);

    const heademail = document.createElement('td');
    heademail.className = "top-row";
    heademail.textContent = 'Email';
    headrow.appendChild(heademail);

    const headphone = document.createElement('td');
    headphone.className = "top-row";
    headphone.textContent = 'Phone';
    headrow.appendChild(headphone);

    const headgrade = document.createElement('td');
    headgrade.className = "top-row";
    headgrade.textContent = 'Grade';
    headrow.appendChild(headgrade);

    friendList.appendChild(headrow)

    data.forEach(s => {
      const trow = document.createElement('tr');

      const tname = document.createElement('td');
      tname.className = "h-row";
      tname.textContent = s.name;
      trow.appendChild(tname);
  
      const temail = document.createElement('td');
      temail.className = "h-row";
      temail.textContent = s.email;
      trow.appendChild(temail)

      const tnumber = document.createElement('td');
      tnumber.className = "h-row"
      tnumber.textContent = s.phone;
      trow.appendChild(tnumber)

      const tgrade = document.createElement('td');
      tgrade.className = "h-row"
      tgrade.textContent = s.grade;
      trow.appendChild(tgrade)
    
      friendList.appendChild(trow)
    })
  })
}

window.onload = function() {
  updateFriends()
  //const button = document.querySelector("button");
  const submitButton = document.querySelector('#add-button')
  const deleteButton = document.querySelector('#delete-button')
  submitButton.onclick = submit;
  deleteButton.onclick = delete_name;
}

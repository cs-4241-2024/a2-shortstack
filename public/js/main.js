// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  /*
  const input = document.querySelector( '#yourname' ),
        json = { yourname: input.value },
        body = JSON.stringify( json )
  */
  const nameInput = document.querySelector('#yourName').value;
  const titleInput = document.querySelector('#showTitle').value;
  const episodeInput = document.querySelector('#lastWatched').value;

  const input = {
    username: nameInput,
    showName: titleInput,
    lastViewed: episodeInput
  };

  const body = JSON.stringify(input);

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  });

  const data = await response.json()

  data.forEach( d => console.log(d) );

  fetchAppData();
}


const displayCards = function(data) {

  const cardContainer = document.querySelector("#cardContainer");
  cardContainer.innerHTML = '';

  data.forEach(entry => {
    const card = document.createElement('div');
    card.classList.add('card');  

    card.innerHTML = `
    <h3>${entry.username}</h3>
    <hr class="solidLine"> 
    <p><strong>Show Title:</strong> ${entry['show title']}</p>
    <p><strong>Last Episode Watched:</strong> ${entry['last ep watched']}</p>
    <p><strong>Date Logged:</strong> ${entry['date logged']}</p>
    <button class="delete-button">Delete</button>
    `;

    const deleteButton = card.querySelector('.delete-button');
    deleteButton.addEventListener('click', deleteCard);

    cardContainer.appendChild(card); 
  })

}

const deleteCard = async function(event) {
  const button = event.target;
  const card = button.closest('.card');
  const username = card.querySelector('h3').textContent;
  const showTitle = card.querySelector('p').textContent.split(': ')[1];

  const response = await fetch('/submit', {
    method: 'DELETE',
    body: JSON.stringify({ username, showTitle })
  });

  const data = await response.json();
  fetchAppData();
}

const fetchAppData = async function() {
  const response = await fetch('/appdata');
  const data = await response.json();
  displayCards(data);
  console.log(data);
}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;

  fetchAppData();
}


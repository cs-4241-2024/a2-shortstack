// FRONT-END (CLIENT) JAVASCRIPT HERE

// Global Variable Score
let score = 0;
let table = document.createElement('table')
// table add row
table.appendChild(document.createElement('tr')).appendChild(document.createElement('th')).appendChild(document.createTextNode('Name')).parentNode.parentNode.appendChild(document.createElement('th')).appendChild(document.createTextNode('Score'))

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#yourname' ),
        json = { name: input.value, points: score },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })


  // Why does this promise break everything
  // const data = await response.json()


  // How to fetch from response instead
  createNewRow(json.name, json.points)
  console.log( 'data:', data )
}



const incrementScore = function(event) {
  event.preventDefault();
  score += 1;

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = score;

};

const createNewRow = function (name, score) {
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.textContent = name;
  row.appendChild(nameCell);
  const scoreCell = document.createElement('td');
  scoreCell.textContent = score;
  row.appendChild(scoreCell);
  table.appendChild(row);
}

window.onload = function() {
   const button = document.getElementById("submit");
  button.onclick = submit;

  const scoreButton = document.getElementById("scoreButton")
  scoreButton.onclick=incrementScore;

  const tableDiv = document.getElementById('tableDiv')
    tableDiv.appendChild(table)

  createNewRow('Jeremy',1000)
}

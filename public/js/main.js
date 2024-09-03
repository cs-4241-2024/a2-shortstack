// FRONT-END (CLIENT) JAVASCRIPT HERE

// Global Variable Score
let score = 0;
// let table = document.createElement('table')
// table add row
// table.appendChild(document.createElement('tr')).appendChild(document.createElement('th')).appendChild(document.createTextNode('Name')).parentNode.parentNode.appendChild(document.createElement('th')).appendChild(document.createTextNode('Score'))

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
  const jsonData = await response.json()

  // Why does this promise break everything
  // const data = await response.json()

  table.innerHTML = ''
  // How to fetch from response instead
  generateTable(jsonData)
  // console.log( 'data:', data )
}



const incrementScore = function(event) {
  event.preventDefault();
  score += 1;

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = score;

};
const generateTable = function(jsonData) {
  jsonData.forEach((data) =>createNewRow(data.name, data.points))
}
const createNewRow = function (name, score) {
  let tableElement = document.getElementById('table')
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.textContent = name;
  row.appendChild(nameCell);
  const scoreCell = document.createElement('td');
  scoreCell.textContent = score;
  row.appendChild(scoreCell);
  tableElement.appendChild(row);
}

window.onload = async function() {
   const button = document.getElementById("submit");
  button.onclick = submit;

  const scoreButton = document.getElementById("scoreButton")
  scoreButton.onclick=incrementScore;

  const input = document.querySelector( '#yourname' ),
      json = { name: input.value, points: score },
      body = JSON.stringify( json )
  const response = await fetch( '/getData', {
    method:'POST',
    body
  })

  const jsonData = await response.json()
  generateTable(jsonData)

}

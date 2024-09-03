// FRONT-END (CLIENT) JAVASCRIPT HERE

// Global Variable Score
let clicks = 0;
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
        json = { name: input.value, clickCount: clicks},
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })
  const jsonData = await response.json()

  // Why does this promise break everything
  // const data = await response.json()
  let table = document.getElementById('table')
  table.innerHTML = ''
  // How to fetch from response instead
  generateTable(jsonData)
  // console.log( 'data:', data )
}



const incrementScore = function(event) {
  event.preventDefault();
  clicks += 1;

  const scoreElement = document.getElementById('clickCounter');
  scoreElement.textContent = clicks;

};
const generateTable = function(jsonData) {
  jsonData.forEach((data) =>createNewRow(data.name, data.clickCount, data.points))
}
const createNewRow = function (name, clicks, score) {
  let tableElement = document.getElementById('table')
  tableElement.appendChild(document.createElement('tr')).appendChild(document.createElement('th')).appendChild(document.createTextNode('Name')).parentNode.parentNode.appendChild(document.createElement('th')).appendChild(document.createTextNode('Times Clicked')).parentNode.parentNode.appendChild(document.createElement('th')).appendChild(document.createTextNode('Score'))
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.textContent = name;
  row.appendChild(nameCell);
  const countCell = document.createElement('td');
  countCell.textContent = clicks;
  row.appendChild(countCell);
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
      json = { name: input.value, clickCount: clicks },
      body = JSON.stringify( json )
  const response = await fetch( '/getData', {
    method:'POST',
    body
  })

  const jsonData = await response.json()
  generateTable(jsonData)

}

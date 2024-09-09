// FRONT-END (CLIENT) JAVASCRIPT HERE

let text = []; // So I am able to call text in the showData function, makes text global

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const dateInput = document.querySelector( '#date' )
  const entryInput = document.querySelector( '#entry' )
  const happinessInput = document.querySelector( '#happiness')
  const motivationInput = document.querySelector( '#motivation')
  const goodDayCalc = goodDay() 

  const taskInput = "add"
        json = { 
          date: dateInput.value,
          entry: entryInput.value,
          happiness: happinessInput.value,
          motivation: motivationInput.value,
          goodDay: goodDayCalc,
          task: taskInput
        },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  text = await response.json()

}

window.onload = function() {
  const secondButton = document.querySelector("#pastEntries");
  secondButton.onclick = beforeSubmit;
  const button = document.querySelector("#button");
  button.onclick = submit;
  const thirdButton = document.querySelector('#deleteButton');
  thirdButton.onclick = deleteTask;

  // button.click(); 
}

const beforeSubmit = async function( event ) 
{
  const taskInput = "leave"
    json = { 
      task: taskInput
    },
    body = JSON.stringify( json )
    const response = await fetch( '/beforeSubmit', 
      {
        method:'POST',
        body 
      })
    text = await response.json()
    showData()
}

const deleteTask = async function( event )
{
  event.preventDefault()
  const dateDeleteInput = document.querySelector('#deleteDates')
  
  const taskInput = "delete"
  
  json = { 
    deleteDate: dateDeleteInput.value,
    task: taskInput
  },

  body = JSON.stringify(json)

  const response = await fetch( '/deleteTask',
    {
      method: 'POST',
      body
    }
  )
  text = await response.json()
}


function showData()
{
  table = document.getElementById("dataTbl");
  const tbody = document.createElement("tbody");

  for(let i = 0; i <text.length; i++)
  {
    const row = document.createElement("tr");

    const cellDate = document.createElement("td");
    const cellEntry = document.createElement("td");
    const cellHappiness = document.createElement("td");
    const cellMotivation = document.createElement("td");
    const cellGoodDay = document.createElement("td");

    const cellTextDate = document.createTextNode(text[i].date);
    const cellTextEntry = document.createTextNode(text[i].entry);
    const cellNumberHappiness = document.createTextNode(text[i].happiness);
    const cellNumberMotivation = document.createTextNode(text[i].motivation);
    const cellTextGoodDay = document.createTextNode(text[i].goodDay);
    
    cellDate.appendChild(cellTextDate)
    cellEntry.appendChild(cellTextEntry)
    cellHappiness.appendChild(cellNumberHappiness)
    cellMotivation.appendChild(cellNumberMotivation)
    cellGoodDay.appendChild(cellTextGoodDay)

    row.appendChild(cellDate);
    row.appendChild(cellEntry);
    row.appendChild(cellHappiness);
    row.appendChild(cellMotivation);
    row.appendChild(cellGoodDay);

    tbody.appendChild(row);
  }
  
  generateTable(table,text);
}

function generateTable(table, text) {
  table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());
  for (let element of text) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function goodDay()
  {
    let goodDay = "no";
    const happinessInput = document.querySelector( '#happiness').value
    const motivationInput = document.querySelector( '#motivation').value
    if(parseInt(happinessInput)+parseInt(motivationInput)>=6)
    {
      goodDay="yes";
    }
    return goodDay
  }


  
// element sections
//css elements
//css styles
//

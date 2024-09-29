
  
const submit = async function( event ) {

  event.preventDefault()
  

  const input = document.querySelector( '#name' )  
  const input2 = document.querySelector ('#musical' )
  const input3 = document.querySelector ('#songs')
  const input4 = document.querySelector ('#role')

  
    const json = { name: input.value, musical: input2.value, 
                  songs: input3.value }
    const body = JSON.stringify( json )

    console.log("Submitting data:", json);

  const response = await fetch( '/submit', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
      
  const text = await response.json()  
  clearTable();
  generateTable(text);


  
  const element = document.createElement('p')
  document.body.appendChild( element )

}

function clearTable() {
  const currentTable = document.querySelector('table');
  if (currentTable){
    currentTable.remove();
    
  }
}



async function deleteCharacter(name){
  const response = await fetch('/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
    });
  
  if (response.ok){
    const newData = await response.json();
    updated(newData);
    
  } else {
    console.error("Issue of deletion");
  }
};
    
  function calculateRole(ranking){
    

  console.log("Ranking: " +  ranking);

    if (ranking > 0 && ranking < 2){
      return "Ensemble";
     } else if (ranking >= 2 && ranking < 3){
      return "Secondary Character";
    } else if (ranking >= 3){
        return "Lead";
    } else {
        return "Invalid Input";
    } 
  }
    





function generateTable(text) {
  let tbl = document.querySelector("#dataTable");
  
  if (!tbl) {
    tbl = document.createElement("table");
    tbl.id = "dataTable";
    tbl.style.borderCollapse = "collapse";
    tbl.style.border = "2px solid black";

    const tableHeader = document.createElement("thead");
    const hRow = document.createElement("tr");
    const headers = ["Name", "Musical", "Songs", "Role", "Delete?"];

    headers.forEach(headerText => {
      const th = document.createElement("th");
      th.textContent = headerText;
      th.style.border = "1px solid black";
      th.style.padding = "5px";
      hRow.appendChild(th);
    });

    tableHeader.appendChild(hRow);
    tbl.appendChild(tableHeader);
    document.body.appendChild(tbl);
  }

  let tblBody = document.querySelector("#dataTable tbody");
  if (!tblBody) {
    tblBody = document.createElement("tbody");
    tbl.appendChild(tblBody);
  } else {
    tblBody.innerHTML = ""; // Clear existing rows
  }

  text.forEach(item => {
    const row = document.createElement("tr");
    
    // CREATE COLUMN FOR NAMES
    const cellName = document.createElement("td");
    cellName.textContent = item.name;
    cellName.style.border = "1px solid black";
    row.appendChild(cellName);

    // CREATE COLUMN FOR MUSICAL TITLE
    const cellMusical = document.createElement("td");
    cellMusical.textContent = item.musical;
    cellMusical.style.border = "1px solid black";
    row.appendChild(cellMusical);

    // CREATE COLUMN FOR SONGS
    const cellSongCount = document.createElement("td");
    cellSongCount.textContent = item.songs;
    cellSongCount.style.border = "1px solid black";
    row.appendChild(cellSongCount);

    // CREATE COLUMN FOR ROLE
    const cellRole = document.createElement("td");
    cellRole.textContent = calculateRole(item.songs);
    cellRole.style.border = "1px solid black";
    row.appendChild(cellRole);

    // DELETE BUTTON
    const cellActions = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
      deleteCharacter(item.name);
      console.log("Deletion.");
      console.log(text);
    };

    cellActions.appendChild(deleteButton);
    row.appendChild(cellActions);

    tblBody.appendChild(row);
  });
}



function updated(text){
  clearTable();
  generateTable(text);
}


const preWrite = [
  { name: "Example Name", musical: "Example: The Musical", songs: 3 },
];


// when the window loads, make sure the button is hanging out
window.onload = function() {
  const button = document.querySelector("#btnSubmit");
  button.onclick = submit;    
  


}
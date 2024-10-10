
  
const submit = async function( event ) {

  event.preventDefault()
  

  const input = document.querySelector( '#name' )  
  const input2 = document.querySelector ('#musical' )
  const input3 = document.querySelector ('#songs')
  const input4 = document.querySelector ('#role')


  
    const json = { name: input.value, musical: input2.value, songs: input3.value }
    const body = JSON.stringify( json )

    console.log("Submitting data:", json);

  const response = await fetch( '/submit', {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
      
  // make the text array
  const text = await response.json()  
  
  // clear whatever used to exist & regenerate that nonsense
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


async function deleteCharacter(name) {
  try {
    const response = await fetch('/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }) 
    });

    if (response.ok) {
      const updatedList = await response.json();  

      // Check if the updated list is an array
      if (Array.isArray(updatedList)) {
        updated(updatedList);  
      } else {
        console.error("Error. Expected an array but got ", updatedList);
      }
    } else {
      console.error("Issue during deletion:", await response.text());
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


async function updateCharacter(oldName, updatedData) {
  try {
    const response = await fetch('/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldName, updatedData })
    });

    if (!response.ok) {
      throw new Error(`Error updating data: ${response.statusText}`);
    }

    const updatedList = await response.json(); 
    console.log("Updated list:", updatedList);
    return updatedList;
  } catch (error) {
    console.error("Error updating data:", error);
  }
}




    
  function calculateRole(ranking){
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
      const headers = ["Name", "Musical", "Songs", "Role", "Actions"];
  
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
      tblBody.innerHTML = ""; // clear existing rows
    }
  
    // make! your! rows!
    text.forEach(item => {
      const row = document.createElement("tr");
  
      // don't add username/passwords to the printing
      if (item.password) {
        return;  
      }
  
      // CREATE COLUMN FOR NAMES
      const cellName = document.createElement("td");
      const nameInput = document.createElement("input");
      nameInput.value = item.name;
      nameInput.disabled = true; // Initially disabled
      cellName.appendChild(nameInput);
      cellName.style.border = "1px solid black";
      row.appendChild(cellName);
  
      // CREATE COLUMN FOR MUSICAL TITLE
      const cellMusical = document.createElement("td");
      const musicalInput = document.createElement("input");
      musicalInput.value = item.musical;
      musicalInput.disabled = true; // Initially disabled
      cellMusical.appendChild(musicalInput);
      cellMusical.style.border = "1px solid black";
      row.appendChild(cellMusical);
  
      // CREATE COLUMN FOR SONGS
      const cellSongCount = document.createElement("td");
      const songsInput = document.createElement("input");
      songsInput.type = "number";
      songsInput.value = item.songs;
      songsInput.disabled = true; // Initially disabled
      cellSongCount.appendChild(songsInput);
      cellSongCount.style.border = "1px solid black";
      row.appendChild(cellSongCount);
  
      // CREATE COLUMN FOR ROLE
      const cellRole = document.createElement("td");
      cellRole.textContent = calculateRole(item.songs);
      cellRole.style.border = "1px solid black";
      row.appendChild(cellRole);
  
      // ACTIONS COLUMN
      const cellActions = document.createElement("td");
      


      // Edit Button
const editButton = document.createElement("button");
editButton.textContent = "Edit";

editButton.onclick = function () {
  console.log("Is this thing on?")

    const isDisabled = nameInput.disabled;

    nameInput.disabled = !isDisabled;
    musicalInput.disabled = !isDisabled;
    songsInput.disabled = !isDisabled;


    if (isDisabled) {
        editButton.textContent = "Save"; 
        console.log("Changed to save.");
    } else {
        editButton.textContent = "Edit";

        // Create an updated data object
        const updatedData = {
            name: nameInput.value,
            musical: musicalInput.value,
            songs: Number(songsInput.value) // Ensure songs is a number
        };

        console.log("Update the value.");
        console.log(updatedData);

        updateCharacter(item.name, updatedData).then(updatedList => {
            updated(updatedList); 
            
        }).catch(error => {
            console.error("Error updating character:", error); 
        });
    }
};

cellActions.appendChild(editButton);

  
      // DELETE BUTTON
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function() {
        deleteCharacter(item.name);  // Call deleteCharacter on click
      };
      
      cellActions.appendChild(deleteButton);
      row.appendChild(cellActions);
  
      tblBody.appendChild(row);
    });
  }
  
  async function saveChanges(oldName, updatedData) {
    try {
        const response = await fetch('/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldName, updatedData })
        });

        if (!response.ok) {
            throw new Error(`Error updating data: ${response.statusText}`);
        }

        // Get the updated list from the server
        const updatedList = await response.json(); 
        console.log("Updated list:", updatedList);
        
        // Update the table with the new list
        updated(updatedList); 
    } catch (error) {
        console.error("Error updating data:", error);
    }
}

  
  


function updated(data) {
  clearTable();  
  generateTable(data);  
}


const preWrite = [
  { name: "Example Name", musical: "Example: The Musical", songs: 3 },
];


// when the window loads, make sure the button is hanging out
window.onload = function() {
  const button = document.querySelector("#btnSubmit");
  button.onclick = submit;    
  


}
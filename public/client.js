const submit = async function(event) {
  event.preventDefault(); // Prevent the default form submission


  const input = document.querySelector('#name');  
  const input2 = document.querySelector('#musical');
  const input3 = document.querySelector('#songs');

  const json = { name: input.value, musical: input2.value, songs: input3.value };
  const body = JSON.stringify(json);

  const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Add headers to specify the content type
      body
  });
  
  if (!response.ok) {
      console.error('Error:', response.statusText);
      return; // Handle the error
  }

  const text = await response.json();
  generateTable(text);

};



function generateTable(text) {
  let tbl = document.querySelector("#dataTable");
  
  if (!tbl) {
    tbl = document.createElement("table");
    tbl.id = "dataTable";
    tbl.style.borderCollapse = "collapse";
    tbl.style.border = "2px solid black";

    const tableHeader = document.createElement("thead");
    const hRow = document.createElement("tr");
    const headers = ["Username", "Name", "Musical", "Songs", "Role", "Delete?"]; // Add "Username" to headers

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

    // CREATE COLUMN FOR USERNAME
    const cellUsername = document.createElement("td");
    cellUsername.textContent = createTextNode(text[j].username);
    cellUsername.style.border = "1px solid black"; // Set border for the cell
    row.appendChild(cellUsername); // Append the username cell to the row

    // CREATE COLUMN FOR NAME
    const cellName = document.createElement("td");
    cellName.textContent = createTextNode(text[j].name);
    cellName.style.border = "1px solid black";
    row.appendChild(cellName);

    // CREATE COLUMN FOR MUSICAL TITLE
    const cellMusical = document.createElement("td");
    cellMusical.textContent = createTextNode(text[j].musical);
    cellMusical.style.border = "1px solid black";
    row.appendChild(cellMusical);

    // CREATE COLUMN FOR SONGS
    const cellSongCount = document.createElement("td");
    cellSongCount.textContent = createTextNode(text[j].songs);
    cellSongCount.style.border = "1px solid black";
    row.appendChild(cellSongCount);
   sdkfjdkf
    // CREATE COLUMN FOR ROLE
    const cellRole = document.createElement("td");
    cellRole.textContent = calculateRole(createTextNode(text[j].songs));
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




// Attach the submit event listener to the form
window.onload = function() {
  const form = document.querySelector("#rankingForm");
  form.onsubmit = submit;    
};

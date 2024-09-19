/**
 * Formats a log message to include message source.
 * 
 * @param {string} src Message source.
 * @param {string} message Base log message.
 * @returns Formatted log message.
 */
const formatLog = function(src, message)
{
  return `[${src.toUpperCase()}] → ${message}`;
}

/**
 * Handler for user input submission.
 * 
 * @param {*} event Event object.
 */
const submit = async function(event)
{
  // Prevent browser from loading a new page
  event.preventDefault();
  
  // Get data from form
  const lt_id        = document.querySelector("#id");
  const lt_firstname = document.querySelector("#firstname");
  const lt_lastname  = document.querySelector("#lastname");

  // Convert data to JSON
  const json = {id: lt_id.value, firstname: lt_firstname.value, lastname: lt_lastname.value};
  const body = JSON.stringify(json);
  
  // Send POST request
  const response = await fetch("/submit", {method:"POST", body});
  const text     = await response.text();

  if (response.ok)
  {
    // Refresh table if OK
    refreshTable();
  }
  else
  {
    // Alert window if error
    window.alert(`ERROR: ${response.statusText}`);
  }

  // DEBUG: Log user input
  // console.log(formatLog("SUBMIT", `User input: ${text}`));
}

/**
 * Translates table header ids to text to use as titles.
 * 
 * @param {string} id Table header id.
 * @returns Interpreted table header.
 */
const tableID = function(id)
{
  switch (id)
  {
  case "id":
    return "Laptop ID";
  
  case "firstname":
    return "First Name";
  
  case "lastname":
    return "Last Name";

  case "dup":
    return "Duplicate Client?"

  default:
    return "Unknown";
  }
}

/**
 * To trigger on a button click, removes the corresponding table.
 * 
 * @param {*} btn Button object.
 */
const btnFcn = async function(btn)
{ 
  // Get corresponding laptop ID
  let button = document.querySelector(`#${btn.currentTarget.id}`);
  let row = button.parentNode.parentNode;
  let laptopID = parseInt(row.cells[0].innerText);
  
  // Convert to JSON
  let json = {id: laptopID};
  let body = JSON.stringify(json);

  // Send POST request
  let response = await fetch("/remove", {method:"POST", body});

  if (response.ok)
  {
    // Refresh table if OK
    refreshTable();
  }
}

const btnFcnTEST = async function(btn)
{ 
  // Send POST request
  let response = await fetch("/test", {method:"POST"});

  if (response.ok)
  {
    console.log("test post response ok");
  }
}

/**
 * Refresh active loan table (replace with version most up-to-date with server).
 */
const refreshTable = async function()
{
  // Reference: https://www.geeksforgeeks.org/javascript-fetch-method/
  let tableData;

  // Get data from server
  await fetch("/table").then(response => response.json()).then(data =>
    {
      tableData = data;
      // console.log(tableData);
    }
  );

  // Reference: https://stackoverflow.com/questions/27594957/how-to-create-a-table-using-a-loop
  let newTable = document.createElement("table");
  let tr, th, td, row, col, btn;

  // Get row and column count of table
  let rowCount = tableData.length - 1;
  let colCount = (rowCount > 0) ? (Object.keys(tableData[0]).length + 1) : 5;

  newTable.id = "laptops";
  
  // Rebuild headers
  tr = document.createElement("tr");
  for (col = 0; col < colCount; col++)
  {
    th = document.createElement("th");
    if (col !== colCount - 1)
    {
      th.textContent = tableID(Object.keys(tableData[0])[col]);
    }
    else
    {
      th.className = "removecol";
    }
    tr.appendChild(th);
  }

  newTable.appendChild(tr);

  // Build new data rows
  for (row = 1; row <= rowCount; row++)
  {
    tr = document.createElement("tr");
    for (col = 0; col < colCount; col++)
    {
      td = document.createElement("td");
      
      switch(col)
      {
      case 0:
        td.textContent = tableData[row].id;
        break;

      case 1:
        td.textContent = tableData[row].firstname;
        break;

      case 2:
        td.textContent = tableData[row].lastname;
        break;

      case 3:
        td.textContent = (tableData[row].dup === true) ? "Yes" : "No";
        break;

      // Add remove button to each row
      case 4:
        btn = document.createElement("button");
        btn.id = `removebtn-${row}`;
        btn.textContent = "Remove";
        btn.className = "removebtn";
        btn.onclick = btnFcn;
        td.className = "removecol";
        td.appendChild(btn);
        break;

      default:
        td.textContent = "No such attribute.";
        break;
      }

      tr.appendChild(td);
    }
    newTable.appendChild(tr);
  }

  // Replace existing table
  document.querySelector("#laptops").replaceWith(newTable);
}

/**
 * Set button click action to submit function.
 */
window.onload = function()
{
  // Set submit function
  const button = document.querySelector("button");
  button.onclick = submit;

  // Set refresh function
  const refreshBtn = document.getElementById("rfrsh");
  refreshBtn.onclick = refreshTable;

  // Set test function
  const testBtn = document.getElementById("testbtn");
  testBtn.onclick = btnFcnTEST;

  // Init table
  refreshTable();
}
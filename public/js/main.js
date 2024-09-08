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
  
  const lt_id        = document.querySelector("#id");
  const lt_firstname = document.querySelector("#firstname");
  const lt_lastname  = document.querySelector("#lastname");


  const json = {id: lt_id.value, firstname: lt_firstname.value, lastname: lt_lastname.value};
  const body = JSON.stringify(json);
  
  const response = await fetch("/submit", {method:"POST", body});
  const text     = await response.text();

  if (response.ok)
  {
    refreshTable();
  }

  console.log(formatLog("SUBMIT", `User input: ${text}`));
}

const tableID = function(id)
{
  switch (id)
  {
  case "id":
    return "ID";
  
  case "firstname":
    return "First Name";
  
  case "lastname":
    return "Last Name";

  default:
    return "Unknown";
  }
}

const refreshTable = async function()
{
  // Reference: https://www.geeksforgeeks.org/javascript-fetch-method/
  let tableData;
  await fetch("/table").then(response => response.json()).then(data =>
    {
      tableData = data;
      // console.log(tableData);
    }
  );

  // Reference: https://stackoverflow.com/questions/27594957/how-to-create-a-table-using-a-loop
  let newTable = document.createElement("table");
  let tr, th, td, row, col;

  let rowCount = tableData.length;
  let colCount = Object.keys(tableData[0]).length;

  newTable.id = "laptops";
  
  tr = document.createElement("tr");
  for (col = 0; col < colCount; col++)
  {
    th = document.createElement("th");
    th.textContent = tableID(Object.keys(tableData[0])[col]);
    tr.appendChild(th);
  }

  newTable.appendChild(tr);

  for (row = 1; row <= rowCount; row++)
  {
    tr = document.createElement("tr");
    for (col = 0; col < colCount; col++)
    {
      td = document.createElement("td");
      
      switch(col)
      {
      case 0:
        td.textContent = tableData[row-1].id;
        break;

      case 1:
        td.textContent = tableData[row-1].firstname;
        break;

      case 2:
        td.textContent = tableData[row-1].lastname;
        break;

      default:
        td.textContent = "No such attribute.";
        break;
      }

      tr.appendChild(td);
    }
    newTable.appendChild(tr);
  }

  document.querySelector("#laptops").replaceWith(newTable);
}

/**
 * Set button click action to submit function.
 */
window.onload = function()
{
  const button = document.querySelector("button");
  button.onclick = submit;
  refreshTable();
}
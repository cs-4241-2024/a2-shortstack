// Front-end (client) JavaScript
const deleteEntry = async function (id) {
  console.log(`Attempting to delete entry with ID: ${id}`);
  try {
    const response = await fetch(`/delete/${id}`, { method: "DELETE" });
    if (response.ok) {
      const data = await response.json();
      console.log("Received data:", data);
      displayTab(data);
    } else {
      console.error("Failed to delete entry.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const displayTab = function (dataset) {
  const tabBody = document.querySelector("#body");
  tabBody.innerHTML = "";

  for (const entry of dataset) {
    const row = document.createElement("tr");

    const itemCell = document.createElement("td");
    itemCell.textContent = entry.item;
    row.appendChild(itemCell);

    const priorityCell = document.createElement("td");
    priorityCell.textContent = entry.priority;
    row.appendChild(priorityCell);

    const deadlineCell = document.createElement("td");
    deadlineCell.textContent = entry.deadline;
    row.appendChild(deadlineCell);


    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    //editButton.onclick = () => handleEdit(entry);
    row.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteEntry(entry.id);
    row.appendChild(deleteButton);
    
    tabBody.appendChild(row);
  }

  console.log("Table printed");
};

const submit = async function (event) {
  event.preventDefault();

  const entry = {
    item: document.querySelector("#item").value, // Item to do (string)
    priority: document.querySelector("#priority").value, // Priority (string)
    deadline: document.querySelector("#deadline").value, // Deadline (string)
  };
  const body = JSON.stringify(entry);

  const response = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await response.json();
  if (response.ok) {
    console.log("Received data:", data);
    displayTab(data);
  } else {
    console.error("Failed to submit data.");
  }
};

window.onload = async function () {
  const button = document.querySelector("#submit");
  button.onclick = submit;
};

// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  // Gather the values from the form inputs
  const radius = document.querySelector("#radius").value;
  const depth = document.querySelector("#depth").value;
  const fluid = document.querySelector('input[name="fluid"]:checked').value;

  // Create the data object to send
  const data = {
    radius: parseFloat(radius),
    depth: parseFloat(depth),
    fluid: fluid, // string, either water or oil
  };

  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const table = document.querySelector("#results tbody");
      const row = document.createElement("tr");
      // Create table cells for each column
      const radiusCell = document.createElement("td");
      radiusCell.textContent = data.radius.toFixed(1); // Format to 1 decimal place

      const depthCell = document.createElement("td");
      depthCell.textContent = data.depth.toFixed(1); // Format to 1 decimal place

      const liquidCell = document.createElement("td");
      liquidCell.textContent = data.fluid.charAt(0).toUpperCase() + data.fluid.slice(1); // Capitalize first letter

      const forceCell = document.createElement("td");
      forceCell.textContent = data.force.toFixed(2); // Format to 2 decimal places

      // Append cells to the row
      row.appendChild(radiusCell);
      row.appendChild(depthCell);
      row.appendChild(liquidCell);
      row.appendChild(forceCell);

      // Append the row to the table body
      table.appendChild(row);
    });
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};

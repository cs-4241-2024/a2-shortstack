let toggle = () => {

  let element = document.getElementById("BESTbutton");
  let hidden = element.getAttribute("hidden");

  if (hidden) {
    element.removeAttribute("hidden");
  } else {
    element.setAttribute("hidden", "hidden");
  }
}

const updateTable = function (jsonData) {
  //console.log("MADE IT" + JSON.stringify(jsonData);)
  const table = document.getElementById("myTable");
  table.innerHTML = "<tr> <th> Your new number</th><th>Your wanted calculation</th><th>GRAND TOTAL(Starts at 0) </th></tr>"
  if (jsonData !== null) {
    //console.log("inside the update");
    jsonData.forEach(entry => {
      table.innerHTML += "<tr> <td>" + entry.firstnum + "</td> <td>" + entry.lastnum + "</td> <td>" + entry.total + "</td> </tr>";
      //console.log("inside the ENTRY update");
    });
  }
}

async function submit() {
  const postdata = [{
    "firstnum": document.getElementById("firstnum").value,
    "lastnum": document.getElementById("lastnum").value,
  }]
  if (document.getElementById("lastnum").value == "Add" || document.getElementById("lastnum").value == "Sub"
    || document.getElementById("lastnum").value == "Mult" || document.getElementById("lastnum").value == "Div") {
    const responce = await fetch("/submit",
      {
        method: "POST",
        body: JSON.stringify(postdata)
      }
    );
    updateTable(postdata);
    fetch("/data", { method: 'GET', })
      .then(responce => responce.json())
      .then(json => { updateTable(json) })
  }
  else {
    alert("Inncorrect wording for calculation in the second box. Please retype.")
  }
}

async function kill() {
  //console.log("in kill scriopt");
    const responce = await fetch("/kill",
    {
      method: "POST"
    }
  ).then(() => {
    fetch("/data", { method: 'GET', })
      .then(responce => responce.json())
      .then(json => { updateTable(json) })
  });
}


window.onload = function () {
  fetch("/data", { method: 'GET', })
    .then(responce => responce.json())
    .then(json => { updateTable(json) })
}
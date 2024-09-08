// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {

  event.preventDefault()
  
  const input = document.querySelector( "#name"),
        json = { name: input.value },
        body = JSON.stringify( json );

  const response = await fetch( '/submit', {
    method:'POST',
    body
  });

  const text = await response.text();

  console.log('text:',text)
}

const fillTable = async function( event ) {

    const button = document.querySelector("#button");
    const table = document.querySelector("#target")
    const tbody = document.querySelector("#tbody")
//const newRow = table.insertRow(table.rows.length)
    const name = document.querySelector("#name")
    const cookie = document.querySelector("#cookie")
    const icecream = document.querySelector("#icecream")
    const other = document.querySelector("#other")
    const deleteButton = document.querySelector("#deleteButton")
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5= document.createElement("td");

    button.addEventListener("click", function() {
        let nameValue = name.value
        let cookieValue = cookie.value
        let icecreamValue = icecream.value
        let otherValue = other.value
        td1.innerHTML= nameValue;
        td2.innerHTML= cookieValue;
        td3.innerHTML= icecreamValue;
        td4.innerHTML= otherValue;
        td5.appendChild(deleteButton);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.insertRow(tr);
        // newRow.insertCell(0).innerHTML = nameValue
        // newRow.insertCell(1).innerHTML = cookieValue
        // newRow.insertCell(2).innerHTML = icecreamValue
        // newRow.insertCell(3).innerHTML = otherValue

    })
}


window.onload = function() {

    //button.onclick = submit;

}
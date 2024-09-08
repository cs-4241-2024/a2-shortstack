// // FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event ) {

    event.preventDefault()

    // const input = document.querySelector( "#name"),
    //     json = { name: input.value },
    //     body = JSON.stringify( json );
    //
    // const response = await fetch( '/submit', {
    //     method:'POST',
    //     body
    // });
    // const input = document.querySelector('#testform'),
    //     json = {testform: input.value},
    //     body = JSON.stringify (json);


    // const input = document.querySelector( '#yourname' ),
    //     json = { yourname: input.value },
    //     body = JSON.stringify( json )

    const input = document.querySelector('#name'),
        json = {name: input.value},
        body = JSON.stringify(json)
    //console.log(input)
    const response = await fetch('/submit',{
        method: 'POST',
        body
    })
    const textPre = await response.text();
    const text = JSON.parse(textPre);
    fillTable(text)
    console.log('text:',text)
}

const fillTable = function( text ) {
    /* I don't think you are doing this correctly */
// I would look explore this https://stackoverflow.com/questions/46157018/dynamically-populate-data-into-table-using-javascript
//This is similar to what the professor is suggesting
//You need to iterate over text and populate the table it will be something like text[iterator].<property> to get a particular value in the json
    const table = document.getElementById("target")

    function addCell(tr, text){
        const td = tr.insertCell();
        td.innerHTML = text;
        return td;
    }

    text.forEach(function (item){
        const row = table.insertRow();
        addCell(row, item.name.value)
        addCell(row, item.cookie.value)
        addCell(row, item.icecream.value)
        addCell(row, item.other.value)
    })
}


window.onload = function() {
    //This allows you to bind you button to the event handler function submit above
    let button = document.getElementsByClassName("button");
    button.onclick = submit

}


//
// const submit = async function( event ) {
//
//   event.preventDefault()
//
//   const input = document.querySelector( "#name"),
//         json = { name: input.value },
//         body = JSON.stringify( json );
//
//   const response = await fetch( '/submit', {
//     method:'POST',
//     body
//   });
//
//   const text = await response.text();
//
//   console.log('text:',text)
// }
//
// const fillTable = async function( event ) {
//
//     const button = document.querySelector("#button");
//     const table = document.querySelector("#target")
//     const tbody = document.querySelector("#tbody")
// //const newRow = table.insertRow(table.rows.length)
//     const name = document.querySelector("#name")
//     const cookie = document.querySelector("#cookie")
//     const icecream = document.querySelector("#icecream")
//     const other = document.querySelector("#other")
//     const deleteButton = document.querySelector("#deleteButton")
//     const tr = document.createElement("tr");
//     const td1 = document.createElement("td");
//     const td2 = document.createElement("td");
//     const td3 = document.createElement("td");
//     const td4 = document.createElement("td");
//     const td5= document.createElement("td");
//
//     button.addEventListener("click", function() {
//         let nameValue = name.value
//         let cookieValue = cookie.value
//         let icecreamValue = icecream.value
//         let otherValue = other.value
//         td1.innerHTML= nameValue;
//         td2.innerHTML= cookieValue;
//         td3.innerHTML= icecreamValue;
//         td4.innerHTML= otherValue;
//         td5.appendChild(deleteButton);
//         tr.appendChild(td1);
//         tr.appendChild(td2);
//         tr.appendChild(td3);
//         tr.appendChild(td4);
//         tr.appendChild(td5);
//         tbody.insertRow(tr);
//         // newRow.insertCell(0).innerHTML = nameValue
//         // newRow.insertCell(1).innerHTML = cookieValue
//         // newRow.insertCell(2).innerHTML = icecreamValue
//         // newRow.insertCell(3).innerHTML = otherValue
//
//     })
// }
//
//
// window.onload = function() {
//
//     //button.onclick = submit;
//
// }
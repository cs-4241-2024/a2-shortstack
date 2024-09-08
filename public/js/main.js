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

    const name = document.getElementById('name').value
    const cookie = document.getElementById('cookie').value
    const icecream = document.getElementById('icecream').value
    const other = document.getElementById('other').value
    const iceCreamLower = icecream.toLowerCase()
    let cake = ''
    if(iceCreamLower == 'vanilla'){
        cake = 'vanilla cake'
    }else if(iceCreamLower == 'chocolate'){
        cake = 'chocolate cake'
    }else{
        cake = 'no cake!'
    }
    const input = [name, cookie, icecream, other, cake]
    const body = JSON.stringify( input )

    const dict = {'name': name, 'cookie': cookie, 'icecream': icecream, 'other': other, 'cake': cake}
    //window.globalVar.appendChild(dict)
    //console.log(input)
    // const response = await fetch('/submit',{
    //     method: 'POST',
    //     body
    // })
    // const input = document.querySelector( "#name"),
    //     json = { name: input.value },
    //     body = JSON.stringify( json );

    const response = await fetch('/handlePost', {
        method:'POST',
        body
    })

    const responseData = await fetch('/data',{
        method: 'GET'
    })

    const textPre = await responseData.text();
    const text = JSON.parse(textPre);

    console.log(text)
    console.log(text[0].name.value)
    fillTable(text)
    //fillTable(responseData)

    //console.log('text:',text)
}

const fillTable = function( dict ) {
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

//     const row = table.insertRow();
//     addCell(row, array[0])
//     addCell(row, array[1])
//     addCell(row, array[2])
//     addCell(row, array[3])

    dict.forEach(function (item){
        const row = table.insertRow();
        const name = item["name"];
        const cookie = item["cookie"];
        const icecream = item["icecream"];
        const other = item["other"];
        const cake = item["cake"];
        addCell(row, name)
        addCell(row, cookie)
        addCell(row, icecream)
        addCell(row, other)
        addCell(row, cake)
    })
}


window.onload = function() {
    //This allows you to bind you button to the event handler function submit above
    //let button = document.getElementsByClassName("button");
    const buttonVariable = document.getElementById("button");
    if(buttonVariable.addEventListener)
        buttonVariable.addEventListener("click",submit,false);
    else if(buttonVariable.attachEvent)
        buttonVariable.attachEvent('onclick',submit)
    //button.onclick = submit
    //submit()

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
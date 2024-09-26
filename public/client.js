const submit = async function( event ) {

  event.preventDefault()
  

  const input = document.querySelector( '#name' )  
  const input2 = document.querySelector ('#musical' )
  const input3 = document.querySelector ('#songs')

    const json = { name: input.value, musical: input2.value, 
                  songs: input3.value }
    const body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body
  })
      
  const text = await response.json()
  generateTable(text);
  
  const element = document.createElement('p')
  element.innerHTML = `<a href="http://wpi.edu"> ${text[0].name} </a>`
  document.body.appendChild( element )
  
  
  //sconsole.log( 'text:', text )
}


function generateTable(text) {
  // creates a <table> element and a <tbody> element
  console.log(text);
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

    for (let j = 0; j < text.length; j++) {
      const row = document.createElement("tr");
      const cellN = document.createElement("td").appendChild(document.createTextNode(text[j].name));
      const cellM = document.createElement("td").appendChild(document.createTextNode(text[j].musical));
      row.appendChild(cellN);
      row.appendChild(cellM);
      tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
}




window.onload = function() {
  const button = document.querySelector("#btnSubmit");
  button.onclick = submit;    
}


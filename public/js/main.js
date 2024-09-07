// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {

  event.preventDefault()
  
  const input = document.querySelector( "#userinfo"),
        json = { name: input.value },
        body = JSON.stringify( json );

  const response = await fetch( '/submit', {
    method:'POST',
    body
  });
}

window.onload = function() {

    const button = document.querySelector("#submit");
    const table = document.querySelector("table")
    const name = document.querySelector("#name")
    const cookie = document.querySelector("#cookie")
    const icecream = document.querySelector("#icecream")
    const other = document.querySelector("#other")
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    button.addEventListener("click", function() {
        let nameValue = name.value
        let cookieValue = cookie.value
        let icecreamValue = icecream.value
        let otherValue = other.value
        td1.innerHTML= nameValue;
        td2.innerHTML= cookieValue;
        td3.innerHTML= icecreamValue;
        td4.innerHTML= otherValue;
        tr.appendChild(td1)
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);
    })

    //button.onclick = submit;

}
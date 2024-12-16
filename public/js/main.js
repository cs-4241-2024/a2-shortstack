// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const nameinput = document.querySelector( "#yourname"),
        dateinput = document.querySelector("#thedate"),
        pointinput = document.querySelector("#points")
        json = { yourname: nameinput.value, date: dateinput.value, points: pointinput.value},
        body = JSON.stringify(json)

  const response = await fetch( '/submit', {
    method:'POST',
    body
  })

  const text = await response.text()

  console.log( 'text:', text )
  getAll()
}
const getAll = async function (){

  const response = await fetch( '/getall', {
    method:'GET'
  })
  let text = await response.json()
  const leaderdata = document.querySelector("#leaderdata");
  leaderdata.innerHTML = ""

  let html = "";
  for(let i = 1 ; i <= text.length; i++){

    html += "<tr>";
    for (data in text[i-1]){
      html += "<td>" + text[i-1][data] + "</td>";
    }
    html += "</tr>";
  }
  const leader = document.querySelector("#leader");
  leader.setAttribute("visibility", "visible");
  leaderdata.innerHTML = html

}
window.onload = function() {
   const button = document.querySelector("#submitbutton");
  button.onclick = submit;
  const showleader = document.querySelector("#showleader");
  showleader.onclick = getAll;
}
// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( "#userinfo"),
        json = { name: input.value },
        body = JSON.stringify( json );

  //const formData = new FormData(input);

  const response = await fetch( '/submit', {
    method:'POST',
    body
    //formData,
  });




  // function tableWork(){
  //   const name = document.testform.name.value;
  //   const cookie = document.testform.cookie.value;
  //
  //   const tr = document.createElement('tr')
  //
  //   const td1 = tr.appendChild(document.createElement('td'))
  //   const td2 = tr.appendChild(document.createElement('td'))
  //
  //   td1.innerHTML = name;
  //   td2.innerHTML = cookie;
  //
  //   document.getElementById("table").appendChild(tr);
  //
  // }
  // tableWork();
  // const data = await response.json()
  // const list = document.querySelector( 'li' );
  // list.innerHTML = '';
  // data.map( item => item.name ).forEach( item => {
  //   const li = document.createElement('li')
  //   li.innerText = item.name
  //   list.appendChild(li)
  // })

  // document.getElementById("submit").onclick = function(){
  //   name = document.getElementById("name").value;
  //   document.getElementById("datalist").textContent = `${name}`
  //   }
  //const data = await response.json()
  // const ul = document.querySelector('ul')
  // ul.innerHTML=''
  // data.map( item => item.cookie )
  //     //.map( item => item[0].toUpperCase() + item.slide(1))
  //     .forEach(item=> {
  //     const li = document.createElement('li')
  //       li.innerText = item.cookie
  //       ul.appendChild(li)
  //     })
      //.forEach(item=>console.log(item))
  // Take the values the server gives you and make an element out of that!
    // const element = document.createElement('p')
    // element.innerHTML='<a href="http://wpi.edu">wpi</a>'
    // document.body.appendChild(element)

  //console.log( 'text:', text )
}

window.onload = function() {
   const button = document.querySelector("submit");
    button.onclick = submit;
}
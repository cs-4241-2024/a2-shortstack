// Function to sleep for a given number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    
    const input = document.querySelector( '#title'); //,,"","","#ranking" 
    const input2 = document.querySelector('#author');
    const input3 = document.querySelector('#year');
    const input4 = document.querySelector('#genre');
    const input5 = document.querySelector('#ranking');
    const input6 = "add", //giving it a task
          json = { "title": input.value,"author":input2.value,"year":Number(input3.value),"genre":input4.value,"ranking":Number(input5.value),"task":input6},
          body = JSON.stringify( json )
  
    const response = await fetch( '/submit', {
      method:'POST', //POST is 
      body
    })
    if (response.status==200) {//making a message show up to the user to see successfully added or deleted
      const element =document.querySelector("#canAdd")
      element.style.visibility = "visible";
      await sleep(5000); // 5000 ms = 5 seconds
      element.style.visibility = "hidden";

    } else if (response.status==400) { //error for you can't add it to the dataset but whatever i do not know how to tell the user that
      const element =document.querySelector("#canNotAdd")
      element.style.visibility = "visible";
      await sleep(10000); // 10000 ms = 10 seconds
      element.style.visibility = "hidden";
      throw new Error(`HTTP error! Status: Book already exsists in the Manager. Add a different book`);
      //I will update the status or a pop up thing with ID so it won't add to it since it's incorrect
    }
  
    const text = await response.json()
    
    const element = document.createElement('p')
    //element.innerHTML = `<a href="http://wpi.edu"> ${text[2].title} </a>`
    document.body.appendChild( element )
    
    console.log( 'text:', text)
  }


  const deleter = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    
    const input = document.querySelector( '#delTitle');
    const input2 = "delete"
          json = { "title": input.value, "task":input2},
          body = JSON.stringify( json )
  
    const response = await fetch( '/deleter', {
      method:'POST', 
      body
    })

    if (response.status==200) {//making a message show up to the user to see successfully added or deleted
      const element =document.querySelector("#canDel")
      element.style.visibility = "visible";
      await sleep(5000); // 5000 ms = 5 seconds
      element.style.visibility = "hidden";

    } else if (response.status==400) {//error for you can't delete it to the dataset but whatever i do not know how to tell the user that
      const element =document.querySelector("#canNotDel")
      element.style.visibility = "visible";
      await sleep(10000); // 10000 ms = 10 seconds
      element.style.visibility = "hidden";
      throw new Error(`HTTP error! Status: Book can't be deleted because it is not in the table`);
      //I will update the status or a pop up thing with ID so it won't add to it since it's incorrect
    }
  
    const text = await response.json()
    
    const element = document.createElement('p')
    //element.innerHTML = `<a href="http://wpi.edu"> ${text[2].title} </a>`
    document.body.appendChild( element )
    
    console.log( 'text:', text)
  }
  
  window.onload = function() {
    const newBookButton = document.querySelector("#newBook");
    newBookButton.onclick = submit;
    const deleteBookButton = document.querySelector("#deleteBook");
    deleteBookButton.onclick = deleter;

    const tableBody = document.getElementById('tableBody');
    
  }
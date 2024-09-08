// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const classCode = document.querySelector('#Code').value;
  const className = document.querySelector('#Name').value;
  const assignment = document.querySelector('#Assignment').value;

  const newData = [{
    "classCode": classCode,
    "className": className,
    "assignment": assignment
  }];

  const response = await fetch('/submit', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  });

  const text = await response.text();

  console.log('text:', text);
  console.log("data:", newData);
}

window.onload = function () {
  document.querySelector('#submitButton').onclick = submit;
}
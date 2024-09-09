// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  // Clear the form when submit is hit (with flicker)
  const form = document.querySelector("#tasklist");
  form.innerHTML = "";

  const date = new Date();

  const input = document.querySelector("#newtask");
  const input3 = document.querySelector("input[name='priority']:checked"),
    json = {
      task: input.value,
      creationDate: date.getDay(),
      priority: input3.value,
    },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  let count = 0;
  const data = await response.json();
  data
    .map((item) => item)
    .forEach((item) => {
      const element = document.createElement("div");
      element.innerHTML =
        "<input type='checkbox' name='" +
        `${count}` +
        "' onclick='del(event)'/><label>" +
        `${item.task}` +
        " - Due: " +
        `${item.creationDate}` +
        "</label>";
      form.appendChild(element);
      count++;
    });
};

const del = async function (event) {
  event.preventDefault();

  const response = await fetch("/del", {
    method: "DELETE",
    body: event.target.getAttribute("name"),
  });
  const form = document.querySelector("#tasklist");
  form.innerHTML = "";
  const data = await response.json();

  let count = 0;
  data
    .map((item) => item)
    .forEach((item) => {
      const element = document.createElement("div");
      element.innerHTML =
        "<input type='checkbox' name='" +
        `${count}` +
        "' onclick='del(event)'/><label>" +
        `${item.task}` +
        " - Due: " +
        `${item.creationDate}` +
        "</label>";
      form.appendChild(element);
      count++;
    });
};

window.onload = function () {
  const button = document.querySelector("button");
  button.onclick = submit;
};

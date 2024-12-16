// FRONT-END (CLIENT) JAVASCRIPT HERE

const fetchData = async function () {
  const response = await fetch("/data");
  const data = await response.json();

  const ul = document.querySelector("#date-list");
  ul.innerHTML = "";

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = item.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = async function () {
      const deleteResponse = await fetch("/delete", {
        method: "DELETE",
        body: JSON.stringify({ index }),
      });

      if (deleteResponse.ok) {
        li.remove();
        fetchData();
      }
    };

    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });

  const agesResponse = await fetch("/ages");
  const { oldest, youngest } = await agesResponse.json();

  document.getElementById("oldest-age").innerText = `Oldest Age: ${oldest}`;
  document.getElementById(
      "youngest-age"
  ).innerText = `Youngest Age: ${youngest}`;
};

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const input = document.querySelector("#yourdate");
  const dateValue = input.value;

  const json = { yourdate: dateValue };
  const body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const data = await response.json();
  console.log(data);

  const ul = document.querySelector("#date-list");
  ul.innerHTML = "";

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = item.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.style.display = "none";

    li.onmouseover = function () {
      deleteBtn.style.display = "inline";
    };

    li.onmouseout = function () {
      deleteBtn.style.display = "none";
    };

    deleteBtn.onclick = async function () {
      const deleteResponse = await fetch("/delete", {
        method: "DELETE",
        body: JSON.stringify({ index }),
      });

      if (deleteResponse.ok) {
        li.remove();
        fetchData();
      }
    };

    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });

  displayEnteredDate(dateValue);

  fetchData();
  input.value = "";
};

const displayEnteredDate = function (dateValue) {
  const dateParts = dateValue.split("/");
  if (dateParts.length === 3) {
    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    const dateObj = new Date(year, month - 1, day);

    const now = new Date();
    let age = now.getFullYear() - dateObj.getFullYear();

    if (
        now.getMonth() + 1 < month ||
        (now.getMonth() + 1 === month && now.getDate() < day)
    ) {
      age--;
    }

    const options = { weekday: "long" };
    const dayOfWeek = dateObj.toLocaleDateString("en-US", options);

    const dateString = `${dateValue}, you are ${age}, and it is/was a ${dayOfWeek}`;

    document.getElementById(
        "date-info"
    ).innerText = `Your Date is: ${dateString}`;
  }
};

const validateDate = function (dateString) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return regex.test(dateString);
};

window.onload = function () {
  fetchData();

  const button = document.querySelector("#submit-btn");
  button.onclick = submit;
};

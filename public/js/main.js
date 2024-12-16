let startTime;
let times = [];
let round = 0;

document.getElementById("playerForm").addEventListener("submit", startGame);

function startGame(event) {
  event.preventDefault();
  const name = document.getElementById("playerName").value;

  round = 0;
  times = [];
  nextRound();
}

function nextRound() {
  if (round < 5) {
    const dot = document.getElementById("dot");
    dot.style.top = `${Math.random() * 270}px`;
    dot.style.left = `${Math.random() * 270}px`;

    dot.onclick = function () {
      const endTime = new Date().getTime();
      times.push((endTime - startTime) / 1000);
      round++;
      nextRound();
    };

    startTime = new Date().getTime();
  } else {
    submitData();
  }
}

async function submitData() {
  const name = document.getElementById("playerName").value;
  const data = { name: name, times: times };

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const updatedData = await response.json();
  updateTable(updatedData);
}

function updateTable(data) {
  const tbody = document.getElementById("resultsBody");
  tbody.innerHTML = "";

  data.forEach((entry) => {
    const row = `<tr>
      <td>${entry.name}</td>
      <td>${entry.times[0]}</td>
      <td>${entry.times[1]}</td>
      <td>${entry.times[2]}</td>
      <td>${entry.times[3]}</td>
      <td>${entry.times[4]}</td>
      <td>${entry.averageTime}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

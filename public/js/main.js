// Dummy dataset to store the user's activities
let activities = [];
let editingIndex = null; // Track the index of the activity being edited

// Function to dynamically load forms based on the selected activity type
function loadForm(activityType, activity = null) {
  const formContainer = document.getElementById('form-container');
  formContainer.style.display = 'block';
  formContainer.innerHTML = ''; // Clear any existing form

  // Load the appropriate form
  if (activityType === 'work') {
    formContainer.innerHTML = `
      <form id="activity-form">
        <h3>Work Form</h3>
        <label for="course">Course:</label>
        <input type="text" id="course" name="course" value="${activity ? activity.course : ''}" required>

        <label for="ddl">Deadline (DDL):</label>
        <input type="date" id="ddl" name="ddl" value="${activity ? activity.ddl : ''}" required>

        <label for="expected-time">Expected Finish Time:</label>
        <input type="time" id="expected-time" name="expected-time" value="${activity ? activity.expectedTime : ''}" required>

        <label for="actual-time">Actual Finish Time:</label>
        <input type="time" id="actual-time" name="actual-time" value="${activity ? activity.actualTime : ''}">

        <button type="submit">${editingIndex !== null ? 'Edit Work' : 'Add Work'}</button>
      </form>
    `;
  } else if (activityType === 'entertainment') {
    formContainer.innerHTML = `
      <form id="activity-form">
        <h3>Entertainment Form</h3>
        <label for="entertainment-type">Type of Entertainment:</label>
        <select id="entertainment-type" name="entertainment-type">
          <option value="video-game" ${activity && activity.entertainmentType === 'video-game' ? 'selected' : ''}>Video Game</option>
          <option value="music" ${activity && activity.entertainmentType === 'music' ? 'selected' : ''}>Music</option>
          <option value="fitness" ${activity && activity.entertainmentType === 'fitness' ? 'selected' : ''}>Fitness</option>
        </select>

        <button type="submit">${editingIndex !== null ? 'Edit Entertainment' : 'Add Entertainment'}</button>
      </form>
    `;
  } else if (activityType === 'sleep') {
    formContainer.innerHTML = `
      <form id="activity-form">
        <h3>Sleep Form</h3>
        <label for="sleep-date">Date of Sleep:</label>
        <input type="date" id="sleep-date" name="sleep-date" value="${activity ? activity.sleepDate : ''}" required>

        <label for="sleep-time">Time of Sleep:</label>
        <input type="time" id="sleep-time" name="sleep-time" value="${activity ? activity.sleepTime : ''}" required>

        <button type="submit">${editingIndex !== null ? 'Edit Sleep' : 'Add Sleep'}</button>
      </form>
    `;
  }

  // Attach the event listener for the form submission
  document.getElementById('activity-form').addEventListener('submit', submitActivity);
}

// Submit the activity and store it
function submitActivity(event) {
  event.preventDefault();

  const activityType = document.querySelector('h3').innerText.split(' ')[0].toLowerCase();
  let activityData = { activityType };

  if (activityType === 'work') {
    activityData.course = document.getElementById('course').value;
    activityData.ddl = document.getElementById('ddl').value;
    activityData.expectedTime = document.getElementById('expected-time').value;
    activityData.actualTime = document.getElementById('actual-time').value;
  } else if (activityType === 'entertainment') {
    activityData.entertainmentType = document.getElementById('entertainment-type').value;
  } else if (activityType === 'sleep') {
    activityData.sleepDate = document.getElementById('sleep-date').value;
    activityData.sleepTime = document.getElementById('sleep-time').value;
  }

  // If editingIndex is set, update the activity; otherwise, add a new one
  if (editingIndex !== null) {
    activities[editingIndex] = activityData;
    editingIndex = null; // Reset the editing index after editing
  } else {
    activities.push(activityData);
  }

  // Clear the form and hide it
  document.getElementById('form-container').innerHTML = '';
  document.getElementById('form-container').style.display = 'none';

  alert('Activity saved successfully!');
  showActivityList(); // Refresh the list
}

// Show the list of activities and allow editing or deleting
function showActivityList() {
  const activityTableBody = document.querySelector('#activity-table tbody');
  activityTableBody.innerHTML = ''; // Clear the table

  activities.forEach((activity, index) => {
    const row = activityTableBody.insertRow();
    row.insertCell(0).innerText = activity.activityType;

    let details = '';
    if (activity.activityType === 'work') {
      details = `Course: ${activity.course}, DDL: ${activity.ddl}, Expected: ${activity.expectedTime}, Actual: ${activity.actualTime}`;
    } else if (activity.activityType === 'entertainment') {
      details = `Type: ${activity.entertainmentType}`;
    } else if (activity.activityType === 'sleep') {
      details = `Date: ${activity.sleepDate}, Time: ${activity.sleepTime}`;
    }
    row.insertCell(1).innerText = details;

    // Edit button
    const editCell = row.insertCell(2);
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.onclick = () => editActivity(index);
    editCell.appendChild(editButton);

    // Delete button
    const deleteCell = row.insertCell(3);
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => {
      activities.splice(index, 1);
      showActivityList(); // Refresh the list
    };
    deleteCell.appendChild(deleteButton);
  });

  // Show the activity list table
  document.getElementById('activity-list').style.display = 'block';
}

// Load the form with existing activity data for editing
function editActivity(index) {
  const activity = activities[index];
  editingIndex = index; // Set the editing index

  loadForm(activity.activityType, activity); // Load the form with the activity data
}

// Event listeners for the start page buttons
window.onload = function() {
  document.getElementById('choose-work').addEventListener('click', () => loadForm('work'));
  document.getElementById('choose-entertainment').addEventListener('click', () => loadForm('entertainment'));
  document.getElementById('choose-sleep').addEventListener('click', () => loadForm('sleep'));
  document.getElementById('check-list').addEventListener('click', showActivityList);
};

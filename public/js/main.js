// FRONT-END (CLIENT) JAVASCRIPT HERE
let id = 0;

async function sendEvent(evt) {
    evt.preventDefault();

    let event_id = evt.target.id.match(/edit-([0-9]+)/)[1];

    let event = {
        id: event_id,
        name: document.getElementById(`name-${event_id}`).value,
        date: document.getElementById(`date-${event_id}`).value,
        time: document.getElementById(`time-${event_id}`).value,
        travel_hrs: document.getElementById(`hours-${event_id}`).value,
        travel_mins: document.getElementById(`minutes-${event_id}`).value
    }

    const response = await fetch('/updateEvent', {
        method: 'POST',
        body: JSON.stringify(event)
    });

    const text = await response.text();
    document.getElementById(`depart-time-${event_id}`).value = JSON.parse(text).depart_time;

    document.getElementById(`name-${event_id}`).readOnly = true;
    document.getElementById(`date-${event_id}`).readOnly = true;
    document.getElementById(`time-${event_id}`).readOnly = true;
    document.getElementById(`hours-${event_id}`).readOnly = true;
    document.getElementById(`minutes-${event_id}`).readOnly = true;
    evt.target.innerText = "Edit";
    evt.target.removeEventListener('click', sendEvent);
    evt.target.addEventListener('click', editEvent);
}

function editEvent(evt) {
    evt.preventDefault();
    let event_id = evt.target.id.match(/edit-([0-9]+)/)[1];
    document.getElementById(`name-${event_id}`).readOnly = false;
    document.getElementById(`date-${event_id}`).readOnly = false;
    document.getElementById(`time-${event_id}`).readOnly = false;
    document.getElementById(`hours-${event_id}`).readOnly = false;
    document.getElementById(`minutes-${event_id}`).readOnly = false;
    document.getElementById(`depart-time-${event_id}`).value = null;
    evt.target.innerText = "Update";
    evt.target.removeEventListener('click', editEvent);
    evt.target.addEventListener('click', sendEvent);
}

function createField(form, label, id, type, value, opt) {
    const span = document.createElement('span');
    const lbl = document.createElement('label');
    lbl.for = id;
    lbl.innerText = label;
    span.appendChild(lbl);
    const input = document.createElement('input');
    input.id = id;
    input.type = type;
    input.required = true;
    if (value === undefined) {
        input.readOnly = false;
    } else {
        input.readOnly = true;
        input.value = value;
    }
    if (opt !== undefined) {
        if (opt.placeholder !== undefined)
            input.placeholder = opt.placeholder;
        if (opt.readOnly !== undefined) {
            input.readOnly = opt.readOnly;
        }
    }
    span.appendChild(input);
    form.appendChild(span);
}

function createDurationField(form, label, id, hrs, mins) {
    const span = document.createElement('span');
    const lbl = document.createElement('label');
    lbl.innerText = label;
    span.appendChild(lbl);
    const hours = document.createElement('input');
    hours.id = `hours-${id}`;
    hours.type = "number";
    hours.step = "1";
    hours.min = "0";
    const minutes = document.createElement('input');
    minutes.id = `minutes-${id}`;
    minutes.type = "number";
    minutes.max = "59";
    minutes.step = "1";
    minutes.min = "0";
    hours.required = true;
    minutes.required = true;
    if (hrs === undefined) {
        hours.readOnly = false;
        minutes.readOnly = false;
    } else {
        hours.readOnly = true;
        minutes.readOnly = true;
        hours.value = hrs;
        minutes.value = mins;
    }
    lbl.appendChild(hours);
    lbl.insertAdjacentText("beforeend", "hours");
    lbl.appendChild(minutes);
    lbl.insertAdjacentText("beforeend", "minutes");
    span.appendChild(lbl);
    form.appendChild(span);
}

function createForm(id, evt, is_new) {
    const edit = document.createElement("button");
    edit.id = `edit-${id}`;
    if (is_new) {
        evt = {};
        edit.innerText = "Submit"
        edit.addEventListener("click", sendEvent);
    } else {
        edit.innerText = "Edit";
        edit.addEventListener("click", editEvent);
    }
    const form = document.createElement('form');
    createField(form, "Name: ", `name-${id}`, 'text', evt.name, {placeholder: "Event Name"});
    createField(form, "Date: ", `date-${id}`, 'date', evt.date);
    createField(form, "Time: ", `time-${id}`, 'time', evt.time);
    createDurationField(form, "Travel Duration:", id, evt.travel_hrs, evt.travel_mins);
    createField(form, "Departure Time: ", `depart-time-${id}`, 'time', evt.depart_time, {readOnly: true});
    form.appendChild(edit);
    document.getElementById("forms").appendChild(form);
}

async function fetchEvents() {
    const response = await fetch('/getEvents', {
        method: 'POST'
    });
    console.log("Got response");
    const text = await response.text();
    console.log(text);
    const events = JSON.parse(text);

    // let id = 0;
    for (let evt of events) {
        createForm(id, evt, false);
        id++;
    }
}

window.addEventListener('load', fetchEvents);
window.addEventListener('load', () => {
    document.getElementById('add-event').addEventListener('click', () => {
        createForm(id, undefined, true);
        id++;
    });
})

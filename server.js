const http = require('http'),
    fs = require('fs'),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require('mime'),
    dir = 'public/',
    port = 3000;

const events = [
    {name: "Bob's Birthday", date: "2024-12-04", time: "15:00", travel_hrs: 0, travel_mins: 32, depart_time: "14:28"},
    {name: "Joe's Party", date: "2024-09-12", time: "14:00", travel_hrs: 1, travel_mins: 46, depart_time: "12:14"}
];

const server = http.createServer(function (request, response) {
    console.log("Got request: " + request.method);
    if (request.method === 'GET') {
        handleGet(request, response);
    } else if (request.method === 'POST') {
        handlePost(request, response);
    }
});

function handleGet(request, response) {
    const filename = dir + request.url.slice(1);

    if (request.url === '/') {
        sendFile(response, 'public/index.html');
    } else {
        sendFile(response, filename);
    }
}

function handlePost(request, response) {
    let dataString = "";
    console.log("Response: " + request.url);
    if (request.url === "/getEvents") {
        console.log("Sending events");
        request.on('data', (data) => {
            dataString += data;
        });

        request.on('end', () => {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(events));
            response.end();
        });
    } else if (request.url === "/updateEvent") {
        request.on('data', (data) => {
            dataString += data;
        });

        request.on('end', () => {
            let event = JSON.parse(dataString);
            console.log(`Received event: ${dataString}`);
            let time = event.time.split(":")
            let depart_hr = (time[0] - event.travel_hrs) % 24;
            let depart_min = (time[1] - event.travel_mins) % 60;
            if (depart_min < 0) {
                depart_hr -= 1;
                depart_min += 60;
            }
            depart_hr = depart_hr < 0 ? depart_hr + 24 : depart_hr;
            if (depart_hr < 10) {
                depart_hr = "0" + depart_hr;
            }
            if (depart_min < 10) {
                depart_min = "0" + depart_min;
            }
            let depart_time = depart_hr + ":" + depart_min
            events[event.id] = {
                name: event.name,
                date: event.date,
                time: event.time,
                travel_hrs: event.travel_hrs,
                travel_mins: event.travel_mins,
                depart_time: depart_time
            };
            console.log(JSON.stringify(events[event.id]));

            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify({depart_time: depart_time}));
        })
    } else if (request.url === "/submit") {
        request.on('data', (data) => {
            dataString += data;
        });

        request.on('end', () => {
            console.log(JSON.parse(dataString));

            // ... do something with the data here!!!

            response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            response.end('test');
        });
    }
}

function sendFile(response, filename) {
    const type = mime.getType(filename);

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we've loaded the file successfully
        if (err === null) {
            // status code: https://httpstatuses.com
            response.writeHead(200, {'Content-Type': type});
            response.end(content);

        } else {
            // file not found, error code 404
            response.writeHead(404);
            response.end('404 Error: File Not Found');

        }
    });
}

server.listen(process.env.PORT || port);

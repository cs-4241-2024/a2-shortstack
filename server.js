const http = require("http"),
  fs = require("fs"),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require("mime"),
  dir = "public/",
  port = 3000;
let students = [];

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    handleGet(request, response);
  } else if (request.method === "POST") {
    handlePost(request, response);
  }
});

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === "/" || request.url === "/index.html" || request.url === "/?") {
    sendFile(response, "public/index.html");
  } else if (request.url === "/students") {
    // Added this to handle the GET request for the students list
    response.writeHeader(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ students: students, stats: calculateClassGradeStats() }));
  } else {
    sendFile(response, filename);
  }
};

const sendFile = function (response, filename) {
  const type = mime.getType(filename);

  fs.readFile(filename, function (err, content) {
    // if the error = null, then we've loaded the file successfully
    if (err === null) {
      // status code: https://httpstatuses.com
      response.writeHeader(200, { "Content-Type": type });
      response.end(content);
    } else {
      // file not found, error code 404
      response.writeHeader(404);
      response.end("404 Error: File Not Found");
    }
  });
};

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", function () {
    let student = JSON.parse(dataString);

    if (request.url === "/add") {
      let code = addStudent(student);
      if (code == 0) {
        console.log("Student already exists");
        response.writeHead(400, "Bad Request - Student already exists", {
          "Content-Type": "text/plain",
        });
        response.end("400: Bad Request - Student already exists");
      } else if (code == 1) {
        console.log("Student added");
        response.writeHead(201, "Created", {
          "Content-Type": "application/json",
        });
        response.end(JSON.stringify({ value: student.gradeLetter, stats: calculateClassGradeStats() }));
      } else if (code == 2) {
        console.log("Student updated");
        response.writeHead(200, "OK", { "Content-Type": "application/json" });
        response.end(JSON.stringify({ value: student.gradeLetter, stats: calculateClassGradeStats() }));
      }
    } else if (request.url === "/delete") {
      let success = deleteStudent(student);
      if (success) {
        response.writeHead(200, "OK", { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Student deleted", stats: calculateClassGradeStats() }));
      } else {
        response.writeHead(400, "Bad Request - Student not found", {
          "Content-Type": "text/plain",
        });
        response.end("400: Bad Request - Student not found");
      }
    }

    console.log("students:");
    console.log(students);
  });
};

/**
 * Adds a student to the list.
 *
 * @param {Object} student - The student object to be added.
 * @returns {number} - The result code indicating the outcome of the operation:
 *   - 0: Bad Request - Student already exists.
 *   - 1: Student successfully added.
 *   - 2: Student updated with different grade or class.
 */
function addStudent(student) {
  // calculate the grade letter
  let grade = student.grade;
  switch (true) {
    case grade >= 90:
      grade = "A";
      break;
    case grade >= 80:
      grade = "B";
      break;
    case grade >= 70:
      grade = "C";
      break;
    default:
      grade = "NR";
  }

  // check if the student is already in the list
  for (let i = 0; i < students.length; i++) {
    if (
      students[i].name === student.name &&
      students[i].classYear === student.classYear &&
      students[i].grade === student.grade
    ) {
      return 0;
    }
    // if the student exists but has a different grade or class, update the other fields
    else if (students[i].name === student.name) {
      students[i].grade = student.grade;
      students[i].classYear = student.classYear;
      students[i].gradeLetter = grade;
      student.gradeLetter = grade;
      return 2;
    }
  }

  // otherwise, if the student doesn't exist yet, add the student to the list
  student.gradeLetter = grade;
  students.push(student);
  return 1;
}

/**
 * Deletes a student from the list.
 *
 * @param {Object} student - The student object to be deleted.
 * @returns {number} - The result code indicating the outcome of the operation:
 *  - 0: Bad Request - Student not found.
 *  - 1: Student successfully deleted.
 */
function deleteStudent(student) {
  // check if the student is in the list
  for (let i = 0; i < students.length; i++) {
    if (students[i].name === student.name) {
      students.splice(i, 1);
      return 1;
    }
  }

  // if the student is not in the list, return 0 to indicate that the student was not found
  return 0;
}

/**
 * Calculates the class grade statistics.
 * 
 * @returns {Object} - The class grade statistics object.
 * - counts: The number of students in each class.
 * - avgs: The average grade for each class.
 * - classAvg: The average grade for the entire class.
 * 
 * Example:
 * {
 *  counts: {
 *   senior: 2,
 *  junior: 1,
 * sophomore: 1,
 * freshman: 1,
 * grad: 1,
 * parttime: 1
 * },
 * avgs: {
 * senior: 85,
 * junior: 90,
 * sophomore: 80,
 * freshman: 75,
 * grad: 95,
 * parttime: 85
 * },
 * classAvg: 85
 * }
 * 
 * Note: The classAvg is the average of all the students' grades.
 * */
function calculateClassGradeStats() {
  let counts = {
    senior: 0,
    junior: 0,
    sophomore: 0,
    freshman: 0,
    grad: 0,
    parttime: 0,
  };
  let avgs = {
    senior: 0,
    junior: 0,
    sophomore: 0,
    freshman: 0,
    grad: 0,
    parttime: 0,
  };
  let classAvg = 0;
  for (let i = 0; i < students.length; i++) {
    classAvg += parseInt(students[i].grade);
    switch (students[i].classYear) {
      case "senior":
        counts.senior++;
        avgs.senior += parseInt(students[i].grade);
        break;
      case "junior":
        counts.junior++;
        avgs.junior += parseInt(students[i].grade);
        break;
      case "sophomore":
        counts.sophomore++;
        avgs.sophomore += parseInt(students[i].grade);
        break;
      case "freshman":
        counts.freshman++;
        avgs.freshman += parseInt(students[i].grade);
        break;
      case "grad":
        counts.grad++;
        avgs.grad += parseInt(students[i].grade)
        break;
      case "part-time":
        counts.parttime++;
        avgs.parttime += parseInt(students[i].grade);
        break;
    }
  }

  classAvg = students.length == 0 ? 0 : parseFloat((classAvg / students.length).toFixed(2));
  avgs.senior = counts.senior == 0 ? 0 : parseFloat((avgs.senior / counts.senior).toFixed(2));
  avgs.junior = counts.junior == 0 ? 0 : parseFloat((avgs.junior / counts.junior).toFixed(2));
  avgs.sophomore = counts.sophomore == 0 ? 0 : parseFloat((avgs.sophomore / counts.sophomore).toFixed(2));
  avgs.freshman = counts.freshman == 0 ? 0 : parseFloat((avgs.freshman / counts.freshman).toFixed(2));
  avgs.grad = counts.grad == 0 ? 0 : parseFloat((avgs.grad / counts.grad).toFixed(2));
  avgs.parttime = counts.parttime == 0 ? 0 : parseFloat((avgs.parttime / counts.parttime).toFixed(2));

  let classStats = {
    counts: counts,
    avgs: avgs,
    classAvg: classAvg,
  };

  return classStats;
}

server.listen(process.env.PORT || port);

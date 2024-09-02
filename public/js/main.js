/**
 * Adds a student to the table.
 * 
 * @param {Object} student - The student object to be added.
 * @returns {void}
*/
function addStudentToTable(student) {
  let tbody = document.getElementById( 'table-body' )
  let row = document.createElement( 'tr' )
  let nameEl = document.createElement( 'td' )
  let classYearEl = document.createElement( 'td' )
  let gradeEl = document.createElement( 'td' )
  let gradeLetterEl = document.createElement( 'td' )

  nameEl.innerHTML = student.name
  classYearEl.innerHTML = student.classYear
  gradeEl.innerHTML = student.grade
  gradeLetterEl.innerHTML = student.gradeLetter

  row.appendChild( nameEl )
  row.appendChild( classYearEl )
  row.appendChild( gradeEl )
  row.appendChild( gradeLetterEl )

  tbody.appendChild( row )
}

/**
 * Updates a student's entry in the table.
 * 
 * @param {Object} student - The student object to be updated.
 * @returns {void}
 */
function updateStudentEntry(student) {
  let table = document.getElementById('table-body');
  let rows = table.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    let name = rows[i].getElementsByTagName('td')[0].innerHTML;
    if (name === student.name) {
      rows[i].getElementsByTagName('td')[1].innerHTML = student.classYear;
      rows[i].getElementsByTagName('td')[2].innerHTML = student.grade;
      rows[i].getElementsByTagName('td')[3].innerHTML = student.gradeLetter;
      return;
    }
  }

  console.error("Student not found");
}

/**
 * Deletes a student from the table.
 * 
 * @param {string} studentName - The name of the student to delete.
 * @returns {void}
 */
function removeFromTable(studentName) {
  let table = document.getElementById('table-body');  
  let rows = table.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    let name = rows[i].getElementsByTagName('td')[0].innerHTML;
    if (name === studentName) {
      table.deleteRow(i);
      return;
    }
  }

  console.error("Student not found");
}

function updateClassStats(stats) {
  let allAvg = document.getElementById('all-avg'),
      allCount = document.getElementById('all-count'),
      freshmanAvg = document.getElementById('freshman-avg'),
      freshmanCount = document.getElementById('freshman-count'),
      sophomoreAvg = document.getElementById('sophomore-avg'),
      sophomoreCount = document.getElementById('sophomore-count'),
      juniorAvg = document.getElementById('junior-avg'),
      juniorCount = document.getElementById('junior-count'),
      seniorAvg = document.getElementById('senior-avg'),
      seniorCount = document.getElementById('senior-count'),
      gradAvg = document.getElementById('grad-avg'),
      gradCount = document.getElementById('grad-count'),
      partTimeAvg = document.getElementById('part-time-avg'),
      partTimeCount = document.getElementById('part-time-count');

  allAvg.innerHTML = stats.classAvg;
  total = 0;
  for (let key in stats.counts) {
    total += stats.counts[key];
  }
  allCount.innerHTML = total;
  freshmanAvg.innerHTML = stats.avgs.freshman;
  freshmanCount.innerHTML = stats.counts.freshman;
  sophomoreAvg.innerHTML = stats.avgs.sophomore;
  sophomoreCount.innerHTML = stats.counts.sophomore;
  juniorAvg.innerHTML = stats.avgs.junior;
  juniorCount.innerHTML = stats.counts.junior;
  seniorAvg.innerHTML = stats.avgs.senior;
  seniorCount.innerHTML = stats.counts.senior;
  gradAvg.innerHTML = stats.avgs.grad;
  gradCount.innerHTML = stats.counts.grad;
  partTimeAvg.innerHTML = stats.avgs.parttime;
  partTimeCount.innerHTML = stats.counts.parttime;
}

/**
 * Handles the form submission for adding a student.
 * 
 * @param {Event} e - The form submission event.
 * @returns {void}
 */
const handleAdd = async function( e ) {
  e.preventDefault()

  // get all the input fields
  const name = document.querySelector( '#name' ),
        classYear = document.querySelector( '#class' ),
        grade = document.querySelector( '#grade' ),
        json = { name: name.value, classYear: classYear.value, grade: grade.value },
        body = JSON.stringify( json )

  // form validation
  if (name.value === "" || classYear.value === "" || grade.value === "") {
    alert("Please fill out all fields.")
    return
  }
  if (grade.value < 0 || grade.value > 100) {
    alert("Please enter a valid grade.")
    return
  }

  // add the student to the table with their calculated grade letter
  const response = await fetch( '/add', {
    method:'POST',
    body 
  })

  let res = await response.json()
  console.log(res)
  if (response.status === 400) {
    alert("Student already exists");
    return;
  }

  let student = { name: name.value, classYear: classYear.value, grade: grade.value, gradeLetter: res.value }
  if (response.status === 201) {
    addStudentToTable(student)
  } else if (response.status === 200) {
    updateStudentEntry(student)
  }
  updateClassStats(res.stats);
}


/**
 * Handles the deletion of a student.
 * 
 * @param {Event} e - The form submission event.
 * @returns {void}
 */
const handleDelete = async function( e ) {
  e.preventDefault()
  
  const name = document.querySelector( '#name' ),
        json = { name: name.value },
        body = JSON.stringify( json )

  if (name.value === "") {
    alert("Please enter a name.")
    return
  }

  const response = await fetch( '/delete', {
    method:'POST',
    body 
  })
  const res = await response.json()
  
  if (response.status === 400) {
    alert("Student not found");
    return;
  } else if (response.status == 200) {
    removeFromTable(name.value);
    updateClassStats(res.stats);
  }
}

window.onload = async function() {
  const submitButton = document.getElementById("submit");
  const deleteButton = document.getElementById("delete");
  submitButton.onclick = handleAdd;
  deleteButton.onclick = handleDelete;

  // populate the table with the existing students (if any)
  const response = await fetch( '/students', { method:'GET' } )
  const res = await response.json()
  if (res.students) {
    res.students.forEach( student => addStudentToTable( student ) )
  }
  updateClassStats(res.stats);
}
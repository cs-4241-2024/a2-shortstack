const submit = async function(event) {
  event.preventDefault();

  const form = document.getElementById('blogform');
  const formData = new FormData(form);

  const blogMetaData = {
    yourname: null,
    title: formData.get('title'),
    content: formData.get('content'),
    wordCount: formData.get('content').split(' ').length,
    publication_date: new Date().toLocaleString(),
  };
  let response;

  try {
     response = await fetch('/submit', {
      method: 'POST',
      body: JSON.stringify(blogMetaData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('response:', response);
      return;
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return;
  }

  if (!response.ok) {
    console.error('response:', response);
    return;
  }

  addPostToTable(blogMetaData);

  form.reset();
};

const fetchPosts = async function() { // for when user reloads page
  const response = await fetch('/posts', {
    method: 'GET',
  });

  if (response.ok) {
    const posts = await response.json();
    posts.forEach(post => addPostToTable(post));
  } else {
    console.error('Failed to fetch posts:', response);
  }
};

const addPostToTable = function(post) {

  if (!post || !post.title || !post.content) {
    return; 
  }
  const postTableBody = document.getElementById('postTableBody');
  const row = document.createElement('tr');
  row.setAttribute('data-title', post.title);

  const titleCell = document.createElement('td');
  titleCell.textContent = post.title;
  row.appendChild(titleCell);

  const contentCell = document.createElement('td');
  contentCell.textContent = post.content;
  row.appendChild(contentCell);

  const wordCountCell = document.createElement('td');
  wordCountCell.textContent = post.wordCount;
  row.appendChild(wordCountCell);

  const dateCell = document.createElement('td');
  dateCell.textContent = post.publication_date;
  row.appendChild(dateCell);

  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑️';
  deleteButton.classList.add('delete-btn');
  deleteButton.onclick = handleDelete; 
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  const editCell = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-btn');
  editButton.onclick = handleEdit; 
  editCell.appendChild(editButton);
  row.appendChild(editCell);


  postTableBody.appendChild(row);
};

const handleDelete = function(event) {
  const row = event.target.closest('tr');
  const dataId = row.getAttribute('data-title');

  row.remove(); 

  fetch('/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: dataId }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data deleted successfully:', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

const handleEdit = (event) => {
  const row = event.target.closest('tr');
  const cells = row.querySelectorAll('td');

  cells.forEach((cell, index) => {
    if (index < 5 && !cell.querySelector('input')) { 
      const input = document.createElement('input');
      input.value = cell.textContent;
      cell.innerHTML = ''; 
      cell.appendChild(input);
    }
  });

  const editButton = row.querySelector('.edit-btn');
  editButton.textContent = 'Save';
  editButton.onclick = handleSave; 
};

const handleSave = async (event) => {
  const row = event.target.closest('tr');
  const cells = row.querySelectorAll('td');

  const titleInput = cells[1].querySelector('input');
  const contentInput = cells[2].querySelector('input');

  if (!titleInput || !contentInput) {
    console.error('Input fields not found');
    return;
  }

  const updatedData = {
    title: titleInput.value,
    content: contentInput.value,
    wordCount: contentInput.value.split(' ').length,
    publication_date: new Date().toLocaleString(),
  };

  const response = await fetch('/update', {
    method: 'PUT',
    body: JSON.stringify(updatedData),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    cells.forEach((cell, index) => {
      if (index < 5) {
        cell.textContent = Object.values(updatedData)[index];
      }
    });

    event.target.textContent = 'Edit'; 
    event.target.onclick = handleEdit; 
  } else {
    console.error('Failed to save updated data');
  }
};

window.onload = async function() {
  const authResponse = await fetch('/check-auth');
  const authData = await authResponse.json();

  if (!authData.loggedIn) {
    window.location.href = 'index.html';
    return;
  }

  const button = document.querySelector("button");
  button.onclick = submit;
  fetchPosts(); 

  const editButtons = document.querySelectorAll('.edit-btn');
  editButtons.forEach(editButton => {
    editButton.onclick = handleEdit;
  });
};
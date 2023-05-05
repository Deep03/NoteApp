var searchQuery = "";
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
const indexToShow = [];
// const keys = Object.keys(notes[0]);
// console.log(keys);

const addBox = document.querySelector('.add-box');

function get_index(title) {
  for (let i=0; i<notes.length; i++) {
    if (title == notes[i].title) {
      return i;
    }
  }
  return -1;
}

function search() {
  // Retrieve the value of the search input field
  searchQuery = document.getElementById("note-title").value;

  // Do something with the search query, such as display search results

  // Clear the search input field
  document.getElementById("note-title").value = "";
  showNotes(searchQuery);
  noteShow();
}

function noteShow() {
  for (let i = 0; i < indexToShow.length; i++) {
    let noteTitle = notes[indexToShow[i]].title;
    let noteDescription = notes[indexToShow[i]].description;
    let noteDate = notes[indexToShow[i]].date;
    let liEl = `<li class="note">
      <div class="details">
        <p>${noteTitle}</p>
        <span>${noteDescription}</span>
      </div>
      <div class="bottom-content">
        <span>${noteDate}</span>
        <div class="settings">
          <i onClick="updateNote(${indexToShow[i]}, '${noteTitle}', '${noteDescription}')" class="uil uil-edit"></i>
          <i onClick="deleteNote(${indexToShow[i]})" class="uil uil-trash"></i>
        </div>
      </div>
    </li>`;
    addBox.insertAdjacentHTML('afterend', liEl);
  }
}


function showNotes(notetitle) {
  indexToShow.length = 0; // Clear the array before populating it again
  if (notetitle == "") {
    window.alert("No title specified!");
  }
  else {
    let i = 0; // Declare a local variable for i
    while (i < notes.length) {    
      if (notes[i].title == notetitle) {
        indexToShow.push(i);
      }
      i++;
    }
  }
}

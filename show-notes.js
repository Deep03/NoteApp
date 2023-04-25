
var searchQuery = "";
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
const indexexToShow = [];
console.log(notes[0].title);
function search() {
    // Retrieve the value of the search input field
    searchQuery = document.getElementById("note-title").value;
    
    // Do something with the search query, such as display search results
    
    // Clear the search input field
    document.getElementById("note-title").value = "";
    showNotes(searchQuery);
}

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index)=>{
        let liEl=`<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="updateNote(${index}, '${note.title}', '${note.description}')"  class="uil uil-edit"></i>
                                <i onClick="deleteNote(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML('afterend', liEl);
    });
}

function showNotes(notetitle) {
    if (notetitle == "") {
        window.alert("No title specified!");
    }
    i = 0;
    while (i < notes.length) {    
        if (notetitle[i].title == notetitle) {
            indexexToShow.push(i);
            i = i + 1;
        }
        else {
            i = i + 1;
        }
    }
} 

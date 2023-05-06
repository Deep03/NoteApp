const addBox = document.querySelector('.add-box');
const searchBox = document.querySelector('.search-box');

// popBox
addpopupBox = document.querySelector('.add-popup-box'),
addpopupTitle = addpopupBox.querySelector('header p'),
searchpopupBox = document.querySelector('.search-popup-box'),
searchpopupTitle = searchpopupBox.querySelector('header p'),

// extra buttons
addcloseicon = document.querySelector('header i');
const searchcloseIcon = document.querySelector('.search-popup-box i');
addtitleEl = document.querySelector('input'),
adddescEl = document.querySelector('textarea'),
searchtitleEl = document.querySelector('input'),
addBtn = document.querySelector('button ');
searchBtn = document.querySelector('button ');

const months= ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


// notes json file
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false, updateId;

// shows all the notes
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

// function call to show notes
showNotes();

// function to delete the damn note
function deleteNote(noteId) {
    let confirmDelete= confirm("Are you sure you want to delete this note?");
    if(!confirmDelete) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}


// function to edit the damn note
function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    addtitleEl.value = title;
    adddescEl.value = desc;
    addBtn.innerText = 'Edit Note';
    addpopupTitle.innerText = 'Editing a Note';
}



// event handler for add
addBox.addEventListener('click', ()=>{
    addtitleEl.focus();
    addpopupBox.classList.add('show')
});

// event handler for search
searchBox.addEventListener('click', ()=>{
    window.open('show-notes.html');
});


// add close icon
addcloseicon.addEventListener('click', ()=>{
    isUpdate = false;
    addtitleEl.value = '';
    adddescEl.value = '';
    addBtn.innerText = 'Add Note';
    addpopupTitle.innerText = 'Add a new Note';
    addpopupBox.classList.remove('show');
});


// search icon close
searchcloseIcon.addEventListener('click', ()=>{
    isUpdate = false;
    searchtitleEl.value = '';
    searchBtn.innerText = 'Search Note';
    searchpopupTitle.innerText = 'Search for a Note';
    searchpopupBox.classList.remove('show');
});



addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let noteTitle = addtitleEl.value,
    noteDesc = adddescEl.value;
    if (noteTitle || noteDesc) {
        let dateEl= new Date(),
        month = months[dateEl.getMonth()],
        day = dateEl.getDate(),
        year = dateEl.getFullYear();


        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        }
        
        if (!isUpdate) {
            notes.push(noteInfo);
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        addcloseicon.click();
        showNotes();
    }
});


searchBtn.addEventListener('click', (e)=>{
    let noteTitle = addtitleEl.value,
    index = get_index(noteTitle);
    if (index != -1) {
        searchcloseIcon.click();
        showNotes(null, index);
    }
});


function get_index(title) {
    for(let i=0; i<notes.length; i++) {
        if (title == notes[i].title) {
            return i;
        }
    }
    return -1;
}


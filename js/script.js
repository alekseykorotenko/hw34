const notesBtn = document.getElementById('notes-btn');
const notesInput = document.getElementById('notes-input');
const notes = document.querySelector('.notes');

function rendering() {
  notes.innerHTML = '';
  const noteList = document.createElement('ul');
  let noteItem;
  let noteDel;
  for (let i = 0; i < localStorage.length; i++) {
    noteItem = document.createElement('li');
    noteItem.id = `${localStorage.key(i)}`;
    noteItem.classList = 'note-item';
    noteItem.innerHTML = `<p class='note-text'>${localStorage.getItem(localStorage.key(i))}</p>`;

    const buttons = document.createElement('div');
    buttons.classList = 'note-btns';

    noteDel = document.createElement('button');
    noteDel.innerText = 'Del';
    noteDel.id = `${localStorage.key(i)}`;
    noteDel.classList = 'note-del';

    buttons.appendChild(noteDel);
    noteItem.appendChild(buttons);
    noteList.appendChild(noteItem);
  }
  notes.appendChild(noteList);
  const delBtn = document.querySelectorAll('.note-del');
  deleteNotes(delBtn);
}

notesBtn.addEventListener('click', () => {
  if (notesInput.value != '') {
    const note = notesInput.value;
    setLocalStorage(note);
    rendering();
  }
});
rendering();

let count = 0;

function setLocalStorage(note) {
  count++;
  console.log(count);
  if (!localStorage.getItem(`note${count}`)) {
    localStorage.setItem(`note${count}`, note);
  } else if (localStorage.getItem(`note${count}`)) {
    setLocalStorage(count + 1);
  }
}

function deleteNotes(array) {
  array.forEach((el) => {
    el.addEventListener('click', () => {
      console.log(el);
      localStorage.removeItem(el.id);
      document.getElementById(el.id).remove();
    });
  });
}

const editNote = document.querySelectorAll('.note-text');

editNote.forEach((el) => {
  el.addEventListener('dblclick', () => {
    let getInnerHtml = el.textContent;
    let editArea = document.createElement('input');
    editArea.value = getInnerHtml;
    editArea.onblur = () => {
      let getValue = editArea.value;
      localStorage.removeItem(el.parentElement.id);
      localStorage.setItem(el.parentElement.id, editArea.value);
      editArea.parentNode.innerHTML = getValue;
    };

    el.innerHTML = '';
    el.appendChild(editArea);
    editArea.focus();
  });
});

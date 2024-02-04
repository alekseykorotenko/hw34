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
    noteItem.innerHTML = localStorage.getItem(localStorage.key(i));
    noteDel = document.createElement('button');
    noteDel.innerText = 'Del';
    noteDel.id = `${localStorage.key(i)}`;
    noteDel.classList = 'note-del';
    noteItem.appendChild(noteDel);
    noteList.appendChild(noteItem);
  }
  notes.appendChild(noteList);
  const delBtn = document.querySelectorAll('.note-del');
  //   console.log(notes);
  console.log(delBtn);
  delBtn.forEach((el) => {
    el.addEventListener('click', () => {
      console.log(el);
      localStorage.removeItem(el.id);
      document.getElementById(el.id).remove();
    });
  });
}

// window.addEventListener('load', () => {
// });

notesBtn.addEventListener('click', () => {
  if (notesInput.value != '') {
    const note = notesInput.value;
    setLocalStorage(note);
    //   rendering();
    console.log(note);
    rendering();
    //   location.reload();
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

let editButton = document.getElementById('edit');
let saveButton = document.getElementById('save');
let cancelButton = document.getElementById('cancel');
let userInputs = document.querySelectorAll('.userInput');
let employeeName = document.getElementById('employeeName');
editButton.addEventListener('click', edit);
saveButton.addEventListener('click', save);
cancelButton.addEventListener('click', cancel);

//MUST PUT DATA INTO DB FIRST
employeeName.innerHTML = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;

function edit() {
    saveButton.classList.remove('hidden');
    cancelButton.classList.remove('hidden');
    editButton.classList.add('disabled');
    userInputs.forEach(input => {
        input.disabled = false;
        input.style.backgroundColor = 'white';
    });
}
function save() {
    setInputBackground();
    employeeName.innerHTML = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;
}
function cancel() {
    setInputBackground();
}
function setInputBackground() {
    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    editButton.classList.remove('disabled');
    if (localStorage.getItem('darkMode') === 'true') {
        userInputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = 'rgb(75, 85, 103)';
        });
    } else {
        userInputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = 'rgb(6, 23, 59)';
        });
    }
}
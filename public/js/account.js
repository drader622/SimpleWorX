let editButton = document.getElementById('edit'),
    saveButton = document.getElementById('save'),
    cancelButton = document.getElementById('cancel'),
    userInputs = document.querySelectorAll('.userInput'),
    employeeName = document.getElementById('employeeName');
editButton.addEventListener('click', edit);
cancelButton.addEventListener('click', cancel);

employeeName.innerHTML = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;

function edit() {
    saveButton.classList.remove('hidden');
    cancelButton.classList.remove('hidden');
    editButton.classList.add('disabled');
    userInputs.forEach(input => {
        input.disabled = false;
        input.classList.add('whiteBackground');
    });
}
function cancel() {
    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    editButton.classList.remove('disabled');
    userInputs.forEach(input => {
        input.disabled = true;
        input.classList.remove('whiteBackground');
    });
}
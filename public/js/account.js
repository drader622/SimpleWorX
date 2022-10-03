let personalEditButton = document.getElementById('personalEdit'),
    personalSaveButton = document.getElementById('personalSave'),
    personalCancelButton = document.getElementById('personalCancel'),
    employeeName = document.getElementById('employeeName'),
    imageEditButton = document.getElementById('imageEdit'),
    imageSaveButton = document.getElementById('imageSave'),
    imageCancelButton = document.getElementById('imageCancel'),
    imageInput = document.querySelector('.imageFile'),
    titleBox = document.querySelector('.empTitle'),
    titleDropDown = document.querySelector('.titleDropDown'),
    crewBox = document.querySelector('.empCrew'),
    crewDropDown = document.querySelector('.crewDropDown'),
    deptBox = document.querySelector('.empDept'),
    deptDropDown = document.querySelector('.deptDropDown'),
    employmentEditButton = document.getElementById('employmentEdit'),
    employmentSaveButton = document.getElementById('employmentSave'),
    employmentCancelButton = document.getElementById('employmentCancel'),
    personalInputs = document.querySelectorAll('.personalForm .userInput'),
    employmentInputs = document.querySelectorAll('.employmentForm .input');

//Event Listeners
personalEditButton.addEventListener('click', personalEdit);
personalCancelButton.addEventListener('click', personalCancel);
imageEditButton.addEventListener('click', imageEdit);
imageCancelButton.addEventListener('click', imageCancel);
employmentEditButton.addEventListener('click', employmentEdit);
employmentCancelButton.addEventListener('click', employmentCancel);

employeeName.innerHTML = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;

function personalEdit() {
    personalSaveButton.classList.remove('hidden');
    personalCancelButton.classList.remove('hidden');
    personalEditButton.classList.add('disabled');
    personalInputs.forEach(input => {
        input.disabled = false;
        input.classList.add('whiteBackground');
    });
}
function personalCancel() {
    personalSaveButton.classList.add('hidden');
    personalCancelButton.classList.add('hidden');
    personalEditButton.classList.remove('disabled');
    personalInputs.forEach(input => {
        input.disabled = true;
        input.classList.remove('whiteBackground');
    });
}
function imageEdit() {
    imageSaveButton.classList.remove('hidden');
    imageCancelButton.classList.remove('hidden');
    imageInput.classList.remove('hidden');
    imageEditButton.classList.add('disabled');
}
function imageCancel() {
    imageSaveButton.classList.add('hidden');
    imageCancelButton.classList.add('hidden');
    imageInput.classList.add('hidden');
    imageEditButton.classList.remove('disabled');
}
function employmentEdit() {
    titleBox.classList.add('hidden');
    titleDropDown.classList.remove('hidden');
    if (titleBox.value === '') { titleDropDown.value = 'Manager' }
    else { titleDropDown.value = titleBox.value }

    crewBox.classList.add('hidden');
    crewDropDown.classList.remove('hidden');
    if (crewBox.value === '') { crewDropDown.value = 'A' }
    else { crewDropDown.value = crewBox.value }

    deptBox.classList.add('hidden');
    deptDropDown.classList.remove('hidden');
    deptDropDown.value = deptBox.value
    // if (deptBox.value === '') { deptDropDown.value = 'Canline' }
    // else { deptDropDown.value = deptBox.value };

    employmentSaveButton.classList.remove('hidden');
    employmentCancelButton.classList.remove('hidden');
    employmentEditButton.classList.add('disabled');
    employmentInputs.forEach(input => {
        input.disabled = false;
        input.classList.add('whiteBackground');
    });
}
function employmentCancel() {
    titleDropDown.classList.add('hidden');
    titleBox.classList.remove('hidden');
    crewDropDown.classList.add('hidden');
    crewBox.classList.remove('hidden');
    deptDropDown.classList.add('hidden');
    deptBox.classList.remove('hidden');
    employmentSaveButton.classList.add('hidden');
    employmentCancelButton.classList.add('hidden');
    employmentEditButton.classList.remove('disabled');
    employmentInputs.forEach(input => {
        input.disabled = true;
        input.classList.remove('whiteBackground');
    });
}
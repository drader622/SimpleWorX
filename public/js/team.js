let selectedNameText = document.getElementById('selectedName');
let selectedTitleText = document.getElementById('selectedTitle');
let selectedCrewText = document.getElementById('selectedCrew');
let selectedImage = document.querySelector('#selectedImage img');
let selectedEmailText = document.getElementById('selectedEmail');
let teamMembers = document.querySelectorAll('.member');
teamMembers.forEach(member => member.addEventListener('click', getSelectedMemberName));
load();

function load() {
    console.log(document.querySelector('.employeeDetails').children[0].innerText)
    let selectedUserName = document.querySelector('.employeeDetails').children[0].innerText;
    getUserInfo(selectedUserName);
}

function getSelectedMemberName() {
    resetSelected();
    this.classList.add('selectedMember');
    let selectedName = document.querySelector('.selectedMember #empName').innerText;
    selectedNameText.innerText = selectedName;
    getUserInfo(selectedName);


}

async function getUserInfo(memberName) {
    try {
        const response = await fetch(`/getUser/${memberName}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },

        })

        const selectedUser = await response.json();

        displaySelected(selectedUser);

    } catch (err) {
        console.log(err);
    }
}

function displaySelected(selectedUser) {
    selectedNameText.innerText = `${selectedUser.firstName} ${selectedUser.lastName}`;
    selectedTitleText.innerText = `${selectedUser.title}`;
    selectedCrewText.innerText = `${selectedUser.crew} Crew`;
    selectedImage.src = `${selectedUser.image}`;
    selectedEmailText.innerText = `${selectedUser.email}`;
}

function resetSelected() {
    teamMembers.forEach(member => member.classList.remove('selectedMember'));
}
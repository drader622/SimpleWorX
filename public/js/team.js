let selectedNameText = document.getElementById('selectedName');
let selectedTitleText = document.getElementById('selectedTitle');
let selectedCrewText = document.getElementById('selectedCrew');
let selectedImage = document.querySelector('#selectedImage img');
let selectedEmailText = document.getElementById('selectedEmail');
let teamMembers = document.querySelectorAll('.member');
teamMembers.forEach(member => member.addEventListener('click', selectMember));
teamMembers[0].classList.add('selectedMember');

function selectMember() {
    resetSelected();
    this.classList.add('selectedMember');
    let selectedName = document.querySelector('.selectedMember #empName').innerText;
    selectedNameText.innerText = selectedName;
    getUser(selectedName);
}

async function getUser(memberName) {
    try {
        const response = await fetch(`/getUser/${memberName}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },

        })

        const selectedUser = await response.json();

        selectedNameText.innerText = `${selectedUser.firstName} ${selectedUser.lastName}`;
        selectedTitleText.innerText = `${selectedUser.title}`;
        selectedCrewText.innerText = `${selectedUser.crew} Crew`;
        selectedImage.src = `${selectedUser.image}`;
        selectedEmailText.innerText = `${selectedUser.email}`;
    } catch (err) {
        console.log(err);
    }
}

function resetSelected() {
    teamMembers.forEach(member => member.classList.remove('selectedMember'));
}
let SAVED = false;

let darkMode = localStorage.getItem('darkMode');
if (darkMode === null) localStorage.setItem('darkMode', false);
if (darkMode === 'true') {
    SAVED = true;
    switchModes();
}

document.querySelector('#switch').addEventListener('click', switchModes);

function switchModes() {
    darkMode = localStorage.getItem('darkMode');
    let sortOptions = document.querySelector('#sortOptions'),
        darkBackgroundArr = document.querySelectorAll('.darkBackground'),
        darkLetteringArr = document.querySelectorAll('.darkLettering'),
        requestsBackground = document.querySelectorAll('.request'),
        htmlDOM = document.querySelector('html'),
        logo = document.querySelector('.logo'),
        logoutText = document.querySelector('.logout'),
        toggleSwitch = document.getElementById('switch'),
        woInfo = document.querySelector('.woInfo');

    if (darkMode === 'false' || SAVED) {
        darkBackgroundArr.forEach(element => {
            element.style.backgroundColor = 'rgb(75, 85, 103)';
            element.style.color = 'rgb(6, 23, 59)';
        });
        darkLetteringArr.forEach(element => {
            element.style.color = 'rgb(75, 85, 103)';
        });
        requestsBackground.forEach(element => {
            element.style.backgroundColor = 'rgb(75, 85, 103)';
        });
        htmlDOM.style.background = 'rgb(25, 25, 25)';
        logo.classList.add('filter-dark');
        logoutText.style.color = 'rgb(6, 23, 79)';

        if (sortOptions) {
            sortOptions.style.backgroundColor = 'rgb(25, 25, 25)';
            sortOptions.style.color = 'rgb(75, 85, 103)';
            sortOptions.style.borderColor = 'rgb(75, 85, 103)';
        }
        toggleSwitch.checked = true;
        toggleSwitch.addEventListener('click', switchModes);
        localStorage.setItem('darkMode', true);
        SAVED = false;
    } else {
        darkBackgroundArr.forEach(element => {
            element.style.backgroundColor = 'rgb(6, 23, 59)';
            element.style.color = 'rgb(132, 149, 180)';
        });
        darkLetteringArr.forEach(element => {
            element.style.color = 'rgb(132, 149, 180)';
        });
        requestsBackground.forEach(element => {
            element.style.backgroundColor = 'rgb(6, 23, 59)';
        });
        htmlDOM.style.backgroundColor = 'rgb(255, 255, 255)';
        logo.classList.remove('filter-dark');
        logoutText.style.color = 'rgb(132, 149, 180)';

        if (sortOptions) {
            woInfo.style.backgroundColor = 'rgb(255, 255, 255)';
            woInfo.style.color = 'rgb(0, 0, 0)';
            sortOptions.style.backgroundColor = 'rgb(255, 255, 255)';
            sortOptions.style.color = 'rgb(6, 23, 59)';
            sortOptions.style.borderColor = 'rgb(6, 23, 59)';
        }
        localStorage.setItem('darkMode', false);
    }
}
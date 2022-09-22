let sortOptions = document.querySelector('#sortOptions'),
    darkLetteringArr = document.querySelectorAll('.darkLettering'),
    htmlDOM = document.querySelector('html'),
    logo = document.querySelector('.logo'),
    logoutText = document.querySelector('.logout'),
    toggleSwitch = document.getElementById('switch'),
    woInfo = document.querySelector('.woInfo'),
    navLines = document.querySelectorAll('.line'),
    SAVED = false,
    darkMode = localStorage.getItem('darkMode'),
    darkModeElements = document.querySelectorAll('.darkMode');;

toggleSwitch.addEventListener('click', switchModes);

if (darkMode === null) localStorage.setItem('darkMode', false);
if (darkMode === 'true') {
    SAVED = true;
    switchModes();
}

function switchModes() {
    darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'false' || SAVED) {
        darkModeElements.forEach(el => el.classList.add('dark'));
        htmlDOM.classList.add('htmlDark');
        logo.classList.add('filter-dark');
        navLines.forEach(line => line.classList.add('navLinesDark'));

        if (sortOptions) {
            sortOptions.classList.add('sortOptionsDark');
        }
        toggleSwitch.checked = true;
        localStorage.setItem('darkMode', true);
        SAVED = false;
    } else {
        darkModeElements.forEach(el => el.classList.remove('dark'));
        htmlDOM.classList.remove('htmlDark');
        logo.classList.remove('filter-dark');
        navLines.forEach(line => line.classList.remove('navLinesDark'));

        if (sortOptions) {
            sortOptions.classList.remove('sortOptionsDark');
        }
        localStorage.setItem('darkMode', false);
    }
}
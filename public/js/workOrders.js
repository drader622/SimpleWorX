let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
let RELOAD = false,
    WORK_ORDER_NUM,
    RESPOND = false,
    CLOSE = false,
    REQUESTS = new Object;

document.querySelector('#sortOptions').addEventListener('change', sortWOList);
document.querySelector('.respond').addEventListener('click', respondToWorkOrder);
document.querySelector('.close').addEventListener('click', closeWorkOrder);
document.querySelector('.delete').addEventListener('click', deleteWorkOder);

//PUSHER
var pusher = new Pusher('0badd11ed0483edfa1ed', {
    cluster: 'us2'
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function (data) {
    if (data.reload === true) {
        loadPage(data.woNum)
    } else {
        location.reload();
        document.querySelector('.woInfo').classList.add('hidden');
    }
});

// ONLOAD METHODS
styleRequestLis();
getRequests();

// NON SERVER FUNCTIONALITY
function getDepartmentName(num) {
    switch (Number(num)) {
        case 1:
            return 'Dept Lead';
            break;
        case 2:
            return 'Electrician';
            break;
        case 3:
            return 'Machinist';
            break;
        case 4:
            return 'Millwright';
            break;
        case 5:
            return 'Warehouse';
            break;
    }
}
function getMachineName(num) {
    switch (Number(num)) {
        case 1:
            return 'SP';
            break;
        case 2:
            return 'BAL';
            break;
        case 3:
            return 'LNR';
            break;
        case 4:
            return 'CP';
            break;
        case 5:
            return 'AB';
            break;
    }
}
function getTime(woTime) {
    let hour = '';
    let half,
        time;
    for (let i = 0; i < woTime.length; i++) {
        if (woTime.charAt(i) !== ':')
            hour += woTime.charAt(i);
        else
            break;
    }
    if (Number(hour) === 0) {
        hour = 12;
        minutes = woTime.slice(-2);
        half = 'am';
        time = `${hour}:${minutes}${half}`;
    } else if (Number(hour) < 12) {
        half = 'am';
        time = `${woTime}${half}`;
    } else {
        half = 'pm';
        hour -= 12;
        minutes = woTime.slice(-2);
        time = `${hour}:${minutes}${half}`;
    }
    return time;
}
function showWoInfo(data) {
    let woNumSpan = document.querySelector('#woNum'),
        statusSpan = document.querySelector('#status'),
        deptSpan = document.querySelector('#department'),
        locSpan = document.querySelector('#location'),
        detailSpan = document.querySelector('#detail'),
        reqDateSpan = document.querySelector('#reqDate'),
        reqTimeSpan = document.querySelector('#reqTime'),
        reqBySpan = document.querySelector('#reqBy'),
        resEmpSpan = document.querySelector('#resEmp'),
        resDateSpan = document.querySelector('#resDate'),
        resTimeSpan = document.querySelector('#resTime'),
        solDetail = document.querySelector('.solDetail'),
        respondBtn = document.querySelector('.respond'),
        closeBtn = document.querySelector('.close'),
        woInfoContainer = document.querySelector('.woInfo'),
        deleteBtn = document.querySelector('.delete'),
        textArea = document.createElement('textarea');

    let dept = getDepartmentName(data.reqDept),
        machine = getMachineName(data.mach),
        reqTime = '',
        resTime = '';

    if (solDetail.innerHTML !== '') {
        solDetail.innerText = '';
    }
    if (data.reqTime !== '') {
        reqTime = getTime(data.reqTime);
    }
    if (data.resTime !== '') {
        resTime = getTime(data.resTime);
    }

    woNumSpan.innerText = `${data.workOrderNum}`;
    statusSpan.innerText = `${data.status}`;
    deptSpan.innerText = `${dept}`;
    locSpan.innerText = `${machine} ${data.mod}${data.machNum}`;
    detailSpan.innerText = data.probDetail;
    reqDateSpan.innerText = data.reqDate;
    reqTimeSpan.innerText = reqTime;
    reqBySpan.innerText = `${data.reqEmp}`;
    resEmpSpan.innerText = `${data.resEmp}`;
    resDateSpan.innerText = data.resDate;
    resTimeSpan.innerText = resTime;

    if (data.status === 'open' && !solDetail.firstChild) {
        textArea.classList.add('solDetailText');
        solDetail.appendChild(textArea);
        respondBtn.classList.remove('disabled');
        closeBtn.classList.remove('disabled');
    } else if (data.status === 'closed') {
        solDetail.innerText = data.solutionDetail;
        respondBtn.classList.add('disabled');
        closeBtn.classList.add('disabled');
    }

    if (data.status === 'closed') {
        woInfoContainer.style.borderColor = 'rgb(0, 255, 0)';
        statusSpan.style.color = 'rgb(0, 214, 0)';
    } else if (data.respondedTo === true) {
        woInfoContainer.style.borderColor = 'rgb(250, 150, 22)';
        statusSpan.style.color = 'rgb(250, 150, 22)';
        respondBtn.classList.add('disabled');
    } else {
        woInfoContainer.style.borderColor = 'rgb(200, 15, 15)';
        statusSpan.style.color = 'rgb(200, 15, 15)';
    }

    respondBtn.classList.remove('hidden');
    closeBtn.classList.remove('hidden');
    deleteBtn.classList.remove('hidden');
    woInfoContainer.classList.remove('hidden');
}
function sortWOList() {
    let requests = document.querySelectorAll('.request');
    let sortOption = document.querySelector('#sortOptions').value;
    requests.forEach(request => {
        request.classList.remove('hidden');
    });
    if (sortOption === 'open') {
        requests.forEach(request => {
            if (request.childNodes[3].innerHTML === 'closed') {
                request.classList.add('hidden');
            }
        });
    } else if (sortOption === 'closed') {
        requests.forEach(request => {
            if (request.childNodes[3].innerHTML === 'open') {
                request.classList.add('hidden');
            }
        });
    } else if (sortOption === 'responded') {
        requests.forEach(request => {
            if (!(request.childNodes[3].innerHTML === 'open' && request.childNodes[11].innerHTML === 'true')) {
                request.classList.add('hidden');
            }
        });
    }
}
function styleRequestLis() {
    let requests = document.querySelectorAll('.request');
    requests.forEach(request => {
        if (RELOAD === false) {
            request.addEventListener('click', getWorkOrderInfo);
        }
        if (request.childNodes[3].innerHTML === 'closed') {
            request.classList.add('closed');
        } else if (request.childNodes[11].innerHTML === 'true') {
            request.classList.add('reqRespondedTo');
        } else {
            request.style.color = 'rgb(200, 15, 15)'
        }
    });
}

// WORKORDER REQUESTS
async function loadPage(num) {
    try {
        const response = await fetch(`workOrders`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        if (RELOAD === true) {
            getWorkOrderInfo(num);
        } else {
            location.reload();
        }

    } catch (err) {
        console.log(err)
    }
}
async function alertOfWO(woNum) {
    try {
        const response = await fetch(`submitWO`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'reload': true,
                'woNum': woNum,
            })
        })
        const data = await response.json()
    } catch (err) {
        console.log(err)
    }
}
async function closeWorkOrder() {
    let woNum = document.querySelector('#woNum').innerText,
        solDetail = document.querySelector('.solDetail textarea').value;
    if (solDetail !== '') {
        try {
            const response = await fetch(`workOrders/closeWorkOrder/${woNum}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'solDetail': solDetail
                })
            })
            const data = await response.json();
            RELOAD = true;
            CLOSE = true;
            alertOfWO(woNum);
        } catch (err) {
            console.log(err)
        }
    } else {
        alert('Please enter the work that was done under solution detail.');
    }

}
async function deleteWorkOder() {
    let woNum = document.querySelector('#woNum').innerText;
    try {
        const response = await fetch(`workOrders/deleteWorkOrder/${woNum}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();
        RELOAD = false;
        alertOfWO(woNum);
    } catch (err) {
        console.log(err)
    }
}
async function getRequests() {
    try {
        const response = await fetch(`workOrders/getRequests`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        REQUESTS = data;
    } catch (err) {
        console.log(err)
    }
}

async function getWorkOrderInfo(num) {
    if (RELOAD === false) {
        num = (this.childNodes[1].innerHTML.slice('4'));
    }

    try {
        const response = await fetch(`workOrders/getWoInfo/${num}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()
        showWoInfo(data);
        if (RELOAD === true) {
            REQUESTS.forEach(request => {
                if (request.workOrderNum === num) {
                    let lis = document.querySelectorAll('.request');
                    lis.forEach(li => {
                        let number = li.childNodes[1].innerHTML.slice(4)
                        if (number === num) {
                            if (RESPOND === true) {
                                li.childNodes[11].innerHTML = 'true';
                                for (let i = 1; i < li.childNodes.length; i += 2) {
                                    li.childNodes[i].classList.add('reqRespondedTo');
                                }
                            }
                            if (CLOSE === true) {
                                li.childNodes[3].innerHTML = 'closed';
                                for (let i = 1; i < li.childNodes.length; i += 2) {
                                    li.childNodes[i].classList.remove('reqRespondedTo');
                                    li.childNodes[i].classList.add('closed');
                                }
                            }
                        }
                    });
                }
            });
        }
    } catch (err) {
        console.log(err)
    }
}
async function respondToWorkOrder() {
    let woNum = document.querySelector('#woNum').innerText,
        resEmp = document.querySelector('#name').innerText,
        title = document.querySelector('#title').innerText,
        currDate = new Date(),
        resDate = `${currDate.getMonth() + 1}/${currDate.getDate()}/${currDate.getFullYear()}`,
        resTime = `${currDate.getHours()}:${currDate.getMinutes()}`;

    try {
        const response = await fetch(`workOrders/respondToWorkOder/${woNum}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'resEmp': resEmp,
                'resEmpTitle': title,
                'resDate': resDate,
                'resTime': resTime,
            })
        })
        await response.json()
        RELOAD = true;
        RESPOND = true;
        alertOfWO(woNum);
    } catch (err) {
        console.log(err)
    }
}

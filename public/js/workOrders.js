let RELOAD = false,
    requestLis = document.querySelectorAll('.request'),
    sortOptionSelector = document.querySelector('#sortOptions');

sortOptionSelector.addEventListener('change', sortWOList);


//PUSHER
let temp = '0badd11ed0483edfa1ed';
var pusher = new Pusher(temp, {
    cluster: 'us2'
});

let channel = pusher.subscribe('my-channel');
channel.bind('my-event', function (data) {
    if (data.reload === true) {
        loadPage(data.woNum)
    } else {
        location.reload();
    }
});


// NON SERVER FUNCTIONALITY
function sortWOList() {
    let sortOption = sortOptionSelector.value;
    requestLis.forEach(request => {
        request.classList.remove('hidden');
    });
    if (sortOption === 'open') {
        requestLis.forEach(request => {
            if (request.childNodes[3].innerHTML === 'closed') {
                request.classList.add('hidden');
            }
        });
    } else if (sortOption === 'closed') {
        requestLis.forEach(request => {
            if (request.childNodes[3].innerHTML === 'open') {
                request.classList.add('hidden');
            }
        });
    } else if (sortOption === 'responded') {
        requestLis.forEach(request => {
            if (!(request.childNodes[3].innerHTML === 'open' && request.childNodes[11].innerHTML === 'true')) {
                request.classList.add('hidden');
            }
        });
    }
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


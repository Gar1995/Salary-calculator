'use strict'
// Intro-page
const navigateToNext = function () {
    const btnNext = document.querySelector('#intro-btn-next');
    const btnSkip = document.querySelector('#intro-btn-skip');


    // skip button
    const navToMainPage = () => {
        document.getElementById("user-info").classList.remove('hidden');
        document.querySelector('#welcome').classList.add('hidden')
    }

    btnSkip.addEventListener('click', navToMainPage);

    // next button
    // btnNext.addEventListener('click', ?)


    // welcome page intro and pagination switch to next
    const introSwitchToNext = () => {
        const paginationNumbers = document.querySelectorAll('.pgn-btn');
        const introPages = document.querySelector('#welcome').querySelectorAll('.intro');
        for (let i = 0; i < paginationNumbers.length; i++) {
            const btnActive = paginationNumbers[i];
            btnActive.addEventListener('click', () => {
                if (btnActive.classList.contains('active') && !introPages[i].contains('hidden')) {
                    return false;
                } else {
                    document.querySelector('.active').classList.remove('active');
                    btnActive.classList.add('active');
                    document.querySelector('.visible').classList.replace('visible', 'hidden');
                    introPages[i].classList.replace('hidden', 'visible')
                }
            })
        }
    }
    introSwitchToNext()

    const changeBtnContent = () => {
        const lastBtn = document.querySelector('.pgn-btn-4')
        if (lastBtn.classList.contains('active')) {
            btnNext.textContent = 'Սկսել';
            document.querySelector('#intro-btn-next').addEventListener('click', navToMainPage)
        }
    };
    document.querySelector('.pgn-btn-4').addEventListener('click', changeBtnContent)


// Code for swiping/ need to test and check
let touchstartX = 0
let touchendX = 0

function checkDirection() {
    if (touchendX < touchstartX) alert('swiped left!')
    if (touchendX > touchstartX) alert('swiped right!')
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
})

// -----------------------------------------------
const getName = () => {
    const name = document.querySelector("#name-value").value;
    const nameSpan = document.querySelector("#name-span");
    if (name !== "") {
        nameSpan.innerText = `${name} `
        document.getElementById("welcome").classList.add('hidden')
        document.getElementById("user-info").classList.add('hidden')
        document.getElementById("select-mode").classList.remove('hidden')
        console.log(name);
    } else {
        document.getElementById('name-value').style.outline = '4px solid';
        document.getElementById('name-value').style.outlineColor = 'red';
        console.log(document.getElementById('user-info'))
    }
    return name;
}

// Get the status if selected mode (0 or 1)
const getStat = () => {
    const statArr = document.querySelectorAll('.mode-checkbox');
    for (let i = 0; i < statArr.length; i++) {
        const status = statArr[i];
        if (status.checked) {
            const selectedCardNumber = i + 1;
            return selectedCardNumber;
        }
    }
}


//  INFO MESSAGE MODAL
const runModal = () => {
    const modal = document.querySelector('.info-message-modal');
    const overlay = document.querySelector('.overlay');
    const btnClose = document.querySelector('#back-icon');

    document.querySelector("#mode-info").addEventListener('click', function () {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });

    btnClose.addEventListener('click', function () {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    });
}
runModal()


const toMainMenu = () => {
    getStat();

    if (getStat() !== undefined) {
        const container = document.querySelector("main");
        const name = document.getElementById("name-value").value;
        document.querySelector("#select-mode").classList.add('hidden');
        container.classList.remove('hidden');
        document.querySelector("#user-name-info").textContent = `${name} `;
        chooseDayTime()
    }
}

// welcome message daytime selector
const chooseDayTime = () => {
    const date = new Date();
    let currentTime = date.getHours();

    switch (currentTime) {
        case currentTime >= 6 && currentTime < 12:
            document.querySelector('#day-time-info').textContent = 'առավոտ';
            break;
        case currentTime === 12:
            document.querySelector('#day-time-info').textContent = 'կեսօր';
            break;
        case currentTime > 12 && currentTime < 17:
            document.querySelector('#day-time-info').textContent = "օր";
            break
        case currentTime >= 17 && currentTime <= 22:
            document.querySelector('#day-time-info').textContent = "երեկո";
            break
        case currentTime > 22 || currentTime < 6:
            document.querySelector('#day-time-info').textContent = "ուշ գիշեր";
    }
}
chooseDayTime()

// welcome message time
const runTime = () => {
    var dateTime = new Date().toDateString();
    document.querySelector("#date").textContent = dateTime;

    function refreshTime() {
        const timeDisplay = document.querySelector("#date");
        const dateString = new Date().toLocaleString();
        const formattedString = dateString.replace(", ", " - ");
        timeDisplay.textContent = formattedString;
    }
    setInterval(refreshTime);
}
runTime()

// card input number
$(document).ready(function () {
    $('.count').prop('disabled', true);

    $(document).on('click', '.plus', function () {
        $('.count').val(parseInt($('.count').val()) + 1);
    });

    $(document).on('click', '.minus', function () {
        $('.count').val(parseInt($('.count').val()) - 1);

        if ($('.count').val() == 0) {
            $('.count').val(1);
        }
    });
});


// Carousel
const track = document.querySelector(".track");
let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = (e) => {
    initialPosition = e.pageX;
    moving = true;
    const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
    console.log(transformMatrix);
    if (transformMatrix !== 'none') {
        // transform = parseInt(transformMatrix.split(','[4].trim()));
        console.log(parseInt(Number(transformMatrix.split(',')[4].trim())));
    }
}

const gestureMove = (e) => {
    if (moving) {
        const currentPosition = e.pageX;
        const diff = currentPosition - initialPosition;
        track.style.transform = `translateX(${transform + diff}px)`;
    }
};

const gestureEnd = (e) => {
    moving = false;
}
if (window.PointerEvent) {
    window.addEventListener('pointerdown', gestureStart);
    window.addEventListener('pointermove', gestureMove);
    window.addEventListener('pointerup', gestureEnd);
} else {
    window.addEventListener('mousedown', gestureStart);
    window.addEventListener('mousemove', gestureMove);
    window.addEventListener('mouseup', gestureEnd);
}





// Modals

// const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
// const btnOpenModal = document.querySelector(".butn-open");
// const btnCloseModal = document.querySelector(".butn-close");

// const openModal = function () {
//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
// };
// btnOpenModal.addEventListener('click', openModal)
// const closeModal = function () {
//     modal.classList.add('hidden');
//     overlay.classList.add('hidden');
// };

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);


// card Check

// const cards = document.querySelectorAll('.post-card');
// const checkStatus = document.querySelectorAll('.cbx');


// for (let i = 0; i < cards.length; i++) {
//     cards[i].addEventListener('click', () => {
//         let status = checkStatus[i].querySelector('input');
//         if (!status.checked) {
//             checkStatus[i].querySelector('input').checked = true;
//         } else if (status.checked) {
//             checkStatus[i].querySelector('input').checked = false;
//         }
//         // checkStatus[i].querySelector('input').checked = 'true';
//     })
// }
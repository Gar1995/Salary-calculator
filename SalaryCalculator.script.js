// 'use strict'
// Intro-page
const btnNext = document.querySelector('#intro-btn-next');
const btnPrev = document.querySelector('#intro-btn-prev');
const paginationNumbers = document.querySelectorAll('.pgn-btn');
const introPages = document.querySelector('#welcome').querySelectorAll('.intro');

// welcome page pagination switch to next
// 
// function paginationSwitchToNext () {
for (let i = 0; i < paginationNumbers.length; i++) {
    paginationNumbers[i].addEventListener('click', () => {
        const btnActive = paginationNumbers[i];
        // const introActive = introPages[i];
        if (btnActive.classList.contains('active')) {
            return false;
        } else {
            document.querySelector('.active').classList.remove('active');
            btnActive.classList.add('active');
        }
        if (i > 0) {
            btnPrev.classList.remove('hidden')
        } else {
            btnPrev.classList.add('hidden')
        }
    })
}
// }
// paginationSwitchToNext()

//synchronizing the pagination switching with intro page switching
const introSwitchToNext = () => {
    for (let j = 0; j < paginationNumbers.length; j++) {
        const activeNumber = paginationNumbers[j];
        activeNumber.addEventListener('click', () => {
            for (let k = 0; k < introPages.length; k++) {
                introPages[k].classList.add('hidden');
            }
            document.querySelector(`.intro-btn-${j + 1}`).classList.remove('hidden');
        })
    }
}

// const btnSwitchToNext = () => {
//     const activeIntro = document.querySelector('.active').textContent;
//     // if (activeIntro.textContent === 1) {
//     document.querySelector(`.intro-btn-${+activeIntro + 1}`).classList.remove('hidden');
//     document.querySelector(`.intro-btn-${activeIntro}`).classList.add('hidden');
//     // }
//     console.log(introSwitchToNext())
// }

// console.log(activePage);


btnNext.addEventListener('click', introSwitchToNext());

const changeBtnContent = () => {
    const lastIntro = document.querySelector('.intro-btn-4')
    const lastBtn = document.querySelector('.pgn-btn-4')
    const btn = document.querySelector('#intro-btn-next')
    console.log(lastBtn);
    console.log(lastIntro);
    if (!lastIntro.classList.contains('hidden') && lastBtn.classList.contains('active')) {
        btn.textContent = 'Սկսել';
    }
};

document.querySelector('.pgn-btn-4').addEventListener('click',changeBtnContent )

document.querySelector('#intro-btn-next').addEventListener('click', ()=> {
     document.getElementById("user-info").classList.remove('hidden');
    document.querySelector('#welcome').classList.add('hidden')
} )


// Code for swiping/ need to test and check
// let touchstartX = 0
// let touchendX = 0

// function checkDirection() {
//     if (touchendX < touchstartX) alert('swiped left!')
//     if (touchendX > touchstartX) alert('swiped right!')
// }

// document.addEventListener('touchstart', e => {
//     touchstartX = e.changedTouches[0].screenX
// })

// document.addEventListener('touchend', e => {
//     touchendX = e.changedTouches[0].screenX
//     checkDirection()
// })

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

const chooseDayTime = () => {
    const date = new Date();
    let currentTime = date.getHours();

    if (currentTime >= 6 && currentTime < 12) {
        document.querySelector('#day-time-info').textContent = 'առավոտ';
    } else if (currentTime === 12) {
        document.querySelector('#day-time-info').textContent = 'կեսօր';
    } else if (currentTime > 12 && currentTime < 17) {
        document.querySelector('#day-time-info').textContent = "օր";
    } else if (currentTime >= 17 && currentTime <= 22) {
        document.querySelector('#day-time-info').textContent = "երեկո";
    } else if (currentTime > 22 || currentTime < 6) {
        document.querySelector('#day-time-info').textContent = "ուշ գիշեր";
    }
} 
chooseDayTime()

var dateTime = new Date().toDateString();
document.querySelector("#date").textContent = dateTime;

function refreshTime() {
    const timeDisplay = document.querySelector("#date");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
}
setInterval(refreshTime);

// document.querySelector('#switch-morning').addEventListener('click', function () {
//     const status = document.querySelector('#switch-morning');
//     if (status.checked) {
//         document.getElementsByClassName('card-check-status')[0].textContent = 'Ընտրված է';
//     } else {
//         document.getElementsByClassName('card-check-status')[0].textContent = '';

//     }
// });

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

const cards = document.querySelectorAll('.post-card');
const checkStatus = document.querySelectorAll('.cbx');


for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
        let status = checkStatus[i].querySelector('input');
        if (!status.checked) {
            checkStatus[i].querySelector('input').checked = true;
        } else if (status.checked) {
            checkStatus[i].querySelector('input').checked = false;
        }
        // checkStatus[i].querySelector('input').checked = 'true';
    })
}


let container = document.querySelector('#sqrContainer');
let squares = null; // document.querySelectorAll('.square');
let pickedColor;
let h1 = document.querySelector('.header');
let messageDisplay = document.querySelector('#message');
let colorDisplay = document.querySelector("#colorDisplay");

let newGameBtn = document.querySelector('#newGame');
let easyBtn = document.querySelector('#diffEasy');
let hardBtn = document.querySelector('#diffHard');
let diffEasy = false;

function randInt(maxVal) {
    return Math.floor(Math.random() * maxVal);
}

function makeRandomColor() {
    return `rgb(${randInt(256)}, ${randInt(256)}, ${randInt(256)})`;
}

function winGame() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = pickedColor;
    }
    h1.style.backgroundColor = pickedColor;
    newGameBtn.textContent = 'Play Again?';
}

function generateSquaresHTML() {
    const numSqrs = (diffEasy ? 3 : 6);
    let sqrsHTML = '';
    for (let i = 0; i < numSqrs; i++) {
        sqrsHTML += '<div class="square"></div>\n';
    }
    return sqrsHTML;
}

function resetColors() {
    // could also switch between 'easy' and 'hard' by using element.style.display = 'none' or 'block' to turn them off/on
    container.innerHTML = generateSquaresHTML();
    squares = document.querySelectorAll('.square');

    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = makeRandomColor();

        squares[i].addEventListener('click', function() {
            if (this.style.backgroundColor === pickedColor) {
                winGame();
                messageDisplay.textContent = 'You found me!';
            } else {
                this.style.backgroundColor = null;
                this.classList.add('bgColor');
                messageDisplay.textContent = 'Try again';
            }
        });
    }

    pickedColor = squares[randInt(squares.length)].style.backgroundColor;
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = null;
    newGameBtn.textContent = 'New Colors';
    messageDisplay.textContent = null;

    if (diffEasy) {
        easyBtn.classList.add('selected');
        hardBtn.classList.remove('selected');
    } else {
        easyBtn.classList.remove('selected');
        hardBtn.classList.add('selected');
    }
}

function addEventListeners() {
    easyBtn.addEventListener('click', () => {
        if (diffEasy === false) {
            diffEasy = true;
            resetColors();
        }
    });

    hardBtn.addEventListener('click', () => {
        if (diffEasy === true) {
            diffEasy = false;
            resetColors();
        }
    });

    newGameBtn.addEventListener('click', () => {
        resetColors();
    });
}

// kick things off when the page loads
resetColors();
addEventListeners();

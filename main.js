// generate int random num between min and max args 
function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// game values
let
    min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui nodes
const
    game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// assign min and max in html ui tags values
minNum.textContent = min;
maxNum.textContent = max;

// add text in the P element
// to show messages
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

// game over
function gameOver(won, msg) {
    let color;

    // if won arg equal true
    // set the border and text color to green
    // else set both red
    won === true ? color = 'green' : color = 'red';

    // wen game over, dissable the input
    guessInput.disabled = true;
    guessInput.style.border = `2px solid ${color}`;
    setMessage(msg, color);

    // change the value of the submit botton to play again
    // and add class to the new event listener to reload the page
    // and play again
    guessBtn.value = 'Play Again?';
    guessBtn.classList.add('play-again');
}


// to check if the user clicked in play again button 
game.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('play-again')) {
        guessInput.value = '';
        window.location.reload();
    }
})

// submit input event listener
guessBtn.addEventListener('click', (e) => {

    // prevent the submit form and assign input value
    // in the guess var
    e.preventDefault();
    let guess = parseInt(guessInput.value);

    // if input is not a number, or less and greater than 
    // the min and max value
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Insert a number between ${min} and ${max}.`, 'red');
        guessInput.value = 0;
    }
    // if input is equal winningNum, i.e, correct answer
    else if (guess === winningNum) {
        gameOver(true, `${guess} is correct. YOU WIN!`);

    }
    // if input is different to the wiiningNum
    else if (guess !== winningNum) {
        // decreases the remaining attempts
        guessesLeft -= 1;

        // if remaining attempts === 0, call the game over
        // and show the correct answer
        if (guessesLeft === 0) {
            gameOver(false, `The correct number as ${winningNum}. YOU LOSE!`);
        }
        // show messages with remaining attempts
        else {
            guessInput.value = '';
            setMessage(`${guess} is incorrect. ${guessesLeft} guesses left.`)
        }
    }
});
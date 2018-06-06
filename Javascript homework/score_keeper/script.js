var gameOver = false;

// logic and variables to deal with the target score
var targetLabel = document.querySelector('#targetValue');
var targetScore = (targetLabel ? Number(targetLabel.textContent) : 5);
var targetInput = document.querySelector('#targetInput');
if (targetInput) {
    targetInput.value = String(targetScore);
    // could also use the event type 'change'
    // that fires when the value change and then the input loses focus
    targetInput.addEventListener('input', () => {
        targetScore = Number(targetInput.value);
        if (targetLabel) {
            targetLabel.textContent = targetInput.value;
        }
        resetGame();
    });
}

// build a list of players based on the structure of the HTML page itself
var players = [];
for (var i = 0; ; i++) {
    var label = document.querySelector(`#p${i + 1}Score`);
    var button = document.querySelector(`#p${i + 1}`);
    if (label && button) {
        players.push({
            score: 0,
            label: label,
            button: button,
        });
    } else {
        break;
    }
}

// set up the button click listener for each player
players.forEach((player) => {
    player.button.addEventListener("click", ()  => {
        if (gameOver) {
            return;
        }
    
        player.score++;
        player.label.textContent = player.score;
    
        if (player.score >= targetScore) {
            player.label.classList.add('won');
            gameOver = true;
        }
    });
});

// wire up the 'reset' button
var resetButton = document.querySelector('#reset');
resetButton.addEventListener("click", reset);

function resetGame() {
    players.forEach((player) => {
        player.label.textContent = player.score = 0;
        player.label.classList.remove('won');
    });

    gameOver = false;
}
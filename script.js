const startButton = document.getElementById('start-button');
const pRock = document.getElementById('p-rock');
const pScissors = document.getElementById('p-scissors');
const pPaper = document.getElementById('p-paper');

const computerWindow = document.getElementById('computer-icon');

const playerOptions = [pRock, pScissors, pPaper];

function resetGame() {
    startButton.setAttribute('disabled', 'true');
    playerOptions.forEach(button => {
        if (button.getAttribute('disabled')) {
            button.removeAttribute('disabled');
        };
    });

    computerWindow.textContent = 'Pick your move!';

}

function createListeners() {
    startButton.addEventListener('click', () => {
        let cSelection = getComputerChoice();
        let pSelection = getPlayerChoice();
        startRound(cSelection, pSelection);
    });

    playerOptions.forEach(pOption => {
        pOption.addEventListener('click', () => {
            if (startButton.getAttribute('disabled')) {
                startButton.removeAttribute('disabled');
            };

            playerOptions.forEach(button => {
                if (button.getAttribute('disabled')) {
                    button.removeAttribute('disabled');
                }
            });

            pOption.setAttribute('disabled', 'true');
        });
    });
}


function getPlayerChoice() {
    let pSelection;

    playerOptions.forEach((pOption, i = index) => {
        if (pOption.getAttribute('disabled')) {
            pSelection = i + 1;
        };
    });

    return pSelection;
}

function getComputerChoice() {
    return Math.floor(Math.random() * 3 + 1);
}

function startRound(cSelection, pSelection) {
    let windowInterval = 0;

    let windowText = ['Rock!', 'Paper!', 'Scissors!']

    disableButtons();

    computerWindow.textContent = 'Ready?';

    let gameInterval = setInterval(() => {
        if (windowInterval !== 3) {
            computerWindow.textContent = windowText[windowInterval];
        }
        windowInterval += 1;

        if (windowInterval >= 4) {
            clearInterval(gameInterval);
        }
    }, 800);
}

function disableButtons() {
    startButton.setAttribute('disabled', 'true');
    playerOptions.forEach(button => {
        button.setAttribute('disabled', 'true');
    });
}

let playerOption = null;

resetGame();
createListeners();


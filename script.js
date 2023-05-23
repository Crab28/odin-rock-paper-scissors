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
            displayComputerIcon(cSelection);

            setTimeout(() => {
                postGameDisplay(cSelection, pSelection);
            }, 1200);
        }
    }, 800);
}

function disableButtons() {
    startButton.setAttribute('disabled', 'true');
    playerOptions.forEach(button => {
        button.setAttribute('disabled', 'true');
    });
}

function displayComputerIcon(cSelection) {
    computerWindow.textContent = '';
    computerWindow.classList.add('more-window-font');
    computerWindow.classList.add('fa-regular');
    if (cSelection === 1) {
        computerWindow.classList.add('fa-hand-back-fist');
    }
    else if (cSelection === 2) {
        computerWindow.classList.add('fa-hand-peace');
    }
    else {
        computerWindow.classList.add('fa-hand');
    }
}

function selectWinner(cSelection, pSelection) {
    if (cSelection === pSelection) {
        return "It's a Draw!";
    }
    else if (
        cSelection === 1 && pSelection === 2 || 
        cSelection === 2 && pSelection === 3 ||
        cSelection === 3 && pSelection === 1) {
        return 'Computer Wins!';
    }
    else {
        return 'Player Wins!';
    }
}

function postGameDisplay(cSelection, pSelection) {
    computerWindow.classList.remove('more-window-font');
    computerWindow.classList.remove('fa-regular');
    computerWindow.classList.remove('fa-hand-back-fist');
    computerWindow.classList.remove('fa-hand-peace');
    computerWindow.classList.remove('fa-hand');

    computerWindow.textContent = selectWinner(cSelection, pSelection);

    setTimeout(() => {
        resetGame();
    }, 1000);
}

resetGame();
createListeners();


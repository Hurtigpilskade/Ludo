const board = document.getElementById('board');
const rollDiceButton = document.getElementById('roll-dice');
const diceResultDisplay = document.getElementById('dice-result');
const currentPlayerDisplay = document.getElementById('current-player');

let diceResult = 0;
let currentPlayer = 'red';
const players = ['red', 'green', 'yellow', 'blue'];
let playerPositions = {
    red: 0,
    green: 0,
    yellow: 0,
    blue: 0
};

let playerPaths = {
    red: generatePath(0),
    green: generatePath(13 * 15),
    yellow: generatePath(15 * 14 - 1),
    blue: generatePath(15 - 1)
};

function generatePath(start) {
    let path = [];
    for (let i = 0; i < 56; i++) {
        path.push((start + i) % (15 * 15));
    }
    return path;
}

function createBoard() {
    for (let i = 0; i < 15 * 15; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}

function rollDice() {
    diceResult = Math.floor(Math.random() * 6) + 1;
    diceResultDisplay.textContent = `Dice Result: ${diceResult}`;
    movePlayer(currentPlayer);
    currentPlayer = players[(players.indexOf(currentPlayer) + 1) % players.length];
    currentPlayerDisplay.textContent = `Current Player: ${capitalize(currentPlayer)}`;
}

function movePlayer(player) {
    let currentPath = playerPaths[player];
    let currentPosition = playerPositions[player];
    let newPosition = currentPosition + diceResult;

    if (newPosition >= currentPath.length) {
        newPosition = currentPath.length - 1;
    }

    playerPositions[player] = newPosition;

    renderPieces();
    checkWin(player);
}

function renderPieces() {
    document.querySelectorAll('.player-piece').forEach(piece => piece.remove());
    players.forEach(player => {
        let currentPath = playerPaths[player];
        let currentPosition = playerPositions[player];
        let cellIndex = currentPath[currentPosition];
        const playerPiece = document.createElement('div');
        playerPiece.classList.add('player-piece', `${player}-piece`);
        playerPiece.style.top = `${Math.floor(cellIndex / 15) * 40 + 5}px`;
        playerPiece.style.left = `${(cellIndex % 15) * 40 + 5}px`;
        playerPiece.textContent = player.charAt(0).toUpperCase();
        board.appendChild(playerPiece);
    });
}

function checkWin(player) {
    if (playerPositions[player] === playerPaths[player].length - 1) {
        alert(`${capitalize(player)} wins!`);
        resetGame();
    }
}

function resetGame() {
    playerPositions = {
        red: 0,
        green: 0,
        yellow: 0,
        blue: 0
    };
    renderPieces();
    currentPlayer = 'red';
    currentPlayerDisplay.textContent = `Current Player: Red`;
    diceResultDisplay.textContent = `Dice Result: -`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function initGame() {
    createBoard();
    rollDiceButton.addEventListener('click', rollDice);
    renderPieces();
}

initGame();

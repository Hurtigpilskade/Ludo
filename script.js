const board = document.getElementById('board');
const rollDiceButton = document.getElementById('roll-dice');
const diceResultDisplay = document.getElementById('dice-result');

let diceResult = 0;
let currentPlayer = 'red';
const players = ['red', 'green', 'yellow', 'blue'];
let playerPositions = {
    red: 0,
    green: 0,
    yellow: 0,
    blue: 0
};

function createBoard() {
    for (let i = 0; i < 15 * 15; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
    }
}

function rollDice() {
    diceResult = Math.floor(Math.random() * 6) +1;
    diceResultDisplay.textContent = `Result: ${diceResult}`;
    movePlayer(currentPlayer);
    currentPlayer = players[(players.indexOf(currentPlayer) + 1) % players.length];
}

function movePlayer(player) {
    let newPosition = playerPositions[player] + diceResult;
    if (newPosition >= 225) {
        newPosition = 224;
    }
    const playerPiece = document.createElement('div');
    playerPiece.classList.add('player-piece', `${player}-piece`);
    playerPiece.style.top = `${Math.floor(newPosition / 15) * 40 + 5}px`;
    playerPiece.style.left = `${(newPosition % 15) * 40 + 5}px`;
    board.appendChild(playerPiece);
    playerPositions[player] = newPosition;
}

function initGame() {
    createBoard();
    rollDiceButton.addEventListener('click', rollDice);
}

initGame();
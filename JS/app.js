const plateau = document.getElementById('plateau');
const nouvellePartieBtn = document.getElementById('nouvellePartieBtn');
let cases = [];
let playerPosition = 1;
let serpents = [];
let echelles = [];

function generateRandomPositions() {
    serpents = [];
    echelles = [];

    for (let i = 0; i < 5; i++) {
        let start = Math.floor(Math.random() * 95) + 1;
        let end = Math.floor(Math.random() * 95) + 1;

        while (start === end || end >= start) {
            start = Math.floor(Math.random() * 95) + 1;
            end = Math.floor(Math.random() * 95) + 1;
        }

        serpents.push({ start: start, end: end });
    }

    for (let i = 0; i < 5; i++) {
        let start = Math.floor(Math.random() * 95) + 1;
        let end = Math.floor(Math.random() * 95) + 1;

        while (start === end || end <= start) {
            start = Math.floor(Math.random() * 95) + 1;
            end = Math.floor(Math.random() * 95) + 1;
        }

        echelles.push({ start: start, end: end });
    }
}

function createplateau() {
    plateau.innerHTML = '';

    for (let i = 100; i >= 1; i--) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = i;
        plateau.appendChild(square);
        cases.push(square);
    }

    serpents.forEach(snake => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.textContent = '🐍';
        cases[snake.start - 1].appendChild(snakeElement);
    });

    echelles.forEach(ladder => {
        const ladderElement = document.createElement('div');
        ladderElement.classList.add('ladder');
        ladderElement.textContent = '🪜';
        cases[ladder.start - 1].appendChild(ladderElement);
    });
}

function movePlayer(targetPosition) {
}

nouvellePartieBtn.addEventListener('click', () => {
    generateRandomPositions();
    createplateau();
    playerPosition = 1;
    movePlayer(playerPosition);
});

generateRandomPositions();
createplateau();
movePlayer(playerPosition);
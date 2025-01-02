const plateau = document.getElementById('plateau');
const nouvellePartieBtn = document.getElementById('nouvellePartieBtn');
const diceButton = document.getElementById('diceButton');
const diceResult = document.getElementById('diceResult');
let cases = [];
let playerPosition = 1;
let serpents = [];
let echelles = [];
let playerElement = null; // Élément du joueur

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
    cases = [];

    for (let i = 1; i <= 100; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = i;
        plateau.appendChild(square);
        cases.push(square);
        if (i === 1) {
            square.classList.add('start');
            square.textContent += ' (Départ)';
        }
        if (i === 100) {
            square.classList.add('end');
            square.textContent += ' (Arrivée)';
        }
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

    // Créer le pion du joueur
    playerElement = document.createElement('div');
    playerElement.classList.add('player');
    cases[0].appendChild(playerElement);
}


function movePlayer(diceValue) {

    if (playerPosition + diceValue > 100) {
        return; // Le joueur ne peut pas dépasser la case 100
    }

    playerPosition += diceValue;

    // Vérifier si le joueur a atterri sur un serpent ou une échelle
    serpents.forEach(snake => {
        if (snake.start === playerPosition) {
            playerPosition = snake.end;
        }
    });

    echelles.forEach(ladder => {
        if (ladder.start === playerPosition) {
            playerPosition = ladder.end;
        }
    });

    // Mettre à jour la position du joueur sur le plateau
    if (playerElement) {
        playerElement.remove(); // Supprimer le pion de sa position actuelle
        cases[playerPosition - 1].appendChild(playerElement); // Placer le pion à la nouvelle position
    }

    // Vérifier si le joueur a gagné
    if (playerPosition === 100) {
        alert("Vous avez gagné !");
        return;
    }
}

function rollDice() {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    
    // Applique l'animation et met à jour le texte
    diceResult.classList.add('dice-animation');
    diceResult.textContent = `Vous avez fait un ${diceValue} !`;

    // Enlève l'animation après 500 ms pour permettre de relancer correctement
    setTimeout(() => {
        diceResult.classList.remove('dice-animation');
    }, 500);

    movePlayer(diceValue);
}
nouvellePartieBtn.addEventListener('click', () => {
    generateRandomPositions();
    createplateau();
    playerPosition = 1;
    // if (playerElement) {
    //     playerElement.remove();
    // }
    movePlayer(playerPosition);
});

diceButton.addEventListener('click', rollDice);

generateRandomPositions();
createplateau();
movePlayer(playerPosition);

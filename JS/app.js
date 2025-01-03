const plateau = document.getElementById('plateau');
const nouvellePartieBtn = document.getElementById('nouvellePartieBtn');
const diceButton = document.getElementById('diceButton');
const diceResult = document.getElementById('diceResult');
let cases = [];
let players = []; // Tableau pour les positions des joueurs
let currentPlayerIndex = 0; // Indice du joueur actuel
let serpents = [];
let echelles = [];
let playerElements = []; // Tableau pour les éléments des joueurs

function generateRandomPositions() {
    serpents = [];
    echelles = [];

    while (serpents.length < 5) {
        let start = Math.floor(Math.random() * 95) + 6;  // Assurez-vous que le serpent commence plus haut
        let end = Math.floor(Math.random() * (start - 1)) + 1; // Descend à une case en dessous

        if (!serpents.some(s => s.start === start)) {
            serpents.push({ start, end });
        }
    }

    while (echelles.length < 5) {
        let start = Math.floor(Math.random() * 94) + 1;  // Commence plus bas
        let end = Math.floor(Math.random() * (100 - start)) + start + 1; // Monte à une case au-dessus

        if (!echelles.some(e => e.start === start)) {
            echelles.push({ start, end });
        }
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
            square.textContent = 'Depart';
        } else if (i === 100) {
            square.classList.add('end');
            square.textContent = 'Arrivé';
        }
        else {
            square.textContent = i;
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

    // Créer les pions des joueurs
      playerElements = [];
    players.forEach((_, index) => {
        const playerElement = document.createElement('div');
        playerElement.classList.add('player');
        
        // Ajouter une couleur spécifique en fonction du joueur
        playerElement.classList.add(`player-${index + 1}`); // player-1, player-2, etc.
        
        cases[0].appendChild(playerElement);
        playerElements.push(playerElement);
    });
}

function movePlayer(diceValue) {
    let playerPosition = players[currentPlayerIndex];
    let newPosition = playerPosition + diceValue;

    if (newPosition > 100) {
        return; // Le joueur ne peut pas dépasser la case 100
    }

    // Ajouter une classe pour l'animation CSS
    function animateMovementCSS(current, target, callback) {
        if (current === target) {
            callback();
            return;
        }

        // Déplacer le pion case par case
        setTimeout(() => {
            playerElements[currentPlayerIndex].remove();
            current++;
            cases[current - 1].appendChild(playerElements[currentPlayerIndex]);
            animateMovementCSS(current, target, callback);
        }, 300);
    }

    animateMovementCSS(playerPosition, newPosition, () => {
        // Vérifier les serpents et les échelles après l'animation
        serpents.forEach(snake => {
            if (snake.start === newPosition) {
                newPosition = snake.end;
            }
        });

        echelles.forEach(ladder => {
            if (ladder.start === newPosition) {
                newPosition = ladder.end;
            }
        });

        players[currentPlayerIndex] = newPosition;

        playerElements[currentPlayerIndex].remove();
        cases[newPosition - 1].appendChild(playerElements[currentPlayerIndex]);

        if (newPosition === 100) {
            alert(`Le joueur ${currentPlayerIndex + 1} a gagné !`);
            return;
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    });
}



function rollDice() {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    diceResult.classList.add('dice-animation');
    diceResult.textContent = `Le joueur ${currentPlayerIndex + 1} a fait un ${diceValue} !`;

    setTimeout(() => {
        diceResult.classList.remove('dice-animation');
        movePlayer(diceValue);  // Déplacer après l'animation
    }, 500);
}

nouvellePartieBtn.addEventListener('click', () => {
    let numberOfPlayers = parseInt(prompt("Entrez le nombre de joueurs (1 à 4):"));
    if (numberOfPlayers < 1 || numberOfPlayers > 4) {
        alert("Veuillez entrer un nombre de joueurs valide.");
        return;
    }

    players = Array(numberOfPlayers).fill(1); // Chaque joueur commence à la case 1
    currentPlayerIndex = 0; // Le premier joueur commence
    generateRandomPositions();
    createplateau();
});

diceButton.addEventListener('click', rollDice);

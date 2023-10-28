const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let players = [];
let currentPlayerIndex = 0;
let scores = {};
//end-table
let matchesFound = 0;
let totalCardsInGame; // this should be set to either 30 or 40, depending on the difficulty level selected



let numPlayersInputs = document.getElementsByName('num-players');
let playerNameFieldsDiv = document.getElementById('player-name-fields');
let startButton = document.getElementById('start-button');
let startForm = document.getElementById('start-form');
let gameContent = document.getElementById('game-content');


// New
let difficultyRadioInputs = document.getElementsByName('difficulty');
let gameBoardNormal = document.getElementById('game-content'); // Dies ist das kleinere Spielfeld
let gameBoardHard = document.getElementById('game-board-hard'); // Dies ist das größere Spielfeld


numPlayersInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        let numPlayers = e.target.value;
        playerNameFieldsDiv.innerHTML = '';
        for (let i = 0; i < numPlayers; i++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.name = `player${i + 1}`;
            input.id = `player${i + 1}`;
            input.placeholder = `Player ${i + 1} Name`;
            playerNameFieldsDiv.appendChild(input);
        }
    });
});


// StartGame + New difficulty mode
startButton.addEventListener('click', () => {
    let numPlayers;
    let difficulty;
    for (let i = 0; i < numPlayersInputs.length; i++) {
        if (numPlayersInputs[i].checked) {
            numPlayers = numPlayersInputs[i].value;
            break;
        }
    }
    for (let i = 0; i < difficultyRadioInputs.length; i++) {
        if (difficultyRadioInputs[i].checked) {
            difficulty = difficultyRadioInputs[i].value;
            break;
        }
    }
    if (!numPlayers) {
        alert('Please select a number of players.');
        return;
    }
    if (!difficulty) {
        alert('Please select a difficulty level.');
        return;
    }
    for (let i = 0; i < numPlayers; i++) {
        let playerNameInput = document.getElementById(`player${i + 1}`);
        if (!playerNameInput || !playerNameInput.value) {
            alert(`Please enter a name for Player ${i + 1}.`);
            return;
        }
    }

    if (difficulty === 'normal') {
        gameBoardNormal.style.display = 'block';
        gameBoardHard.style.display = 'none';
        totalCardsInGame = 30;
    } else if (difficulty === 'hard') {
        gameBoardNormal.style.display = 'none';
        gameBoardHard.style.display = 'block';
        totalCardsInGame = 40;
    }

    startGame(numPlayers);
    startForm.style.display = 'none';
    
     // Make sure the scoreboard is always visible
     document.getElementById('scoreboard').style.display = 'block';
});




function startGame(numPlayers) {
    for (let i = 0; i < numPlayers; i++) {
        let playerName = document.getElementById(`player${i + 1}`).value;
        players.push(playerName);
        scores[playerName] = 0;
    }
    updateScoreBoard();
    updatePlayerTurn();
}

function updateScoreBoard() {
    let scoresDiv = document.getElementById('scores');
    scoresDiv.innerHTML = '';
    for (let player in scores) {
        scoresDiv.innerHTML += `${player}: ${scores[player]}<br/>`;
    }
}

function updatePlayerTurn() {
    let playerTurnDiv = document.getElementById('player-turn');
    playerTurnDiv.textContent = `Current Turn: ${players[currentPlayerIndex]}`;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  scores[players[currentPlayerIndex]]++; // Increase score for current player
  updateScoreBoard();

  matchesFound++; // Increase the number of matches found

  resetBoard();

    // Check if the game has ended
    if (matchesFound * 2 == totalCardsInGame) {
        // If the game has ended, call the gameEnd() function
        gameEnd();
      }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch player
    updatePlayerTurn();

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  let cardsNormal = gameBoardNormal.querySelectorAll('.memory-card');
  let cardsHard = gameBoardHard.querySelectorAll('.memory-card');

  cardsNormal.forEach(card => {
      let randomPos = Math.floor(Math.random() * 30); // Für 5x6 Karten
      card.style.order = randomPos;
  });
  cardsHard.forEach(card => {
      let randomPos = Math.floor(Math.random() * 40); // Für 5x8 Karten
      card.style.order = randomPos;
  });
}
)();

cards.forEach(card => card.addEventListener('click', flipCard));

startGame();











// Game ending from here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function gameEnd() {
  // Hide the game content
//   document.getElementById('game-content').style.display = 'none';
//   document.getElementById('game-board-hard').style.display = 'none';


  // Show the end table
  const endTable = document.getElementById('end-table');
  endTable.style.display = 'block';

  // Populate the score table
  const scoreTable = document.getElementById('score-table');
  for (let i = 0; i < players.length; i++) {
      let row = scoreTable.insertRow();
      let cell1 = row.insertCell();
      let cell2 = row.insertCell();

      cell1.textContent = players[i].name;
      cell2.textContent = players[i].score;
  }
}



// Neues Spiel starten
function restartGame() {
    // Karten zurücksetzen
    const cardsNormal = gameBoardNormal.querySelectorAll('.memory-card');
    const cardsHard = gameBoardHard.querySelectorAll('.memory-card');
  
    cardsNormal.forEach(card => card.classList.remove('flip'));
    cardsHard.forEach(card => card.classList.remove('flip'));
  
    // Spielzustand zurücksetzen
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    matchesFound = 0
  
    // Punktzahl zurücksetzen
    for (let player in scores) {
      scores[player] = 0;
    }
    updateScoreBoard();
  
    // Spielerreihenfolge zurücksetzen
    currentPlayerIndex = 0;
    updatePlayerTurn();
  
    // Karten neu mischen
    // shuffle();
    (function shuffle() {
      let cardsNormal = gameBoardNormal.querySelectorAll('.memory-card');
      let cardsHard = gameBoardHard.querySelectorAll('.memory-card');
    
      cardsNormal.forEach(card => {
          let randomPos = Math.floor(Math.random() * 30); // Für 5x6 Karten
          card.style.order = randomPos;
      });
      cardsHard.forEach(card => {
          let randomPos = Math.floor(Math.random() * 40); // Für 5x8 Karten
          card.style.order = randomPos;
      });
    }
    )();
  
    // Verstecke die Endtabelle
    document.getElementById('end-table').style.display = 'none';
  
    // Zeige das Spielfeld an
    if (totalCardsInGame === 30) {
      gameBoardNormal.style.display = 'block';
      cardsNormal.forEach(card => card.addEventListener('click', flipCard));
    } else {
      gameBoardHard.style.display = 'block';
      cardsHard.forEach(card => card.addEventListener('click', flipCard));
    }
  }
  
  // Höre auf den Klick des Restart-Buttons
  document.getElementById('restart-button').addEventListener('click', () => {
    restartGame();
  });
  
  // ...
  
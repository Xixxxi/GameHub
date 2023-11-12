// initial setup
let playerTurn = 1;
const boardSize = 10;
let gameStarted = false;
let shipsToPlace = [4, 3, 2, 1];   // If changed here it has to be changed when resetted further down as well
let selectedCells = [];

// initial setup
let attackPlayer = 0;  // new variable




// generate boards
const generateBoard = (boardId) => {
  const board = document.getElementById(boardId);
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.id = boardId + i;
    cell.classList.add('cell');
    board.appendChild(cell);
  }
};

// board initialization
generateBoard('player1');
generateBoard('player2');

// handle cell click
const handleCellClick = (e) => {
  // check if the game has started
  if (!gameStarted) {
    // place the ship
    if (e.target.classList.contains('ship')) {
      alert('Es gibt bereits ein Schiff in dieser Position!');
    } else {
      selectedCells.push(e.target);
      e.target.style.backgroundColor = "gray";  // temporarily highlight the selected cells

      if (selectedCells.length === shipsToPlace[0]) {
        let shipLength = shipsToPlace[0];
        let idArray = selectedCells.map(cell => parseInt(cell.id.replace(/\D/g,''), 10));
        idArray.sort((a, b) => a - b);  // sort the array in ascending order

        if (idArray[idArray.length - 1] - idArray[0] === shipLength - 1 || idArray[idArray.length - 1] - idArray[0] === (boardSize * (shipLength - 1))) {
          selectedCells.forEach(cell => cell.classList.add('ship'));
          shipsToPlace.shift();
          alert(`Schiff platziert. Nächstes Schiff: ${shipsToPlace[0] || 'Alle Schiffe wurden platziert'}`);
          selectedCells = [];
          if (shipsToPlace.length === 0) {
            if (playerTurn === 1) {
              playerTurn = 2;
              switchBoard();
              shipsToPlace = [4, 3, 2, 1];  // reset ships for player 2
              alert('Spieler 2, bitte platziere deine Schiffe.');
            } else {
              gameStarted = true;
              playerTurn = 1;
              switchBoard();
              alert('Das Spiel beginnt! Spieler 1, du bist dran.');

                // Change the background color of all cells to white
                const cells = document.querySelectorAll('.cell');
                cells.forEach((cell) => {
                    cell.style.backgroundColor = 'white';
                });
            }
          }
        } else {
          alert('Die ausgewählten Zellen entsprechen nicht der Länge des zu platzierenden Schiffes. Bitte erneut versuchen.');
          selectedCells.forEach(cell => cell.style.backgroundColor = '');  // remove temporary highlight
          selectedCells = [];
        }
      }
    }
  } else {
    // game started, handle the click
    if (e.target.classList.contains('hit') || e.target.classList.contains('miss')) {
      alert('Diese Position wurde bereits angegriffen!');
    } else {
      if (e.target.classList.contains('ship')) {
        e.target.style.backgroundColor = 'red';
        e.target.classList.add('hit');
        // check if the game is over
        if (document.querySelectorAll(`#player${playerTurn === 1 ? 2 : 1} .ship`).length === document.querySelectorAll(`#player${playerTurn === 1 ? 2 : 1} .hit`).length) {
          e.target.classList.add('hit'); // My Addition: This line colors the last hit
           
          alert(`Spieler ${attackPlayer === 1 ? 2 : 1} gewinnt!`);
          // restart the game
          location.reload();
        } else {
          alert('Treffer! Du darfst nochmal.');
        }
      } else {
        // this is a miss
        e.target.style.backgroundColor = 'blue';
        e.target.classList.add('miss');
        playerTurn = playerTurn === 1 ? 2 : 1;
        switchBoard();
        alert(`Spieler ${playerTurn}, du bist dran.`);
      }
    }
  }
};

// add click events to cells
document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
  
  // start game button
  document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('startpage').style.display = 'none';
    document.getElementById('player1').style.display = 'block';
    alert(`Spieler 1, bitte platziere dein Schiff der Länge ${shipsToPlace[0]}.`);
  });
  
 // switch board
const switchBoard = () => {
    if (gameStarted) {
      // in the attack phase, show the opponent's board
      document.getElementById(`player${playerTurn}`).style.display = 'none';
      document.getElementById(`player${playerTurn === 1 ? 2 : 1}`).style.display = 'block';
    } else {
      // in the placement phase, show the current player's board
      document.getElementById(`player${playerTurn === 1 ? 2 : 1}`).style.display = 'none';
      document.getElementById(`player${playerTurn}`).style.display = 'block';
    }
  };
  

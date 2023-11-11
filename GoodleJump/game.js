// Verhindern von Zoom-Effekten bei Berührung
function preventDefaultTouchEvents(event) {
  if (event.touches.length < 2) {
    event.preventDefault();
  }
}

// Initialisierung des Canvas und der Spielvariablen
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImage = new Image();
playerImage.src = '../GoodleJump/CharacterCut.png'; // Pfad zum Spielerbild

const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 75,
  height: 75,
  dx: 0,
  dy: 0
};

let platforms = [];
const platformCount = 5;
const platformWidth = 110;
const platformHeight = 15;
let platGap = (canvas.height - 200) / platformCount;
let gravity = 12.5;
let jumpPower = 18;
let isJumping = false;
let gameStarted = false;
let score = 0;

let animationFrameId; // Variable zur Speicherung der ID des Animation Frames

// Event-Listener für Touch-Interaktionen
canvas.addEventListener('touchstart', preventDefaultTouchEvents, { passive: false });
canvas.addEventListener('touchend', preventDefaultTouchEvents, { passive: false });
canvas.addEventListener('touchmove', preventDefaultTouchEvents, { passive: false });

// Erzeugung der Startplattformen
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platY = canvas.height - 200 - i * platGap;
    platforms.push({
      x: Math.random() * (canvas.width - platformWidth),
      y: platY,
      width: platformWidth,
      height: platformHeight
    });
  }
}

createPlatforms();

// Aktualisierung der Spielerposition
function updatePlayer() {
  player.dy = isJumping ? -jumpPower : gravity;
  player.y += player.dy;
  player.x += player.dx;

  // Wrap-Around-Logik für den Spieler
  if (player.x + player.width < 0) {
    player.x = canvas.width;
  } else if (player.x > canvas.width) {
    player.x = -player.width;
  }

  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    isJumping = false;
  }
}


// Hinderniss
const obstacleImage = new Image();
obstacleImage.src = '../GoodleJump/obstacle.png'; // Pfad zum Hindernisbild

let obstacle = {
  x: -125, // Start außerhalb des Bildschirms
  y: 0,
  width: 125,
  height: 75,
  dx: 0 // Anfangsgeschwindigkeit
};

// Funktionen für Hindernis
function updateObstacle() {
  // Hindernis erscheint zufällig
  if (gameStarted && Math.random() < 0.005 && obstacle.x < 0) { // 0.5% Chance pro Frame, dass das Hindernis erscheint
    obstacle.x = canvas.width;
    obstacle.y = Math.random() * (canvas.height - obstacle.height);
    obstacle.dx = -5; // Geschwindigkeit, mit der das Hindernis fliegt
  }

  obstacle.x += obstacle.dx;

  // Hindernis zurücksetzen, wenn es den Bildschirm verlässt
  if (obstacle.x + obstacle.width < 0) {
    obstacle.dx = 0;
    obstacle.x = -125; // Zurück zum Startpunkt außerhalb des Bildschirms
  }
}

function checkCollisionWithObstacle() {
  if (player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y) {
    gameOver();
  }
}


// Kollisionserkennung mit Plattformen
function collisionDetection() {
  platforms.forEach(function(p, index) {
    if (
      player.x < p.x + p.width &&
      player.x + player.width > p.x &&
      player.y + player.height > p.y &&
      player.y < p.y + platformHeight &&
      player.dy >= 0
    ) {
      if (!p.touched) {
        score++;  // Erhöht den Score
        p.touched = true; // Markiert die Plattform als berührt
        platforms.splice(index, 1); // Entfernt die Plattform aus dem Array
      }
      isJumping = true;
      setTimeout(function() {
        isJumping = false;
      }, 500);
    }
  });
}


// Erzeugung neuer Plattformen
function generatePlatform(newY) {
  return {
    x: Math.random() * (canvas.width - platformWidth),
    y: newY,
    width: platformWidth,
    height: platformHeight
  };
}

// Aktualisierung und Scrollen der Plattformen
function updatePlatforms() {
  if (player.y < canvas.height / 1.1) {
    platforms.forEach(p => p.y += 5);
  }

  // Entfernt Plattformen, die unterhalb des Bildschirms sind, oder die berührt wurden
  platforms = platforms.filter(p => p.y < canvas.height && !p.touched);

  while (platforms.length < platformCount) {
    let lastPlatform = platforms[platforms.length - 1] || { y: canvas.height };
    platforms.push(generatePlatform(lastPlatform.y - platGap));
  }
}

// GameOver Funktionen
function gameOver() {
  // Aktuellen Score mit dem gespeicherten Highscore vergleichen und bei Bedarf aktualisieren
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
  }

  // Anzeigen des Game-Over-Bildschirms
  document.getElementById('gameOverScreen').style.display = 'block';
  document.getElementById('finalScore').textContent = 'Your Score: ' + score;

  // Stoppen der Game-Loop
  cancelAnimationFrame(animationFrameId);
}

function checkGameOver() {
  // Überprüft, ob das Spiel gestartet ist, der Spieler den Boden berührt hat und nicht mehr springt
  if (gameStarted && player.y === canvas.height - player.height && !isJumping) {
    gameOver();
  }
}

document.getElementById('reloadButton').addEventListener('click', function() {
  location.reload(); // Neuladen der Seite
});
// GameOverFunktionen zu ende






// Spiel-Hauptschleife
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlatforms();
  updatePlayer();
  collisionDetection();

  // Zeichnen der Plattformen
  platforms.forEach(function(p) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });


    // Aktualisieren und Zeichnen des Hindernisses
    updateObstacle();
    checkCollisionWithObstacle();
    ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);


  // Zeichnen des Spielers
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

  // Anzeige des Scores
  ctx.font = '34px Arial'; // Größere Schriftgröße
  ctx.fillStyle = 'black';
  ctx.textAlign = 'right';
  ctx.fillText('Score: ' + score, canvas.width - 60, 40); // Verschiebung nach links und etwas höher
  // Anzeige des Highscores
  const highScore = localStorage.getItem('highScore') || 0;
  ctx.fillText('Highscore: ' + highScore, canvas.width - 60, 80);


  checkGameOver();

  animationFrameId = requestAnimationFrame(gameLoop); // Speichert die ID des Animation Frames
}

// Touch-Steuerung für den Spieler
function handleTouchStart(event) {
  let touchX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
  player.dx = touchX < canvas.width / 2 ? -10 : 10;
}

function handleTouchEnd() {
  player.dx = 0;
}

canvas.addEventListener('mousedown', handleTouchStart);
canvas.addEventListener('mouseup', handleTouchEnd);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);

// Start des Spiels
const startButton = document.getElementById('startButton');

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    isJumping = true;
    setTimeout(function() {
      isJumping = false;
    }, 500);
    startButton.style.display = 'none'; // Versteckt den Start-Button
  }
}

startButton.addEventListener('click', startGame);

gameLoop();

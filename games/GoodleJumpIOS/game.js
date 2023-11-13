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
playerImage.src = '../GoodleJumpIOS/CharacterCut.png'; // Pfad zum Spielerbild

// Plattformbild laden
const platformImage = new Image();
platformImage.src = '../GoodleJumpIOS/Plattform.png'; // Pfad zum Plattformbild

// Bewegende Plattform laden
const stonePlatformImage = new Image();
stonePlatformImage.src = '../GoodleJumpIOS/StonePlatform.png'; // Pfad zum Bild der Steinplattform


const player = {
  x: canvas.width / 2,
  y: canvas.height - 105,
  width: 105,
  height: 105,
  dx: 0,
  dy: 0
};

let platforms = [];
const platformCount = 6;
const platformWidth = 110;
const platformHeight = 20;
let platGap = (canvas.height - 200) / platformCount;
let gravity = 16; // 12.5 for Android
let jumpPower = 22; // 28 for Android
let isJumping = false;
let gameStarted = false;
let score = 0;

let animationFrameId; // Variable zur Speicherung der ID des Animation Frames

// Moving Platform start
let movingPlatforms = [];
const movingPlatformSpeed = 2; // Geschwindigkeit der beweglichen Plattformen

function createMovingPlatform() {
  movingPlatforms.push({
    x: Math.random() * (canvas.width - platformWidth),
    y: Math.random() * canvas.height / 2,
    width: platformWidth,
    height: platformHeight,
    dx: movingPlatformSpeed
  });
}

function updateMovingPlatforms() {
  movingPlatforms.forEach(platform => {
    // Horizontale Bewegung
    platform.x += platform.dx;
    // Umkehren der Richtung, wenn die Plattform den Rand erreicht
    if (platform.x <= 0 || platform.x + platform.width >= canvas.width) {
      platform.dx = -platform.dx;
    }

    // Vertikale Bewegung nach unten
    if (player.y < canvas.height / 1.1) {
      platform.y += 5; // Selbe Geschwindigkeit wie andere Plattformen
    }
  });
}

// Moving Platform end


// Welcome Screen
const welcomeScreen = document.getElementById('welcomeScreen');
const startGameButton = document.getElementById('startGameButton');
const characterOptions = document.querySelectorAll('.characterOption');

let selectedCharacter = '../GoodleJumpIOS/CharacterCut.png'; // Standardcharakter

// Charakterauswahl
characterOptions.forEach(option => {
  option.addEventListener('click', function() {
    selectedCharacter = this.getAttribute('data-character');
    playerImage.src = selectedCharacter; // Setzt das Bild des ausgewählten Charakters
    welcomeScreen.style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('startButton').style.display = 'block';
    startGame();
  });
});



// Spiel starten
startGameButton.addEventListener('click', function() {
  playerImage.src = selectedCharacter;
  welcomeScreen.style.display = 'none';
  document.getElementById('gameCanvas').style.display = 'block';
  document.getElementById('startButton').style.display = 'block';
  startGame();
});

// ... Rest Ihres aktuellen JavaScript-Codes ...


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
obstacleImage.src = '../GoodleJumpIOS/obstacle.png'; // Pfad zum Hindernisbild
let obstacle = {
  x: -135, // Start außerhalb des Bildschirms
  y: 0,
  width: 135,
  height: 85,
  dx: 0 // Anfangsgeschwindigkeit
};
// Funktionen für Hindernis
function updateObstacle() {
  // Hindernis erscheint zufällig
  if (gameStarted && Math.random() < 0.005 && obstacle.x < 0) { // 0.5% Chance pro Frame, dass das Hindernis erscheint
    obstacle.x = canvas.width;
    obstacle.y = Math.random() * (canvas.height - obstacle.height);
    obstacle.dx = -6; // Geschwindigkeit, mit der das Hindernis fliegt
  }
  obstacle.x += obstacle.dx;
  // Hindernis zurücksetzen, wenn es den Bildschirm verlässt
  if (obstacle.x + obstacle.width < 0) {
    obstacle.dx = 0;
    obstacle.x = -135; // Zurück zum Startpunkt außerhalb des Bildschirms
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

// Hindernis 2
const secondObstacleImage = new Image();
secondObstacleImage.src = '../GoodleJumpIOS/ufoCut.png'; // Pfad zum zweiten Hindernisbild
let secondObstacle = {
  x: -135, // Start außerhalb des Bildschirms
  y: 0,
  width: 135,
  height: 85,
  dx: 0 // Anfangsgeschwindigkeit
};
// Funktionen für Hindernis 2
function updateSecondObstacle() {
  // Hindernis 2 erscheint seltener
  if (gameStarted && Math.random() < 0.001 && secondObstacle.x < 0) { // Geringere Chance
    secondObstacle.x = canvas.width;
    secondObstacle.y = Math.random() * (canvas.height - secondObstacle.height);
    secondObstacle.dx = -3; // Andere Geschwindigkeit
  }
  secondObstacle.x += secondObstacle.dx;
  if (secondObstacle.x + secondObstacle.width < 0) {
    secondObstacle.dx = 0;
    secondObstacle.x = -135;
  }
}
function checkCollisionWithSecondObstacle() {
  if (player.x < secondObstacle.x + secondObstacle.width &&
      player.x + player.width > secondObstacle.x &&
      player.y < secondObstacle.y + secondObstacle.height &&
      player.y + player.height > secondObstacle.y) {
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

    // Überprüfung der Kollision mit beweglichen Plattformen
    movingPlatforms.forEach(function(platform) {
      if (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y + player.height > platform.y &&
        player.y < platform.y + platform.height &&
        player.dy >= 0
      ) {
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
  if (player.y < canvas.height / 1.15) {
    platforms.forEach(p => p.y += 7); // 6 for Android
  }

  // Entfernt Plattformen, die unterhalb des Bildschirms sind, oder die berührt wurden
  platforms = platforms.filter(p => p.y < canvas.height && !p.touched);
  // Entfernen beweglicher Plattformen, die unterhalb des Bildschirms sind
  movingPlatforms = movingPlatforms.filter(platform => platform.y < canvas.height);

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

  // Zeichnen der Plattformen ohne Bild
  // platforms.forEach(function(p) {
  //   ctx.fillStyle = '#8B4513';
  //   ctx.fillRect(p.x, p.y, p.width, p.height);
  // });
  
    // Zeichnen der Plattformen mit dem Plattformbild
    platforms.forEach(function(p) {
      ctx.drawImage(platformImage, p.x, p.y, p.width, p.height);
    });


  if(score>10){
    // Aktualisieren und Zeichnen des Hindernisses
    updateObstacle();
    checkCollisionWithObstacle();
    ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }

  // Bewegliche Plattformen erzeugen
  if (score >= 5 && Math.random() < 0.004) { // Ähnliche Rate wie bei den Hindernissen
    createMovingPlatform();
  }
  updateMovingPlatforms();

  if (score>30){
    updateSecondObstacle();
    checkCollisionWithSecondObstacle();
    ctx.drawImage(secondObstacleImage, secondObstacle.x, secondObstacle.y, secondObstacle.width, secondObstacle.height);  
  }

  // Zeichnen des Spielers
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

  // Zeichnen der beweglichen Plattformen
  movingPlatforms.forEach(platform => {
    ctx.drawImage(stonePlatformImage, platform.x, platform.y, platform.width, platform.height);
  });

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
  player.dx = touchX < canvas.width / 2 ? -17 : 17; // -10:10 for Android
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

// Verhindern von Zoom-Effekten bei Berührung
function preventDefaultTouchEvents(event) {
  if (event.touches.length < 2) {
    event.preventDefault();
  }
}

// Info Buttons
document.getElementById('infoButton').addEventListener('click', function() {
  const infoDiv = document.getElementById('infoDiv');
  // Prüft, ob das Info-Div sichtbar ist, und schaltet die Sichtbarkeit um
  if (infoDiv.style.display === 'block') {
      infoDiv.style.display = 'none';
  } else {
      infoDiv.style.display = 'block';
  }
});
document.getElementById('closeInfo').addEventListener('click', function() {
  document.getElementById('infoDiv').style.display = 'none';
});


// Initialisierung des Canvas und der Spielvariablen
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImage = new Image();
playerImage.src = '../GoodleJumpIOS/public/CharacterCut.png'; // Pfad zum Spielerbild

// Plattformbild laden
const platformImage = new Image();
platformImage.src = '../GoodleJumpIOS/public/Plattform.png'; // Pfad zum Plattformbild

// Bewegende Plattform laden
const stonePlatformImage = new Image();
stonePlatformImage.src = '../GoodleJumpIOS/public/StonePlatform.png'; // Pfad zum Bild der Steinplattform









// Coin Obstacle start
const coinImage = new Image();
coinImage.src = '../GoodleJumpIOS/public/coin.png'; // Pfad zum Coin-Bild

let coin = {
  x: -80, // Startposition außerhalb des Bildschirms
  y: 0,
  width: 80, // Angepasste Größe nach Bedarf
  height: 80,
  dx: -5, // Geschwindigkeit
};

let coins = [];

function placeCoinOnPlatform(platform) {
  coins.push({
    x: platform.x + platform.width / 2 - 25, // Münze in der Mitte der Plattform
    y: platform.y - 55, // Münze über der Plattform
    width: 55,
    height: 55,
    platform: platform
  });
}

function updateAndDrawCoins() {
  for (let i = coins.length - 1; i >= 0; i--) {
    let coin = coins[i];
    // Münze mit Plattform bewegen
    coin.x = coin.platform.x + coin.platform.width / 2 - 25;
    coin.y = coin.platform.y - 80;
    // Münze zeichnen
    ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
    // Entfernen, wenn die Plattform entfernt wird
    if (coin.platform.y > canvas.height || !platforms.includes(coin.platform)) {
      coins.splice(i, 1);
    }
  }
}

function checkCollisionWithCoins() {
  for (let i = coins.length - 1; i >= 0; i--) {
    let coin = coins[i];
    if (player.x < coin.x + coin.width &&
        player.x + player.width > coin.x &&
        player.y < coin.y + coin.height &&
        player.y + player.height > coin.y) {
      score += 1; // Score um 1 erhöhen
      coins.splice(i, 1); // Münze entfernen
    }
  }
}
// Coin Ende




// Shield start
const shieldImage = new Image();
shieldImage.src = '../GoodleJumpIOS/public/shield.png'; // Pfad zum Shield-Bild

let shields = [];

function placeShieldOnPlatform(platform) {
  shields.push({
    x: platform.x + platform.width / 2 - 35, // Shield in der Mitte der Plattform
    y: platform.y - 80, // Shield über der Plattform
    width: 70,
    height: 80,
    platform: platform
  });
}

function updateAndDrawShields() {
  for (let i = shields.length - 1; i >= 0; i--) {
    let shield = shields[i];
    // Shield mit Plattform bewegen
    shield.x = shield.platform.x + shield.platform.width / 2 - 40;
    shield.y = shield.platform.y - 80;

    // Shield zeichnen
    ctx.drawImage(shieldImage, shield.x, shield.y, shield.width, shield.height);

    // Entfernen, wenn die Plattform entfernt wird
    if (shield.platform.y >= canvas.height || !platforms.includes(shield.platform)) {
      shields.splice(i, 1);
    }
  }
}

let shieldActive = false;
let shieldActivationTime;
let shieldEndTime = 0; // Zeitpunkt, wann der Schild enden soll

function checkCollisionWithShields() {
  for (let i = shields.length - 1; i >= 0; i--) {
    let shield = shields[i];
    if (player.x < shield.x + shield.width &&
        player.x + player.width > shield.x &&
        player.y < shield.y + shield.height &&
        player.y + player.height > shield.y) {
      shieldActive = true;
      shieldEndTime = Date.now() + 5000; // 5 Sekunden in die Zukunft
      shields.splice(i, 1); // Shield entfernen
    }
  }
}

function drawShield() {
  if (shieldActive && Date.now() < shieldEndTime) {
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(173, 216, 230, 0.5)"; // Hellblau, halbtransparent
    ctx.fill();
  } else if (Date.now() >= shieldEndTime) {
    shieldActive = false;
  }
}
// shield end

//Tequila START
const tequilaImage = new Image();
tequilaImage.src = '../GoodleJumpIOS/public/tequila.png'; // Pfad zum Tequila-Bild

let tequila = {
  x: -85, // Startposition außerhalb des Bildschirms
  y: 0,
  width: 65, // Angepasste Größe nach Bedarf
  height: 85,
  dx: -5, // Geschwindigkeit
};
let tequilas = [];

function placeTequilaOnPlatform(platform) {
  tequilas.push({
    x: platform.x + platform.width / 2 - 32.5, // Tequila in der Mitte der Plattform
    y: platform.y - 85, // Tequila über der Plattform
    width: 65,
    height: 85,
    platform: platform
  });
}
function updateAndDrawTequilas() {
  for (let i = tequilas.length - 1; i >= 0; i--) {
    let tequila = tequilas[i];
    // Tequila mit Plattform bewegen
    tequila.x = tequila.platform.x + tequila.platform.width / 2 - 32.5;
    tequila.y = tequila.platform.y - 85;
    // Tequila zeichnen
    ctx.drawImage(tequilaImage, tequila.x, tequila.y, tequila.width, tequila.height);
    // Entfernen, wenn die Plattform entfernt wird
    if (tequila.platform.y > canvas.height || !platforms.includes(tequila.platform)) {
      tequilas.splice(i, 1);
    }
  }
}
function checkCollisionWithTequilas() {
  for (let i = tequilas.length - 1; i >= 0; i--) {
    let tequila = tequilas[i];
    if (player.x < tequila.x + tequila.width &&
        player.x + player.width > tequila.x &&
        player.y < tequila.y + tequila.height &&
        player.y + player.height > tequila.y) {
      // Zufällige Plattform neu positionieren
      if (platforms.length > 0) {
        const randomIndex = Math.floor(Math.random() * platforms.length);
        const randomPlatform = platforms[randomIndex];
        
        // Neue zufällige Position für die Plattform festlegen
        randomPlatform.x = Math.random() * (canvas.width - randomPlatform.width);
        randomPlatform.y = canvas.height - 200 - randomIndex * platGap;
      }

      tequilas.splice(i, 1); // Tequila entfernen
    }
  }
}
//Tequila END









// Nutella Obstacle start
const nutellaObstacleImage = new Image();
nutellaObstacleImage.src = '../GoodleJumpIOS/public/nutella.png'; // Pfad zum Nutella-Hindernisbild

let nutellaObstacle = {
  x: -80,
  y: 0,
  width: 80,
  height: 90,
  dx: 0
};

function updateNutellaObstacle() {
  if (gameStarted && Math.random() < 0.001 && nutellaObstacle.x < 0) {
    nutellaObstacle.x = canvas.width;
    nutellaObstacle.y = Math.random() * (canvas.height - nutellaObstacle.height);
    nutellaObstacle.dx = -5;
  }
  nutellaObstacle.x += nutellaObstacle.dx;

  if (nutellaObstacle.x + nutellaObstacle.width < 0) {
    nutellaObstacle.dx = 0;
    nutellaObstacle.x = -80;
  }
}

let jumpPowerEffectTimeout;

function checkCollisionWithNutellaObstacle() {
  if (!shieldActive && player.x < nutellaObstacle.x + nutellaObstacle.width &&
    player.x + player.width > nutellaObstacle.x &&
    player.y < nutellaObstacle.y + nutellaObstacle.height &&
    player.y + player.height > nutellaObstacle.y) {
    nutellaObstacle.x = -80; // Entfernt das Hindernis

    if (!jumpPowerEffectTimeout) {
      jumpPower /= 1.75;
      jumpPowerEffectTimeout = setTimeout(() => {
        jumpPower *= 1.75;
        jumpPowerEffectTimeout = null;
      }, 3000);
    }
  }
}
// Nutella Obstacle end



// Player Stats
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


// Charakterwahl
const characterOptions = document.querySelectorAll('.characterOption');
let selectedCharacter = '../GoodleJumpIOS/public/man.png'; // Standardcharakter

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
    let newPlatform = {
      x: Math.random() * (canvas.width - platformWidth),
      y: platY,
      width: platformWidth,
      height: platformHeight
    };
    platforms.push(newPlatform);
    placeCoinOnPlatform(newPlatform); // Münze auf jeder neuen Plattform platzieren
  }
}
createPlatforms();

// Aktualisierung der Spielerposition
function updatePlayer() {
  if (isJumping) {
    player.dy = -jumpPower;
  } else {
    player.dy = gravity;
  }
  player.y += player.dy;
  player.x += player.dx;

  // Wrap-Around-Logik für den horizontalen Bildschirmrand
  if (player.x > canvas.width) {
    player.x = -player.width;
  } else if (player.x < -player.width) {
    player.x = canvas.width;
  }
  // Spieler am oberen Bildschirmrand halten
  if (player.y < 105) {
    movePlatformsDown(player.y - 105);
    player.y = 105;
  }
  // Spieler am unteren Bildschirmrand halten
  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    isJumping = false;
  }

  // ... Rest der Funktion ...
}


// Funktion, um Plattformen nach unten zu bewegen
function movePlatformsDown(offset) {
  platforms.forEach(p => p.y -= offset);
  coins.forEach(coin => coin.y -= offset); // Münzen ebenfalls bewegen
}



// Hinderniss
const obstacleImage = new Image();
obstacleImage.src = '../GoodleJumpIOS/public/obstacle.png'; // Pfad zum Hindernisbild
let obstacle = {
  x: -155, // Start außerhalb des Bildschirms
  y: 0,
  width: 155,
  height: 105,
  dx: 0 // Anfangsgeschwindigkeit
};
// Funktionen für Hindernis (Flugzeug)
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
    obstacle.x = -155; // Zurück zum Startpunkt außerhalb des Bildschirms
  }
}
function checkCollisionWithObstacle() {
  if (!shieldActive && player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y) {
    gameOver();
  }
}

// Hindernis 2 (Ufo)
const secondObstacleImage = new Image();
secondObstacleImage.src = '../GoodleJumpIOS/public/ufoCut.png'; // Pfad zum zweiten Hindernisbild
let secondObstacle = {
  x: -185, // Start außerhalb des Bildschirms
  y: 0,
  width: 185,
  height: 115,
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
    secondObstacle.x = -185;
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


// Wolke START
const cloudImage = new Image();
cloudImage.src = '../GoodleJumpIOS/public/wolke.png'; // Pfad zum Cloud-Bild
let cloud = {
  x: -280, // Startposition außerhalb des Bildschirms
  y: 0,
  width: 280, // Angepasste Größe nach Bedarf
  height: 220,
  dx: -4 // Geschwindigkeit
};
function updateCloud() {
  if (gameStarted && (score < 15 || score > 100) && Math.random() < 0.55 && cloud.x < 0) {
    cloud.x = canvas.width;
    cloud.y = Math.random() * (canvas.height - cloud.height);
    cloud.dx = -4;
  }
  cloud.x += cloud.dx;
  // Entfernen, wenn es außerhalb des Bildschirms ist
  if (cloud.x + cloud.width < 0) {
    cloud.x = -280;
  }
}

// Wolke ENDE


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
  // Bewegt vorhandene Plattformen und entfernt sie, wenn sie den Bildschirm verlassen
  platforms.forEach(p => {
    if (player.y < canvas.height / 1.1) {
      p.y += 7; // 6 for Android
    }
  });

  platforms = platforms.filter(p => p.y < canvas.height);

  // Generiert neue Plattformen und fügt zufällig Münzen hinzu
  while (platforms.length < platformCount) {
    let lastPlatform = platforms[platforms.length - 1];
    let newY = lastPlatform.y - platGap;
    let newPlatform = {
      x: Math.random() * (canvas.width - platformWidth),
      y: newY,
      width: platformWidth,
      height: platformHeight
    };
    platforms.push(newPlatform);

    // Zufällige Chance, eine Münze auf der neuen Plattform zu platzieren
    if (Math.random() < 0.3) { // Hier können Sie die Wahrscheinlichkeit anpassen
      placeCoinOnPlatform(newPlatform);
    }

    // Zufällige Chance, ein Schild auf der neuen Plattform zu platzieren
    if (Math.random() < 0.03) { // 3% Wahrscheinlichkeit
      placeShieldOnPlatform(newPlatform);
    }

        // Zufällige Chance, ein Schild auf der neuen Plattform zu platzieren
    if (score >= 50 && Math.random() < 0.02) { // Ab Score 50 & 2% Wahrscheinlichkeit
      placeTequilaOnPlatform(newPlatform);
    }
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
  updateAndDrawCoins();
  updatePlayer();
  collisionDetection();
  
    // Zeichnen der Plattformen mit dem Plattformbild
    platforms.forEach(function(p) {
      ctx.drawImage(platformImage, p.x, p.y, p.width, p.height);
    });

  // shield Logic
  updateAndDrawShields();
  checkCollisionWithShields();
  // Zeichnen des Schutzschilds, wenn aktiv
  if (shieldActive) {
    drawShield();
  }
  // shield ende

  
  // Update-Logik für Coin
  updateAndDrawCoins();
  checkCollisionWithCoins();
  // Coin ende

  // Tequila
  updateAndDrawTequilas();
  checkCollisionWithTequilas();
  
  // Bewegliche Plattformen erzeugen
  if (score >= 10 && Math.random() < 0.004) { // Ähnliche Rate wie bei den Hindernissen
    createMovingPlatform();
  }
    updateMovingPlatforms();
  // Zeichnen der beweglichen Plattformen
  movingPlatforms.forEach(platform => {
    ctx.drawImage(stonePlatformImage, platform.x, platform.y, platform.width, platform.height);
  });
  
  // Flugzeug ab (score===25)
  if(score>25){
    // Aktualisieren und Zeichnen des Hindernisses
    updateObstacle();
    checkCollisionWithObstacle();
    ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
  // Update-Logik für Nutella-Hindernis...
  if (score >= 40) {
    updateNutellaObstacle();
    checkCollisionWithNutellaObstacle();
  }
  // Zeichnen des Nutella-Hindernisses, wenn es sich auf dem Bildschirm befindet
  if (nutellaObstacle.x >= 0) {
    ctx.drawImage(nutellaObstacleImage, nutellaObstacle.x, nutellaObstacle.y, nutellaObstacle.width, nutellaObstacle.height);
  }
  // Nutella ende

  // Ufo 
  if (score>70){
    updateSecondObstacle();
    checkCollisionWithSecondObstacle();
    ctx.drawImage(secondObstacleImage, secondObstacle.x, secondObstacle.y, secondObstacle.width, secondObstacle.height);  
  }

  // Zeichnen des Spielers
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

  // Wolke
    updateCloud();
  // Zeichnen des Cloud-Hindernisses mit Opazität
  if (cloud.x >= -cloud.width && cloud.x <= canvas.width) {
    ctx.globalAlpha = 0.8; // Setzen der Transparenz
    ctx.drawImage(cloudImage, cloud.x, cloud.y, cloud.width, cloud.height);
    ctx.globalAlpha = 1.0; // Zurücksetzen der Transparenz
  }

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

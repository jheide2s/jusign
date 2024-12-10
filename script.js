// Holen der SVG-Elemente
const player = document.getElementById('player');
const obstacles = [document.getElementById('obstacle1'), document.getElementById('obstacle2')];
const gameStatus = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');
const pauseBtn = document.getElementById('pauseBtn');
const gameArea = document.getElementById('gameArea');

// Spielfigur-Einstellungen
const playerSpeed = 5;
const obstacleSpeed = 2;

// Spielfeld-Koordinaten
let playerX = parseInt(player.getAttribute('cx'));
let playerY = parseInt(player.getAttribute('cy'));

// Hindernisse-Positionen
let obstaclePositions = obstacles.map(obstacle => ({
    x: parseInt(obstacle.getAttribute('x')),
    y: parseInt(obstacle.getAttribute('y'))
}));

// Spielstatus
let isGameOver = false;
let isPaused = false; // Pause-Status

// Event-Listener für die Steuerung des Spielers
document.addEventListener('keydown', (e) => {
    if (isGameOver || isPaused) return; // Keine Eingaben, wenn das Spiel vorbei oder pausiert ist

    if (e.key === 'ArrowUp') playerY -= playerSpeed;
    if (e.key === 'ArrowDown') playerY += playerSpeed;
    if (e.key === 'ArrowLeft') playerX -= playerSpeed;
    if (e.key === 'ArrowRight') playerX += playerSpeed;

    // Update der Spielerposition
    player.setAttribute('cx', playerX);
    player.setAttribute('cy', playerY);
});

// Spiellogik
function gameLoop() {
    if (isGameOver || isPaused) return; // Spiel anhalten, wenn es pausiert oder vorbei ist

    // Hindernisse bewegen
    obstaclePositions.forEach((position, index) => {
        position.x -= obstacleSpeed;
        if (position.x < -20) {
            position.x = 600 + Math.random() * 100; // Setzt das Hindernis außerhalb des Bildschirms zurück
            position.y = Math.random() * 380; // Zufällige Y-Position für das Hindernis
        }
        obstacles[index].setAttribute('x', position.x);
        obstacles[index].setAttribute('y', position.y);

        // Kollisionserkennung
        if (checkCollision(playerX, playerY, position.x, position.y)) {
            gameOver();
            return; // Stoppt das Spiel
        }
    });

    requestAnimationFrame(gameLoop); // Wiederholt die Spielschleife
}

// Funktion zur Kollisionserkennung
function checkCollision(px, py, ox, oy) {
    const playerRadius = 20;
    const obstacleWidth = 20;
    const obstacleHeight = 20;

    // Prüfen, ob der Spieler mit einem Hindernis kollidiert
    if (px < ox + obstacleWidth && px + playerRadius > ox &&
        py < oy + obstacleHeight && py + playerRadius > oy) {
        return true;
    }
    return false;
}

// Game Over Funktion
function gameOver() {
    isGameOver = true;
    gameStatus.textContent = "Game Over!";
    player.classList.add('exploding'); // Explosionseffekt auf den Spieler anwenden
    restartBtn.style.display = 'block'; // Neustart-Button anzeigen
}

// Neustart des Spiels
function restartGame() {
    // Reset des Spiels
    isGameOver = false;
    gameStatus.textContent = "Spiel läuft...";
    restartBtn.style.display = 'none'; // Neustart-Button ausblenden

    // Reset der Spielerposition und -animation
    player.setAttribute('cx', 50);
    player.setAttribute('cy', 200);
    player.classList.remove('exploding'); // Explosionseffekt entfernen

    // Reset der Hindernisse
    obstaclePositions = obstacles.map(obstacle => ({
        x: 600 + Math.random() * 100,
        y: Math.random() * 380
    }));
    obstacles.forEach((obstacle, index) => {
        obstacle.setAttribute('x', obstaclePositions[index].x);
        obstacle.setAttribute('y', obstaclePositions[index].y);
    });

    // Spiel erneut starten
    gameLoop();
}

// Pause und Fortsetzen des Spiels
function togglePause() {
    if (isPaused) {
        isPaused = false;
        pauseBtn.textContent = "Pause";
        gameLoop(); // Spiel fortsetzen
    } else {
        isPaused = true;
        pauseBtn.textContent = "Fortsetzen";
    }
}

// Spiel starten
gameLoop();

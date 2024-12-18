const game2PreviewContainer = document.getElementById('game2PreviewContainer');
const game2Container = document.getElementById('game2Container');
const game2Area = document.getElementById('game2Area');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const game2Status = document.getElementById('game2Status');
const pauseGame2Btn = document.getElementById('pauseGame2Btn');
const minimizeGame2Btn = document.getElementById('minimizeGame2Btn');
const restartGame2Btn = document.getElementById('restartGame2Btn');

let paddleX = parseInt(paddle.getAttribute('x'));
let paddleWidth = 50; // Breite des Paddles
let ballX = paddleX + paddleWidth / 2; // Ball startet mittig über dem Paddle
let ballY = 360; // Direkt über dem Paddle
let ballSpeedX = 0; // Ball bleibt am Anfang stehen
let ballSpeedY = 0; // Ball bleibt am Anfang stehen
let isGame2Paused = false;
let isGame2Minimized = false;
let ballInMotion = false; // Ball ist zunächst nicht in Bewegung

function startGame2() {
    game2PreviewContainer.style.display = 'none';
    game2Container.style.display = 'block';
    isGame2Paused = false;
    ballX = paddleX + paddleWidth / 2; // Ball mittig auf dem Paddle
    ballY = 360; // Ball auf dem Paddle
    ball.setAttribute('cx', ballX);
    ball.setAttribute('cy', ballY);
    game2Loop();
}

document.addEventListener('keydown', (e) => {
    if (isGame2Paused || isGame2Minimized) return;

    if (e.key === 'ArrowLeft' && paddleX > 0) paddleX -= 10;
    if (e.key === 'ArrowRight' && paddleX < 550) paddleX += 10;

    paddle.setAttribute('x', paddleX);

    // Wenn der Ball noch nicht gestartet ist, bewegt er sich mit dem Paddle
    if (!ballInMotion) {
        ballX = paddleX + paddleWidth / 2;
        ball.setAttribute('cx', ballX);
    }

    // Ball mit Space starten
    if (e.key === ' ') {
        if (!ballInMotion) {
            ballSpeedX = 4; // Setze Ballgeschwindigkeit
            ballSpeedY = -4; // Setze Ballgeschwindigkeit
            ballInMotion = true;
        }
    }
});

function game2Loop() {
    if (isGame2Paused || isGame2Minimized) return;

    // Ballbewegung, nur wenn in Bewegung
    if (ballInMotion) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }

    // Wände
    if (ballX <= 0 || ballX >= 590) ballSpeedX *= -1;
    if (ballY <= 0) ballSpeedY *= -1;

    // Paddel-Kollision
    if (
        ballY >= 360 &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        ballSpeedY *= -1;
    }

    // Unten verloren
    if (ballY > 400) {
        game2Status.textContent = 'Game Over!';
        restartGame2Btn.style.display = 'block';
        return;
    }

    ball.setAttribute('cx', ballX);
    ball.setAttribute('cy', ballY);

    requestAnimationFrame(game2Loop);
}

function togglePauseGame2() {
    if (isGame2Paused) {
        isGame2Paused = false;
        pauseGame2Btn.textContent = 'II';
        game2Loop();
    } else {
        isGame2Paused = true;
        pauseGame2Btn.textContent = '►';
    }
}

function minimizeGame2() {
    if (isGame2Minimized) {
        game2Container.style.display = 'block';
        game2PreviewContainer.style.display = 'none';
        minimizeGame2Btn.textContent = '_';
        isGame2Minimized = false;
        game2Loop();
    } else {
        game2Container.style.display = 'none';
        game2PreviewContainer.style.display = 'block';
        minimizeGame2Btn.textContent = '◻';
        isGame2Minimized = true;
    }
}

function restartGame2() {
    paddleX = 275;
    paddle.setAttribute('x', paddleX);

    ballX = paddleX + paddleWidth / 2; // Ball startet mittig über dem Paddle
    ballY = 360; // Direkt über dem Paddle

    ballSpeedX = 0; // Ball bleibt stehen
    ballSpeedY = 0;
    ballInMotion = false; // Ball wird zurückgesetzt

    ball.setAttribute('cx', ballX);
    ball.setAttribute('cy', ballY);

    game2Status.textContent = 'Spiel läuft...';
    restartGame2Btn.style.display = 'none';
    isGame2Paused = false;
    game2Loop();
}

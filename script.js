const player = document.getElementById('player');
const obstacles = [document.getElementById('obstacle1'), document.getElementById('obstacle2')];
const gameStatus = document.getElementById('gameStatus');
const gameArea = document.getElementById('gameArea');

const playerSpeed = 5;
const obstacleSpeed = 2;

let playerX = parseInt(player.getAttribute('cx'));
let playerY = parseInt(player.getAttribute('cy'));

let obstaclePositions = obstacles.map(obstacle => ({
    x: parseInt(obstacle.getAttribute('x')),
    y: parseInt(obstacle.getAttribute('y'))
}));

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') playerY -= playerSpeed;
    if (e.key === 'ArrowDown') playerY += playerSpeed;
    if (e.key === 'ArrowLeft') playerX -= playerSpeed;
    if (e.key === 'ArrowRight') playerX += playerSpeed;

    player.setAttribute('cx', playerX);
    player.setAttribute('cy', playerY);
});

function gameLoop() {
    obstaclePositions.forEach((position, index) => {
        position.x -= obstacleSpeed;
        if (position.x < -20) {
            position.x = 600 + Math.random() * 100;
            position.y = Math.random() * 380;
        }
        obstacles[index].setAttribute('x', position.x);
        obstacles[index].setAttribute('y', position.y);

        if (checkCollision(playerX, playerY, position.x, position.y)) {
            gameStatus.textContent = "Game Over!";
            return;
        }
    });

    requestAnimationFrame(gameLoop);
}

function checkCollision(px, py, ox, oy) {
    const playerRadius = 20;
    const obstacleWidth = 20;
    const obstacleHeight = 20;

    if (px < ox + obstacleWidth && px + playerRadius > ox &&
        py < oy + obstacleHeight && py + playerRadius > oy) {
        return true;
    }
    return false;
}

gameLoop();


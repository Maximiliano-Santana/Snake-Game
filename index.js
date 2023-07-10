const canvas = document.getElementById('game');
const cxt = canvas.getContext('2d');

const startMesage = document.getElementById('start');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 8;

let headX = 9;
let headY = 9;
let tileLength = 0;
let snakeParts = [];

let tileCount = 20;
let snakeWidth = canvas.width / tileCount - 2;

let directionX = 0;
let directionY = 0;

let appleX = randomNum();
let appleY = randomNum();



let gameStarted = false;

function startGame() {
    if (gameStarted) {
        startMesage.style.display = 'none';
        clearScreen();
        moveSnake();
        checkAppleCollision();

        drawSnake();
        drawScore();
        drawApple();

        if (checkSnakeCollision(headX, headY) || checkBorderColission()) {
            cxt.fillStyle = 'white';
            cxt.font = " 40px Comic";
            cxt.fillText(`You lose scored: ${tileLength}`, 20, canvas.height / 2);
            setTimeout(function() { location.reload(); }, 3000);
            gameStarted = false;
        }
    }
    setTimeout(startGame, 1000 / speed);

}

function clearScreen() {
    cxt.fillStyle = 'black';
    cxt.fillRect(0, 0, canvas.height, canvas.width);
}

function moveSnake() {
    snakeParts.push(new SnakePart(headX, headY));
    headX += directionX;
    headY += directionY;
}

function drawSnake() {
    snakeParts.forEach(part => {
        cxt.fillStyle = 'green';
        cxt.fillRect(part.x * tileCount, part.y * tileCount, snakeWidth, snakeWidth);
    });
    if (snakeParts.length > tileLength) {
        snakeParts.shift();
    }

    cxt.fillStyle = 'green';
    cxt.fillRect(headX * tileCount, headY * tileCount, snakeWidth, snakeWidth);
    cxt.fillStyle = 'black';
    cxt.fillRect(headX * tileCount + 4, headY * tileCount + 4, 4, 4);
}

function drawScore() {
    cxt.fillStyle = 'white';
    cxt.font = " 15px Comic";
    cxt.fillText(`Score: ${tileLength}`, 5, 10);
}

function drawApple() {
    cxt.fillStyle = 'red';
    cxt.fillRect(appleX * tileCount, appleY * tileCount, snakeWidth, snakeWidth);
}

function checkAppleCollision() {
    if (appleX == headX && appleY == headY) {
        tileLength += 1;
        do {
            appleY = randomNum();
            appleX = randomNum();
        } while (checkSnakeCollision(appleX, appleY))
        drawApple();
    }
}

function checkSnakeCollision(X, Y) {
    let collisionDetected = false;
    snakeParts.forEach(part => {
        if (X == part.x && Y == part.y) {
            collisionDetected = true;
        }
    })
    return (collisionDetected);
}

function checkBorderColission() {
    let collisionDetected = false;
    if (headX > canvas.height / tileCount || headY > canvas.width / tileCount || headX < 0 || headY < 0) {
        collisionDetected = true;
    }
    return (collisionDetected);
}

function randomNum() {
    let max = tileCount - 1;
    let min = 0;
    return ((cartaEnemigo = Math.floor(Math.random() * (max - min + 1) + min)));
}



function keyDown(event) {
    switch (event.keyCode) {
        case 38: // up
            gameStarted = true;
            if (!(directionY > 0)) {
                directionX = 0;
                directionY = -1;
            }
            break;
        case 40: // down
            gameStarted = true;
            if (!(directionY < 0)) {
                directionX = 0;
                directionY = 1;
            }
            break;
        case 37: // left
            gameStarted = true;
            if (!(directionX > 0)) {
                directionX = -1;
                directionY = 0;
            }
            break;
        case 39: // right
            gameStarted = true;
            if (!(directionX < 0)) {
                directionX = 1;
                directionY = 0;
            }
            break;
    }
}

addEventListener('keydown', keyDown);

startGame();
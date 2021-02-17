const bird = document.querySelector(".bird");
const game = document.querySelector(".game");
const ground = document.querySelector(".ground")

let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;
let isGameOver = false;
let gap = 400;

function startGame(){
    if (birdBottom > 0) birdBottom -= gravity;
    bird.style.bottom = birdBottom + ".px";
    bird.style.left = birdLeft + ".px";
};

let gameTimerID = setInterval(startGame, 20);

function control(e){
    if (e.keyCode === 32){
        jump();
    };
};

function jump(){
    if (birdBottom < 500) birdBottom += 50; 
    bird.style.bottom = birdBottom + "px";
};

document.addEventListener("keyup", control);

function generateObstacle(){
    let obstacleLeft = 500;
    let obstacleBottom = Math.random() * 60;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    const ground = document.createElement("div");
    if (!isGameOver){
        obstacle.classList.add("obstacle");
        topObstacle.classList.add("topObstacle")
        ground.classList.add("ground");
    };
    game.appendChild(obstacle);
    game.appendChild(topObstacle);
    game.appendChild(ground);
    topObstacle.style.rotate = 180;
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle(){
        obstacleLeft -= 2
        obstacle.style.left = obstacleLeft + "px";
        topObstacle.style.left = obstacleLeft + "px";
        ground.style.left = obstacleLeft + "px";

        if (obstacleLeft === -60){
            clearInterval(timerID);
            game.removeChild(obstacle);
            game.removeChild(topObstacle);
            game.removeChild(ground);
        };

        if (birdBottom === 0){
            gameOver();
        };

        if (obstacleLeft > 200 && obstacleLeft < 280 
            && birdBottom < obstacleBottom + 153){
            gameOver();
            clearInterval(timerID);
        };
    };
    let timerID = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
};

generateObstacle();

function gameOver(){
    clearInterval(gameTimerID);
    isGameOver = true;
    document.removeEventListener("keyup", control);
};
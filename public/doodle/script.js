const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeft = 50;
let startPoint = 150;
let doodlerBottom = startPoint;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let upTimer;
let downTimer;
let jumping = false;
let goingLeft = false;
let goingRight = false;
let leftTimer;
let rightTimer;

function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
  doodlerLeft = platforms[0].left;
  doodler.style.left = doodlerLeft + "px";
  doodler.style.bottom = doodlerBottom + "px";
}

class Platform {
  constructor(newPlatformBottom) {
    this.bottom = newPlatformBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement("div");
    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.left = this.left + "px";
    visual.style.bottom = this.bottom + "px";
    grid.appendChild(visual);
  }
}

function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platformGap = 600 / platformCount;
    let newPlatformBottom = 100 + i * platformGap;
    let newPlatform = new Platform(newPlatformBottom);
    platforms.push(newPlatform);
  }
}

function movePlatforms() {
  if (doodlerBottom > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + "px";
    });
  }
}

function jump() {
  clearInterval(downTimer);
  jumping = true;
  upTimer = setInterval(function () {
    doodlerBottom += 20;
    doodler.style.bottom = doodlerBottom + "px";
    if (doodlerBottom > startPoint + 200) {
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimer);
  jumping = false;
  downTimer = setInterval(function () {
    doodlerBottom -= 5;
    doodler.style.bottom = doodlerBottom + "px";
    if (doodlerBottom < 0) {
      gameOver();
    }
    platforms.forEach((platform) => {
      if (
        doodlerBottom >= platform.bottom &&
        doodlerBottom <= platform.bottom + 15 &&
        doodlerLeft + 60 >= platform.left &&
        doodlerLeft <= platform.left + 85 &&
        !jumping
      ) {
        jump();
        startPoint = doodlerBottom;
      }
    });
  }, 30);
}

function gameOver() {
  isGameOver = true;
  document.removeEventListener("keyup", control);
  clearInterval(upTimer);
  clearInterval(downTimer);
  clearInterval(leftTimer);
  clearInterval(rightTimer);
}

function control(e) {
  if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    moveStraight();
  }
}

function moveLeft() {
  goingRight = false;
  clearInterval(rightTimer);
  leftTimer = setInterval(function () {
    goingLeft = true;
    if (doodlerLeft >= 0 && !isGameOver) {
      doodlerLeft -= 5;
      doodler.style.left = doodlerLeft + "px";
    } else if (!isGameOver){
      moveRight();
    }
  }, 30);
}

function moveRight() {
  goingLeft = false;
  clearInterval(leftTimer);
  rightTimer = setInterval(function () {
    goingRight = true;
    if (doodlerLeft <= 340 && !isGameOver) {
      doodlerLeft += 5;
      doodler.style.left = doodlerLeft + "px";
    } else if (!isGameOver) {
      moveLeft();
    }
  }, 30);
}

function moveStraight(){
    goingLeft = false;
    goingRight = false;
    clearInterval(leftTimer);
    clearInterval(rightTimer);
}

function start() {
  if (!isGameOver) {
    createPlatforms();
    createDoodler();
    setInterval(movePlatforms, 30);
    jump();
    document.addEventListener("keyup", control);
  }
}

start();

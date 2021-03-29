const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeft = 50;
let doodlerBottom = 150;
let isGameOver = false;
let platformCount = 5;
let platforms = [];
let upTimer;
let downTimer;

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
  upTimer = setInterval(function () {
    doodlerBottom += 20;
    doodler.style.bottom = doodlerBottom + "px";
    if (doodlerBottom > 400) {
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimer);
  downTimer = setInterval(function () {
    doodlerBottom -= 5;
    doodler.style.bottom = doodlerBottom + "px";
    if (doodlerBottom < 0) {
      gameOver();
    }
  }, 30);
}

function gameOver() {
    isGameOver = true;
    clearInterval(upTimer);
    clearInterval(downTimer);
}

function start() {
  if (!isGameOver) {
    createPlatforms();
    createDoodler();
    setInterval(movePlatforms, 30);
    jump();
  }
}

start();

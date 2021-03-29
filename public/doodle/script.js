const grid = document.querySelector(".grid");
const doodler = document.createElement("div");
let doodlerLeft = 50;
let doodlerBottom = 150;
let isGameOver = false;
let platformCount = 5;
let platforms = [];

function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add("doodler");
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
    if 
}

function start() {
  if (!isGameOver) {
    createDoodler();
    createPlatforms();
    movePlatforms();
  }
}

start();

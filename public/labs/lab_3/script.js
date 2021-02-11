"use strict";

let position = 0;
const list = carousel.querySelector("ul");

right.onclick = () => {
  position += 310;
  list.style.marginLeft = position + "px";
  hide_arrow(".right");
  unhide_arrow(".left");
};

left.onclick = () => {
  position -= 310;
  list.style.marginLeft = position + "px";
  unhide_arrow(".right");
  hide_arrow(".left");
};

let hide_arrow = (arrow) => {
  carousel.querySelector(arrow).style.visibility = "hidden";
};

let unhide_arrow = (arrow) => {
  carousel.querySelector(arrow).style.visibility = "visible";
};
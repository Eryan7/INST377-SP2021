"use strict";

let position = 0;
const list = carousel.querySelector("ul");

hide_arrow(".right");

right.onclick = function () {
  position += 310;
  list.style.marginLeft = position + "px";
  hide_arrow(".right");
  unhide_arrow(".left");
};

left.onclick = function () {
  position -= 310;
  list.style.marginLeft = position + "px";
  unhide_arrow(".right");
  hide_arrow(".left");
};

function hide_arrow(arrow) {
  carousel.querySelector(arrow).style.visibility = "hidden";
};

function unhide_arrow(arrow){
  carousel.querySelector(arrow).style.visibility = "visible";
};
"use strict";

let position = 0;
const list = carousel.querySelector("ul");
let move_count = 0;

right.onclick = function () {
  if (move_count > 0) {
    position += 310;
    list.style.marginLeft = position + "px";
    move_count -= 1;
  }
};

left.onclick = function () {
  if (move_count < 1) {
    position -= 310;
    list.style.marginLeft = position + "px";
    move_count += 1;
  }
};

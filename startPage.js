// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
let myButton, startScreen;

function checkStart() {
  if (startScreen === true) {
    background(255);
    textSize(32);
    fill(0, 102, 153);
    document.getElementById("myParagraph").innerHTML = "Bomb each other to win round. Player 1 is on top left corner use arrow keys to move and space to place bombs. Player 2 is on bottom right corner use ASDW to move and shift to place bombs. Have fun! ";
    myButton.locate(200, 200);
    myButton.text = "Start Game";
    myButton.draw();
     myButton.onPress = function() {
    //When myButton is presse
    this.color = "#AAAAFF"; //Change button color
    startScreen = false;
  };
  }
}


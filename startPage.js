// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
let startButton, instructButton, startScreen;

function checkStart() {
  if (startScreen === true) {
    background(startscreenImage);
    textSize(32);
    fill(0, 102, 153);
    startButton.locate((width/2)-52, 310);
    startButton.text = "Start Game";
    startButton.draw();
     startButton.onPress = function() {
    //When myButton is presse
     //Change button color
    startScreen = false;
  };
  
    instructButton.locate((width/2)-52, 410);
    instructButton.text = "Shop";
    instructButton.draw();
    instructButton.onPress = function() {

  };
  }
}


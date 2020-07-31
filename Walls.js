// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable, random
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = blocksize;
  }
  showSelf() {
    console.log(this.size);
    image(wallImage, this.x, this.y, this.size, this.size);
  }
}

class Log {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = blocksize;
    this.existance = true;
    this.isPowerup = random([1,2,3,4,5,6]);
    this.gone = false;
  }
  showSelf() {
    if (this.isPowerup === 1 && this.gone === true) {
      this.showSpeedPowerup();
    } else if (this.isPowerup === 2 && this.gone === true) {
      this.showLifePowerup();
    } else if (this.isPowerup === 3 && this.gone === true) {
      this.showBombPowerup();
    } else {
      image(logImage, this.x, this.y, this.size, this.size);
    }
  }
  showSpeedPowerup() {
    image(speedPowerUp, this.x + 7, this.y + 7, this.size - 15, this.size - 15);
    console.log("powerup showed");
    noFill();
  }
  showLifePowerup() {
    image(lifePowerUp, this.x + 7, this.y + 7, this.size - 15, this.size - 15);
    noFill();
  }
  showBombPowerup() {
    image(bombPowerUp, this.x + 7, this.y + 7, this.size - 15, this.size - 15);
    noFill();
  }
}

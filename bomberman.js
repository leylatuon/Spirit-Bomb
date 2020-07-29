// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable,image
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
class bomberman {
  constructor(x, y, size, walkLength) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.lives = 1;
    this.won = false;
    this.walkLength = walkLength;
    this.toggleLeft = false;
    this.toggleRight = false;
    this.toggleUp = false;
    this.toggleDown = false;
    this.explosionsize = blocksize;
  }

  showSelf() {
    image(player1Sprite, this.x, this.y, 32, 32);
  }

  moveUp() {
    if (
      keyIsPressed === true &&
      this.toggleUp === false &&
      keyCode === UP_ARROW &&
      this.y >= 0
    ) {
      this.y -= this.walkLength;
      this.toggleRight = false;
      this.toggleDown = false;
      this.toggleLeft = false;
      if (this.checkWallCollison() || this.checkLogCollsion()) {
        this.toggleUp = true;
      }
    }
  }

  moveDown() {
    if (
      keyIsPressed === true &&
      keyCode === DOWN_ARROW &&
      this.toggleDown === false &&
      this.y <= height
    ) {
      this.toggleRight = false;
      this.toggleUp = false;
      this.toggleLeft = false;
      this.y += this.walkLength;
      if (this.checkWallCollison() || this.checkLogCollsion()) {
        this.toggleDown = true;
      }
      console.log(this.toggleLeft, this.toggleUp, this.toggleDown);
    }
  }

  moveLeft() {
    if (
      keyIsPressed === true &&
      keyCode === LEFT_ARROW &&
      this.toggleLeft === false &&
      this.x >= 0
    ) {
      this.toggleRight = false;
      this.toggleUp = false;
      this.toggleDown = false;
      this.x -= this.walkLength;
      if (this.checkWallCollison() || this.checkLogCollsion()) {
        this.toggleLeft = true;
      }
      console.log(this.toggleRight, this.toggleUp, this.toggleDown);
    }
  }
  moveRight() {
    if (
      keyIsPressed === true &&
      keyCode === RIGHT_ARROW &&
      this.toggleRight === false &&
      this.x <= width
    ) {
      this.toggleLeft = false;
      this.toggleUp = false;
      this.toggleDown = false;
      this.x += this.walkLength;
      if (this.checkWallCollison() || this.checkLogCollsion()) {
        this.toggleRight = true;
      }
      console.log(this.toggleRight, this.toggleUp, this.toggleDown);
    }
  }

  placeBomb() {
    if (keyIsPressed === true && keyCode === 32 && Bomb1.length < 1) {
      let newBomb = new Bombs(this.x + 20, this.y + 20, this.explosionsize);
      Bomb1.push(newBomb);

      setTimeout(function() {
        newBomb.explode();
      }, 3000);
      setTimeout(function() {
        Bomb1.pop();
      }, 3500);
    }
  }
  collectSpeedPowerup() {
    for (let i = 0; i < Logs.length; i++) {
      if (Logs[i].gone === true && Logs[i].isPowerup === 1) {
        let Poweruphit = collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          Logs[i].x,
          Logs[i].y,
          Logs[i].size,
          Logs[i].size,
        );
        if (Poweruphit) {
          logSound.play();
          this.walkLength += 0.5;
          Logs.splice(i, 1);
        }
      }
    }
  }
  collectBombPowerup() {
    for (let i = 0; i < Logs.length; i++) {
      if (Logs[i].gone === true && Logs[i].isPowerup === 3) {
        let Poweruphit = collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          Logs[i].x,
          Logs[i].y,
          Logs[i].size,
          Logs[i].size,
        );
        if (Poweruphit) {
          logSound.play();
          this.explosionsize += 10;
          Logs.splice(i, 1);
        }
      }
    }
  }

  collectLifePowerup() {
    for (let i = 0; i < Logs.length; i++) {
      if (Logs[i].gone === true && Logs[i].isPowerup === 2) {
        let Poweruphit = collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          Logs[i].x,
          Logs[i].y,
          Logs[i].size,
          Logs[i].size,
        );
        if (Poweruphit) {
          logSound.play();
          this.lives += 1;
          Logs.splice(i, 1);
        }
      }
    }
  }
  
  checkWallCollison() {
    for (let i = 0; i < Walls.length; i++) {
      let wallHit = collideRectRect(
        this.x,
        this.y,
        this.size,
        this.size,
        Walls[i].x,
        Walls[i].y,
        Walls[i].size,
        Walls[i].size
      );
      if (wallHit === true) {
        console.log("player 1 wall hit true");
        return true;
      }
    }
  }
  checkLogCollsion() {
    for (let i = 0; i < Logs.length; i++) {
      let logHit = collideRectRect(
        this.x,
        this.y,
        this.size,
        this.size,
        Logs[i].x,
        Logs[i].y,
        Logs[i].size,
        Logs[i].size
      );
      if (logHit === true) {
        console.log("player 1 log hit true");
        return true;
      }
    }
  }
}

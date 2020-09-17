// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable,image,keyIsDown
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
class bomberman2 {
  constructor(x, y, size, walkLength) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.lives = 1;
    this.won = false;
    this.walkLength = walkLength;
    this.actualwl = walkLength;
    this.toggleLeft = false;
    this.toggleRight = false;
    this.toggleUp = false;
    this.toggleDown = false;
    this.explosionsize = blocksize;
    this.score=0
  }

  showSelf() {
        if (this.lives === 0) {
      image(player2SpriteDead, this.x, this.y, 32, 32);
    } else {
      image(player2Sprite, this.x, this.y, 32, 32);
    }
  }

  moveUp() {
    if (keyIsDown(87) && this.toggleUp === false && this.y >= 0 && !keyIsDown(65) && !keyIsDown(68) &&!keyIsDown(83)) {
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
    if (keyIsDown(83) && this.toggleDown === false && this.y <= height && !keyIsDown(65) && !keyIsDown(68) &&!keyIsDown(87)) {
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
    if (keyIsDown(65) && this.toggleLeft === false && this.x >= 0 && !keyIsDown(83) && !keyIsDown(68) &&!keyIsDown(87)) {
      this.toggleRight = false;
      this.toggleUp = false;
      this.toggleDown = false;
      this.x -= this.walkLength;3
      if (this.checkWallCollison() || this.checkLogCollsion()) {
        this.toggleLeft = true;
      }
      console.log(this.toggleRight, this.toggleUp, this.toggleDown);
    }
  }
  
  moveRight() {
    if (keyIsDown(68) && this.toggleRight === false && this.x <= width && !keyIsDown(65) && !keyIsDown(83) &&!keyIsDown(87)) {
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
  collectSpeedPowerup() {
    console.log(Logs);
    for (let i = 0; i < Logs.length; i++) {
      if (Logs[i].gone === true && Logs[i].isPowerup === 1) {
        console.log("there is a speed powerup");
        let Poweruphit = collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          Logs[i].x,
          Logs[i].y,
          Logs[i].size,
          Logs[i].size
        );
        if (Poweruphit) {
          console.log("player 2 speed powerup hit");
          logSound.play();
          this.walkLength += 0.5;
          Logs.splice(i, 1);
          this.score++
        }
      }
    }
  }
  collectBombPowerup() {
    for (let i = 0; i < Logs.length; i++) {
      if (Logs[i].gone === true && Logs[i].isPowerup === 3) {
        console.log("there is a bomb powerup");
        let Poweruphit = collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          Logs[i].x,
          Logs[i].y,
          Logs[i].size,
          Logs[i].size
        );
        if (Poweruphit) {
          logSound.play();
          this.explosionsize += 10;
          Logs.splice(i, 1);
          this.score++
        }
      }
    }
  }

  collectLifePowerup() {
    for (let i = 0; i < Logs.length; i++) {
      if (Logs[i].gone === true && Logs[i].isPowerup === 2) {
        console.log("there is a life powerup");
        let Poweruphit = collideRectRect(
          this.x,
          this.y,
          this.size,
          this.size,
          Logs[i].x,
          Logs[i].y,
          Logs[i].size,
          Logs[i].size
        );
        if (Poweruphit) {
          console.log("player 2 life powerup hit");
          logSound.play();
          this.lives += 1;
          Logs.splice(i, 1);
          this.score++
        }
      }
    }
  }
  placeBomb() {
    if (keyIsPressed === true && keyCode === 16 && Bomb2.length < 1) {
      let newBomb = new Bombs(this.x + 20, this.y + 20, this.explosionsize);
      Bomb2.push(newBomb);
      setTimeout(function() {
        newBomb.explode();
      }, 3000);
      setTimeout(function() {
        Bomb2.pop();
      }, 3500);
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
        console.log("player 2 wall hit true");
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
        console.log("player 2 log hit true");
        return true;
      }
    }
  }
}

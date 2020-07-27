// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
let Walls = [];
let Bomb = [];
let Logs = [];
let Score;
let blocksize = 50;
let bombers = [];
function setup() {
  Score = 0;
  var cnv = createCanvas(500, 500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  Walls.push(new Wall(5 * blocksize, 0));
  Walls.push(new Wall(6 * blocksize, 0));
  Walls.push(new Wall(blocksize, blocksize));
  Walls.push(new Wall(2 * blocksize, blocksize));
  Walls.push(new Wall(3 * blocksize, blocksize));
  Walls.push(new Wall(7 * blocksize, 2 * blocksize));
  Walls.push(new Wall(8 * blocksize, 2 * blocksize));
  Walls.push(new Wall(0, 3 * blocksize));
  Walls.push(new Wall(2 * blocksize, 3 * blocksize));
  Walls.push(new Wall(3 * blocksize, 3 * blocksize));
  Walls.push(new Wall(3 * blocksize, 3 * blocksize));
  Walls.push(new Wall(0, 4 * blocksize));
  Walls.push(new Wall(6 * blocksize, 5 * blocksize));
  Walls.push(new Wall(0, 6 * blocksize));
  Walls.push(new Wall(2 * blocksize, 6 * blocksize));
  Walls.push(new Wall(4 * blocksize, 6 * blocksize));
  Walls.push(new Wall(7 * blocksize, 6 * blocksize));
  Walls.push(new Wall(6 * blocksize, 7 * blocksize));
  Walls.push(new Wall(2 * blocksize, 7 * blocksize));
  Walls.push(new Wall(3 * blocksize, 7 * blocksize));
  console.log(Walls);
  Logs.push(new Log(2 * blocksize, 0));
  Logs.push(new Log(4 * blocksize, 0));
  Logs.push(new Log(7 * blocksize, 0));
  Logs.push(new Log(8 * blocksize, 0));
  Logs.push(new Log(5 * blocksize, blocksize));
  Logs.push(new Log(7 * blocksize, blocksize));
  Logs.push(new Log(0 * blocksize, 2 * blocksize));
  Logs.push(new Log(1 * blocksize, 2 * blocksize));
  Logs.push(new Log(3 * blocksize, 2 * blocksize));
  Logs.push(new Log(4 * blocksize, 2 * blocksize));
  Logs.push(new Log(6 * blocksize, 2 * blocksize));
  Logs.push(new Log(6 * blocksize, 3 * blocksize));
  Logs.push(new Log(8 * blocksize, 3 * blocksize));
  Logs.push(new Log(1 * blocksize, 4 * blocksize));
  Logs.push(new Log(1 * blocksize, 4 * blocksize));
  Logs.push(new Log(3 * blocksize, 4 * blocksize));
  Logs.push(new Log(4 * blocksize, 4 * blocksize));
  Logs.push(new Log(5 * blocksize, 4 * blocksize));
  Logs.push(new Log(7 * blocksize, 4 * blocksize));
  Logs.push(new Log(0 * blocksize, 5 * blocksize));
  Logs.push(new Log(2 * blocksize, 5 * blocksize));
  Logs.push(new Log(4 * blocksize, 5 * blocksize));
  Logs.push(new Log(8 * blocksize, 5 * blocksize));
  Logs.push(new Log(1 * blocksize, 6 * blocksize));
  Logs.push(new Log(1 * blocksize, 6 * blocksize));
  Logs.push(new Log(3 * blocksize, 6 * blocksize));
  Logs.push(new Log(5 * blocksize, 6 * blocksize));
  Logs.push(new Log(6 * blocksize, 6 * blocksize));
  Logs.push(new Log(0 * blocksize, 7 * blocksize));
  Logs.push(new Log(4 * blocksize, 7 * blocksize));
  Logs.push(new Log(6 * blocksize, 7 * blocksize));
  bombers.push(new bomberman(0, 0, 50, 1));
}

function draw() {
  //shows Walls
  background(255);
  for (let i = 0; i < Walls.length; i++) {
    Walls[i].showSelf();
  }
  //show Logs
  for (let i = 0; i < Logs.length; i++) {
    Logs[i].showSelf();
  }
  for (let i = 0; i < bombers.length; i++) {
    bombers[0].showSelf();
    bombers[0].move();
  }
  // makes sure there is only 1 bomb at a time

}

function keepScore() {}

class bomberman {
  constructor(x, y, size, walkLength) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.walkLength = walkLength;
  }

  showSelf() {
    fill(0, 70, 199);
    rect(this.x, this.y, this.size);
  }

  move() {
    if (keyIsPressed === true) {
      if (keyCode === UP_ARROW) {
        this.y -= this.walkLength;
      }
      if (keyCode === DOWN_ARROW) {
        this.y += this.walkLength;
      }
      if (keyCode === LEFT_ARROW) {
        this.x -= this.walkLength;
      }
      if (keyCode === RIGHT_ARROW) {
        this.x += this.walkLength;
      }
    }
  }
  getLastValidPosition(){
    this.lastx
    this.lasty
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
      if (wallHit) {
  
      }
    }}
  checkBombCollision() {}
  
}

class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = blocksize;
  }
  showSelf() {
    fill(255, 204, 0); // yellow
    square(this.x, this.y, this.size);
    noFill();
  }
}

class Log {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = blocksize;
    this.existance = true;
  }
  showSelf() {
    fill(50, 168, 82); //green
    square(this.x, this.y, this.size);
    noFill();
  }
}

class Bombs {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.kaboom = blocksize;
  }
  showSelf() {
    circle(this.x, this.y, 5);
  }
  explode() {
    line(this.x - this.kaboom, this.x + this.kaboom);
    line(this.y - this.kaboom, this.x + this.kaboom);
    for (let i = 0; i < Logs.length; i++) {
      let hit = collideLineRect(
        this.x - this.kaboom,
        this.x + this.kaboom,
        Logs[i].x,
        Logs[i].y,
        Logs[i].size,
        Logs[i].size
      );
      if (hit) {
        Logs.splice(i);
      }
    }
  }
}

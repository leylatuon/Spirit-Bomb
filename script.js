// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
let board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 2, 0, 2, 1, 1, 2, 2, 1],
  [1, 0, 1, 1, 1, 0, 2, 0, 2, 0, 1],
  [1, 2, 2, 0, 2, 2, 0, 2, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 0, 2, 0, 2, 1],
  [1, 1, 2, 0, 2, 2, 2, 2, 2, 0, 1],
  [1, 2, 0, 2, 0, 2, 0, 1, 0, 2, 1],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 0, 1],
  [1, 2, 0, 1, 1, 2, 0, 2, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let Walls = [];
let Bomb = [];
let Logs = [];
let Score;
let blocksize = 50;
let bombers = [];
let collided = false;

function setup() {
  Score = 0;
  var cnv = createCanvas(600, 600);
  var x = (windowWidth - width) / 2;

  cnv.position(x, y);

  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      //Draw a wall
      if (board[y][x] === 1) {
        Walls.push(new Wall(x * blocksize, y * blocksize));
      } else if (board[y][x] === 2) {
        Logs.push(new Log(x * blocksize, y * blocksize));
      }
    }
  }
  bombers.push(new bomberman(blocksize + 2, blocksize + 2, 40, 1));

  myButton = new Clickable(100, 50); //Create button
  myButton.locate(200, 200);
  startScreen = true;
  myButton.onPress = function() {
    //When myButton is presse
    this.color = "#AAAAFF"; //Change button color
    startScreen = false;
  };
}
function draw() {
  //shows Walls
  checkStart();
  if (startScreen == false) {
    background(255);
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < Walls.length; i++) {
      Walls[i].showSelf();
    }
    //show Logs
    for (let i = 0; i < Logs.length; i++) {
      Logs[i].showSelf();
    }
    for (let i = 0; i < bombers.length; i++) {
      bombers[i].showSelf();
      bombers[i].moveUp();
      bombers[i].moveRight();
      bombers[i].moveLeft();
      bombers[i].moveDown();
      bombers[i].placeBomb();
    }

    for (let i = 0; i < Bomb.length; i++) {
      Bomb[i].showSelf();
    }
  }
}

function keepScore() {
  
}

class bomberman {
  constructor(x, y, size, walkLength) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.lives = 1;
    this.walkLength = walkLength;
    this.toggleLeft = false;
    this.toggleRight = false;
    this.toggleUp = false;
    this.toggleDown = false;
  }

  showSelf() {
    fill(0, 70, 199);
    rect(this.x, this.y, this.size);
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
    if (keyIsPressed === true && keyCode === 32) {
      let newBomb = new Bombs(this.x + 20, this.y + 20);
      Bomb.push(newBomb);
      setTimeout(function() {
        newBomb.explode();
      }, 3000);
      setTimeout(function() {
        Bomb.pop();
      }, 3000);
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
        console.log("true");
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
        console.log("true");
        return true;
      }
    }
  }
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
    this.exploded = false;
  }
  showSelf() {
    if (this.exploded === false) {
      circle(this.x, this.y, 30);
    } else if (this.exploded === true) {
      strokeWeight(10);
      line(this.x - this.kaboom, this.y, this.x, this.y); //left
      line(this.x, this.y, this.x + this.kaboom, this.y); //Right
      line(this.x, this.y - this.kaboom, this.x, this.y); //up
      line(this.x, this.y, this.x, this.y + this.kaboom); //down
      strokeWeight(1);
    }
  }
  explode() {
    this.exploded = true;
    for (let i = 0; i < Logs.length; i++) {
      let hitLeft = collideLineRect(
        this.x - this.kaboom,
        this.y,
        this.x,
        this.y,
        Logs[i].x,
        Logs[i].y,
        Logs[i].size,
        Logs[i].size
      );
      let hitPlayer =
        collideLineRect(
          this.x - this.kaboom,
          this.y,
          this.x + this.kaboom,
          this.y,
          bombers[0].x,
          bombers[0].y,
          bombers[0].size, bombers[0].size
        ) ||
        collideLineRect(
          this.x,
          this.y - this.kaboom,
          this.x,
          this.y + this.kaboom,
          bombers[0].x,
          bombers[0].y,
          bombers[0].size, bombers[0].size
        );

      let hitRight = collideLineRect(
        this.x,
        this.y,
        this.x + this.kaboom,
        this.y,
        Logs[i].x,
        Logs[i].y,
        Logs[i].size,
        Logs[i].size
      );
      let hitUp = collideLineRect(
        this.x,
        this.y - this.kaboom,
        this.x,
        this.y,
        Logs[i].x,
        Logs[i].y,
        Logs[i].size,
        Logs[i].size
      );
      let hitDown = collideLineRect(
        this.x,
        this.y,
        this.x,
        this.y + this.kaboom,
        Logs[i].x,
        Logs[i].y,
        Logs[i].size,
        Logs[i].size
      );

      if (hitLeft) {
        board[(this.x - 1, this.y)] = 0;
        Logs.splice(i, 1);
        console.log(Logs);
      }
      if (hitRight) {
        board[(this.x + 1, this.y)] = 0;
        Logs.splice(i, 1);
        console.log(Logs);
      }
      if (hitUp) {
        board[(this.x, this.y - 1)] = 0;
        Logs.splice(i, 1);
        console.log(Logs);
      }
      if (hitDown) {
        board[(this.x, this.y + 1)] = 0;
        Logs.splice(i, 1);
        console.log(Logs);
      }
      if (hitPlayer) {
        bombers[0].lives--;
        console.log('player hit :(')
      }
    }
    console.log("exploded");
  }
}

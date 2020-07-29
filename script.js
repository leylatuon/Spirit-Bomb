// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable,image,loadImage,loadSound
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

let button;
let gameOver = false;
let Walls = [];
let Bomb1 = [];
let Bomb2 = [];
let Logs = [];
let Score;
let blocksize = 50;
let collided = false;
let bomber1;
let bomber2;
let bombImage;
let bombSound;
let player1Sprite;
let player2Sprite;
let logImage;
let wallImage;
let speedPowerUp;
let lifePowerUp,logSound
let bombUP;
let bombDOWN;
let bombRIGHT;
let bombLEFT;
function preload() {
  bombImage = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fhiclipart.com.png?v=1595972033552"
  );
  bombSound = loadSound(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2FExplosion%2B7.mp3?v=1596033257948"
  );
  player1Sprite = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fc6ca087f-b424-487a-b793-17fa8fe655b2_Untitled_Artwork.png?v=1596039529910"
  );
  player2Sprite = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fc6ca087f-b424-487a-b793-17fa8fe655b2_Untitled_Artwork%203.png?v=1596039592004"
  );
  logImage = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2FUntitled_Artwork%204.png?v=1596039538517"
  );
  logSound = loadSound(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2Fding-sound-effect_2.mp3?v=1596044617153"
  );
  wallImage = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2FUntitled_Artwork%205.png?v=1596039686097"
  );
  speedPowerUp = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2FUntitled_Artwork%207.png?v=1596039811161"
  );
  lifePowerUp = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2FUntitled_Artwork%206.png?v=1596039771832"
  );
  bombPowerUp = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2FUntitled_Artwork%208.png?v=1596039859898"
  );
  bombUP = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fc6ca087f-b424-487a-b793-17fa8fe655b2_upLine.png?v=1596041760170"
  );
  bombDOWN = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fc6ca087f-b424-487a-b793-17fa8fe655b2_downLine.png?v=1596041763502"
  );
  bombRIGHT = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fc6ca087f-b424-487a-b793-17fa8fe655b2_rightLine.png?v=1596041833732"
  );
  bombLEFT = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fc6ca087f-b424-487a-b793-17fa8fe655b2_leftLine%20(1).png?v=1596041882575"
  );
}
function setup() {
  Score = 0;
  var cnv = createCanvas(blocksize * 11+50, blocksize * 10);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2 + 30;

  cnv.position(x, y);

  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board[j].length; i++) {
      //Draw a wall
      if (board[j][i] === 1) {
        Walls.push(new Wall(i * blocksize, j * blocksize));
      } else if (board[j][i] === 2) {
        Logs.push(new Log(i * blocksize, j * blocksize));
      }
    }
  }
  button = createButton("Restart");
  button.position(970, 500);
  button.mousePressed(restart);
  console.log(Walls);
  bomber1 = new bomberman(blocksize + 2, blocksize + 2, 35, 1);
  bomber2 = new bomberman2(
    9 * blocksize + 2,
    9 * blocksize - blocksize + 2,
    35,
    1
  );
  myButton = new Clickable(100, 50); //Create button

  startScreen = true;
}
function draw() {
  //shows Walls
  checkStart();
  if (startScreen == false) {
    document.getElementById("myParagraph").innerHTML = "";
    background(133, 164, 140);
    stroke(0);
    strokeWeight(1);
    // Restart Button

    // shows Walls
    for (let i = 0; i < Walls.length; i++) {
      Walls[i].showSelf();
    }

    //show Logs
    for (let i = 0; i < Logs.length; i++) {
      Logs[i].showSelf();
    }
    gameIsOver();
    bomber1.showSelf();
    bomber1.moveUp();
    bomber1.moveRight();
    bomber1.moveLeft();
    bomber1.moveDown();
    bomber1.placeBomb();
    bomber1.collectSpeedPowerup();
    bomber2.showSelf();
    bomber2.moveUp();
    bomber2.moveRight();
    bomber2.moveLeft();
    bomber2.moveDown();
    bomber2.placeBomb();
    bomber2.collectSpeedPowerup();
    bomber2.collectLifePowerup();
    bomber1.collectLifePowerup();
    bomber2.collectBombPowerup();
    bomber1.collectBombPowerup();
  }
  for (let i = 0; i < Bomb1.length; i++) {
    Bomb1[i].showSelf();
  }
  for (let i = 0; i < Bomb2.length; i++) {
    Bomb2[i].showSelf();
  }
  if (bomber1.lives <= 0 || bomber2.lives <= 0) {
    gameOver = true;
  }
  if (gameOver === false) {
    document.getElementById("GameOver").innerHTML = "";
  }
}

function keepLives() {
  for (let i=0;i<bomber1.lives;i++){
    image(player1Sprite,blocksize * 11+25, i*10,25,25)
  }
  for (let i=0;i<bomber2.lives;i++){
    image(player2Sprite,blocksize * 11+25,  blocksize * 10-i*10,25,25)
  }
}

function gameIsOver() {
  if (gameOver === true && bomber1.won === true) {
    document.getElementById("GameOver").innerHTML = "GAME OVER Player 1 Won ";
    bomber1.walkLength = 0;
    bomber2.walkLength = 0;
  } else if (gameOver === true && bomber2.won === true) {
    document.getElementById("GameOver").innerHTML = "GAME OVER Player 2 Won ";
    bomber1.walkLength = 0;
    bomber2.walkLength = 0;
  } else if (
    gameOver === true &&
    bomber2.won === true &&
    bomber1.won === true
  ) {
    document.getElementById("GameOver").innerHTML = "GAME OVER No One Won ";
    bomber1.walkLength = 0;
    bomber2.walkLength = 0;
  }
}
function restart() {
  gameOver = false;
  console.log("hi");
  bomber1.lives = 1;
  bomber2.lives = 1;
  bomber1.walkLength = 1;
  bomber2.walkLength = 1;
  bomber1.explosionsize = blocksize;
  bomber2.explosionsize = blocksize;
  bomber1.x = blocksize + 2;
  bomber1.y = blocksize + 2;
  bomber2.x = 9 * blocksize + 2;
  bomber2.y = 9 * blocksize - blocksize + 2;
  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board[j].length; i++) {
      if (board[j][i] === 2) {
        Logs.push(new Log(i * blocksize, j * blocksize));
      }
    }
  }
}
class Bombs {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.kaboom = size;
    this.exploded = false;
  }
  showSelf() {
    if (this.exploded === false) {
      image(bombImage, this.x - 20, this.y - 20, 30, 30);
    } else if (this.exploded === true) {
      image(bombLEFT, this.x - this.kaboom, this.y - 7, this.kaboom, 20); //left
      image(bombRIGHT, this.x, this.y - 7, this.kaboom, 20); //Right
      image(bombUP, this.x - 7, this.y - 50, 20, this.kaboom); //up
      image(bombDOWN, this.x - 7, this.y, 20, this.kaboom); //down
    }
  }
  explode() {
    this.exploded = true;
    bombSound.play();
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
      let hitPlayer1 =
        collideLineRect(
          this.x - this.kaboom,
          this.y,
          this.x + this.kaboom,
          this.y,
          bomber1.x,
          bomber1.y,
          bomber1.size,
          bomber1.size
        ) ||
        collideLineRect(
          this.x,
          this.y - this.kaboom,
          this.x,
          this.y + this.kaboom,
          bomber1.x,
          bomber1.y,
          bomber1.size,
          bomber1.size
        );
      let hitPlayer2 =
        collideLineRect(
          this.x - this.kaboom,
          this.y,
          this.x + this.kaboom,
          this.y,
          bomber2.x,
          bomber2.y,
          bomber2.size,
          bomber2.size
        ) ||
        collideLineRect(
          this.x,
          this.y - this.kaboom,
          this.x,
          this.y + this.kaboom,
          bomber2.x,
          bomber2.y,
          bomber2.size,
          bomber2.size
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
        this.y,
        this.x,
        this.y - this.kaboom,
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
        Logs[i].gone = true;
        if (Logs[i].isPowerup === 1) {
          Logs[i].showSpeedPowerup();
        } else if (Logs[i].isPowerup === 2) {
          Logs[i].showLifePowerup();
        } else if (Logs[i].isPowerup === 3) {
          Logs[i].showBombPowerup();
        } else {
          Logs.splice(i, 1);
        }
      }
      if (hitRight) {
        Logs[i].gone = true;
        if (Logs[i].isPowerup === 1) {
          Logs[i].showSpeedPowerup();
        } else if (Logs[i].isPowerup === 2) {
          Logs[i].showLifePowerup();
        } else if (Logs[i].isPowerup === 3) {
          Logs[i].showBombPowerup();
        } else {
          Logs.splice(i, 1);
        }
      }
      if (hitUp) {
        Logs[i].gone = true;
        if (Logs[i].isPowerup === 1) {
          Logs[i].showSpeedPowerup();
        } else if (Logs[i].isPowerup === 2) {
          Logs[i].showLifePowerup();
        } else if (Logs[i].isPowerup === 3) {
          Logs[i].showBombPowerup();
        } else {
          Logs.splice(i, 1);
        }
      }
      if (hitDown) {
        Logs[i].gone = true;
        if (Logs[i].isPowerup === 1) {
          Logs[i].showSpeedPowerup();
        } else if (Logs[i].isPowerup === 2) {
          Logs[i].showLifePowerup();
        } else if (Logs[i].isPowerup === 3) {
          Logs[i].showBombPowerup();
        } else {
          Logs.splice(i, 1);
        }
      }
      if (hitPlayer1) {
        bomber1.lives--;
        if (bomber1.lives === 0) {
          bomber2.won = true;
        }
      }
      if (hitPlayer2) {
        bomber2.lives--;
        if (bomber2.lives === 0) {
          bomber1.won = true;
        }
      }
    }
    console.log("exploded");
  }
}

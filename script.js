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
let startCredits;
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
let wallImage, hitDelay;
let speedPowerUp;
let lifePowerUp,
  logSound,
  bgMusic,
  player2SpriteDying,
  player2SpriteDead,
  bombPowerUp,
  startscreenImage,
  player1priteDying,
  player1SpriteDead,
  bombUP,
  startShop,
  color1,
  color2,
  PurpleSprite,
  PurpleSpriteDead,
  bombDOWN;
let bombRIGHT;
let bombLEFT;
let dyingSound;

function setup() {
  bgmusic.setVolume(0.5);
  bgmusic.loop();
  color1 = "Red";
  color2 = "Blue";
  hitDelay = 0;
  Score = 0;
  var cnv = createCanvas(blocksize * 11 + 90, blocksize * 10);
  cnv.parent("theGame");

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
  //start page button
  button1 = createButton("Start Page");
  button1.position(900, 675);
  button1.mousePressed(goStartScreen);
  //restart button
  button = createButton("Restart");
  button.position(990, 675);
  button.mousePressed(restart);
  console.log(Walls);
  bomber1 = new bomberman(blocksize + 2, blocksize + 2, 30, 1);
  bomber2 = new bomberman2(
    9 * blocksize + 2,
    9 * blocksize - blocksize + 2,
    30,
    1
  );
  startButton = new Clickable(100, 50); //Create button
  instructButton = new Clickable(100, 50);
  startScreen = true;
  startShop = false;
  startCredits = false;
  chip1 = new Player1Chip(100, 100);
  chip2 = new Player2Chip(150, 100);
}
function draw() {
  //shows Walls
  checkStart();
  checkShop();
  checkCredits();
  if (startScreen === false && startShop === false && startCredits === false) {
    background(133, 164, 140);
    stroke(0);
    strokeWeight(1);
    if (color1 === "Orange") {
      player1Sprite = OrangeSprite;
      player1SpriteDead = OrangeSpriteDead;
    } else if (color1 === "Yellow") {
      player1Sprite = YellowSprite;
      player1SpriteDead = YellowSpriteDead;
    } else if (color1 === "Red") {
      player1Sprite = RedSprite;
      player1SpriteDead = RedSpriteDead;
    } else if (color1 === "Green") {
      player1Sprite = GreenSprite;
      player1SpriteDead = GreenSpriteDead;
    } else if (color1 === "Blue") {
      player1Sprite = BlueSprite;
      player1SpriteDead = BlueSpriteDead;
    } else if (color1 === "Purple") {
      player1Sprite = PurpleSprite;
      player1SpriteDead = PurpleSpriteDead;
    }
    if (color2 === "Orange") {
      player2Sprite = OrangeSprite;
      player2SpriteDead = OrangeSpriteDead;
    } else if (color2 === "Red") {
      player2Sprite = RedSprite;
      player2SpriteDead = RedSpriteDead;
    } else if (color2 === "Yellow") {
      player2Sprite = YellowSprite;
      player2SpriteDead = YellowSpriteDead;
    } else if (color2 === "Green") {
      player2Sprite = GreenSprite;
      player2SpriteDead = GreenSpriteDead;
    } else if (color2 === "Blue") {
      player2Sprite = BlueSprite;
      player2SpriteDead = BlueSpriteDead;
    } else if (color2 === "Purple") {
      player2Sprite = PurpleSprite;
      player2SpriteDead = PurpleSpriteDead;
    }
    // shows Walls
    for (let i = 0; i < Walls.length; i++) {
      Walls[i].showSelf();
    }

    //show Logs
    for (let i = 0; i < Logs.length; i++) {
      Logs[i].showSelf();
    }
    gameIsOver();
    keepLives();
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
  hitDelay--;
  console.log(hitDelay);
}

function keepLives() {
  for (let i = 0; i < bomber1.lives; i++) {
    image(player1Sprite, blocksize * 11 + 25, i * 30 + 25, 25, 25);
  }
  for (let i = 0; i < bomber2.lives; i++) {
    image(player2Sprite, blocksize * 11 + 25, 450 - i * 30, 25, 25);
  }
  //  text("Player 1 Score is: ", width-20, 20, 50, 50);
  //  text("Player 2 Score is: ", width-20, 300, 50, 50);
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
  Logs = [];
  gameOver = false;
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

function goStartScreen() {
  restart();
  startScreen = true;
  startCredits = false;
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
      image(bombUP, this.x - 7, this.y - this.kaboom, 20, this.kaboom); //up
      image(bombDOWN, this.x - 7, this.y, 20, this.kaboom); //down
    }
  }
  explode() {
    this.exploded = true;
    bombSound.play();
    let hitPlayer1 = false;
    let hitPlayer2 = false;
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
      hitPlayer1 =
        collideLineRect(
          this.x - this.kaboom + 10,
          this.y,
          this.x + this.kaboom - 10,
          this.y,
          bomber1.x,
          bomber1.y,
          bomber1.size,
          bomber1.size
        ) ||
        collideLineRect(
          this.x,
          this.y - this.kaboom + 10,
          this.x,
          this.y + this.kaboom - 10,
          bomber1.x,
          bomber1.y,
          bomber1.size,
          bomber1.size
        );
      hitPlayer2 =
        collideLineRect(
          this.x - this.kaboom + 10,
          this.y,
          this.x + this.kaboom - 10,
          this.y,
          bomber2.x,
          bomber2.y,
          bomber2.size,
          bomber2.size
        ) ||
        collideLineRect(
          this.x,
          this.y - this.kaboom + 10,
          this.x,
          this.y + this.kaboom - 10,
          bomber2.x,
          bomber2.y,
          bomber2.size,
          bomber2.size
        );
      let hitRight = collideLineRect(
        this.x,
        this.y,
        this.x + this.kaboom - 10,
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
        this.y - this.kaboom + 10,
        Logs[i].x,
        Logs[i].y,
        Logs[i].size,
        Logs[i].size
      );
      let hitDown = collideLineRect(
        this.x,
        this.y,
        this.x,
        this.y + this.kaboom - 10,
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
      if (hitPlayer1 && hitPlayer2 && hitDelay <= 0) {
        bomber1.lives--;
        bomber2.lives--;
        hitDelay = 30;
        if (bomber1.lives === 0) {
          dyingSound.play();
          bomber2.won = true;
        } else if (bomber2.lives === 0) {
          dyingSound.play();
          bomber1.won = true;
        } else if (bomber1.lives === 0 && bomber2.lives === 0) {
          bomber2.won = true;
        }
      } else if (hitPlayer1 && hitDelay <= 0) {
        bomber1.lives--;
        hitDelay = 30;
        if (bomber1.lives === 0) {
          dyingSound.play();
          bomber2.won = true;
        }
      } else if (hitPlayer2 && hitDelay <= 0) {
        bomber2.lives--;
        hitDelay = 30;
        if (bomber2.lives === 0) {
          dyingSound.play();
          bomber1.won = true;
        }
      }
    }
    console.log("exploded");
  }
}

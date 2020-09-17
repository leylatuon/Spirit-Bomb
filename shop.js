// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,Clickable,image,loadImage,loadSound
 *    mouseY, noStroke, stroke, text, width, windowWidth,windowHeight, square, circle, noFill,collideLineRect,keyCode,keyIsPressed,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,rect,collideRectRect
 */

// We'll use variables for most of our colors in this code-along.
// BOMBERMAN GO BRRRRRRR :0 REEEEEEEEEE BABYYY
let chip1, chip2;
let chip1Toggle = false;
let chip2Toggle = false;
function checkShop() {
  if (startShop === true) {
    background(shopImage);
    instructButton.locate((3 * width) / 4 + 50, 440);
    instructButton.textFont = "Righteous";
    instructButton.text = "Start";
    instructButton.draw();
    instructButton.onPress = function() {
      startShop = false;
      startScreen = false;
   
    };
    noFill();
    strokeWeight(4);
    stroke(51);
    rect(90, 140, 65, 70);
    RedButton = image(RedSprite, 100, 150, 50, 50);
    rect(165, 140, 65, 70);
    OrangeButton = image(OrangeSprite, 175, 150, 50, 50);
    rect(240, 140, 65, 70);
    YellowButton = image(YellowSprite, 250, 150, 50, 50);
    rect(315, 140, 65, 70);
    GreenButton = image(GreenSprite, 325, 150, 50, 50);
    rect(390, 140, 65, 70);
    BlueButton = image(BlueSprite, 400, 150, 50, 50);
    rect(465, 140, 65, 70);
    PurpleButton = image(PurpleSprite, 475, 150, 50, 50);

    noStroke();

    chip1.showSelf();
    chip1.checkColor();
    chip2.showSelf();
    chip2.checkColor();
  }
}

function mouseDragged() {
  if (chip1Toggle === true) {
    chip1.x = mouseX;
    chip1.y = mouseY;
  }
  if (chip2Toggle === true) {
    chip2.x = mouseX;
    chip2.y = mouseY;
  }
}
function mousePressed() {
  if (collidePointCircle(mouseX, mouseY, chip1.x, chip1.y, chip1.size)) {
    chip1Toggle = true;
  }
  if (collidePointCircle(mouseX, mouseY, chip2.x, chip2.y, chip2.size)) {
    chip2Toggle = true;
  }
}

function mouseReleased() {
  chip1Toggle = false;
  chip2Toggle = false;
}

class Player1Chip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.click = false;
  }
  showSelf() {
    fill(0);
    circle(this.x, this.y, this.size);
     fill(255);
     text("P1",this.x,this.y);
  }

  checkColor() {
    let hitRed = collideRectCircle(90, 140, 65, 70, this.x, this.y, this.size);

    let hitOrange = collideRectCircle(
      165,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    let hitYellow = collideRectCircle(
      250,
      150,
      50,
      50,
      this.x,
      this.y,
      this.size
    );
    let hitGreen = collideRectCircle(
      315,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    let hitBlue = collideRectCircle(
      390,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    let hitPurple = collideRectCircle(
      465,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    if (hitOrange) {
      color1 = "Orange";
      image(OrangeSprite, 100, 220, 200, 200);
      
    } 
    else if (hitRed) {
      color1 = "Red";
      image(RedSprite, 100, 220, 200, 200);
    }
    else if (hitYellow) {
      color1 = "Yellow";
      image(YellowSprite, 100, 220, 200, 200);
    } else if (hitGreen) {
      image(GreenSprite, 100, 220, 200, 200);
      color1 = "Green";
    } else if (hitBlue) {
      image(BlueSprite, 100, 220, 200, 200);
      color1 = "Blue";
    } else if (hitPurple) {
      image(PurpleSprite, 100, 220, 200, 200);
      color1 = "Purple";
    }
   
  }
}

class Player2Chip {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
  }
  showSelf() {
    
    fill(0);
    circle(this.x, this.y, this.size);
    fill(255);
     text("P2",this.x,this.y);
  }
  clicked() {
    let hit1 = collidePointCircle(mouseX, mouseY, this.x, this.y, this.size);
    if (mouseIsPressed && hit1) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  checkColor() {
    let hitRed = collideRectCircle(90, 140, 65, 70, this.x, this.y, this.size);

    let hitOrange = collideRectCircle(
      165,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    let hitYellow = collideRectCircle(
      250,
      150,
      50,
      50,
      this.x,
      this.y,
      this.size
    );
    let hitGreen = collideRectCircle(
      315,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    let hitBlue = collideRectCircle(
      390,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    let hitPurple = collideRectCircle(
      465,
      140,
      65,
      70,
      this.x,
      this.y,
      this.size
    );
    if (hitOrange) {
      color2 = "Orange";
      image(OrangeSprite, 320, 220, 200, 200);
    } else if (hitYellow) {
      color2 = "Yellow";
      image(YellowSprite, 320, 220, 200, 200);
    } else if (hitGreen) {
      image(GreenSprite, 320, 220, 200, 200);
      color2 = "Green";
    } else if (hitBlue) {
      image(BlueSprite, 320, 220, 200, 200);
      color2 = "Blue";
    } else if (hitPurple) {
      image(PurpleSprite, 320, 220, 200, 200);
      color2 = "Purple";
    } else if (hitRed) {
      image(RedSprite, 320, 220, 200, 200);
      color2 = "Red";
    }
  }
}

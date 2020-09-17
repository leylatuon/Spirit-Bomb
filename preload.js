function preload() {
  bgmusic = loadSound(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FPOL-foggy-forest-short.wav?v=1596161512032"
  );
  shopImage = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled%20presentation%20(5).jpg?v=1596160796688"
  );
  creditImage = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled%20presentation%20(3).jpg?v=1596159961428"
  );
  startscreenImage = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled%20presentation%20(2).jpg?v=1596135612160"
  );
  bombImage = loadImage(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2Fhiclipart.com.png?v=1595972033552"
  );
  bombSound = loadSound(
    "https://cdn.glitch.com/c6ca087f-b424-487a-b793-17fa8fe655b2%2FExplosion%2B7.mp3?v=1596033257948"
  );
  RedSpriteDead = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%2017.png?v=1596149920231"
  );
  RedSprite = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%2019.png?v=1596149915874"
  );
  YellowSprite = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%202%20copy%202.png?v=1596147536058"
  );
  YellowSpriteDead = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%203%20copy.png?v=1596147544967"
  );
  BlueSpriteDead = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%2014.png?v=1596149766268"
  );
  BlueSprite = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%2016.png?v=1596149769703"
  );
  PurpleSprite = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%204.png?v=1596147712024"
  );
  PurpleSpriteDead = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%202.png?v=1596147616757"
  );
  OrangeSprite = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%207.png?v=1596147949118"
  );
  OrangeSpriteDead = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%205.png?v=1596147875852"
  );
  GreenSprite = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%208.png?v=1596148034329"
  );
  GreenSpriteDead = loadImage(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FUntitled_Artwork%2010.png?v=1596148127925"
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
  dyingSound = loadSound(
    "https://cdn.glitch.com/d649cbbc-e1ae-4e01-8436-8f08bba45c16%2FToxic%20Goo-SoundBible.com-392739082.mp3?v=1596125786427"
  );
}

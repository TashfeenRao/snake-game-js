import Phaser from 'phaser';

import snakeScene from "./scenes/snake";
import welcomeScene from "./scenes/welcome"


// Our game scene
var gameScene = new snakeScene();
var entryScene = new welcomeScene();

const gameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: '#b9eaff'
  
};

var game =new Phaser.Game(gameConfig);


// load scenes
game.scene.add('welcomeScene', entryScene);
game.scene.add("snakeScene", gameScene);

// start title
game.scene.start('welcomeScene');


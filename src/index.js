import Phaser from 'phaser/dist/phaser';

import snakeScene from "./scenes/snake";


const gameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: '#b9eaff',
  physics: {
    default: 'arcade',
    arcade: {gravity: { y: 200 }}},
  scene: snakeScene
};

new Phaser.Game(gameConfig);


import Phaser from 'phaser/dist/phaser';

import MainScene from "./scenes/snake";


const gameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {gravity: { y: 200 }}},
  scene: MainScene
};

new Phaser.Game(gameConfig);


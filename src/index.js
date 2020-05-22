import Phaser from 'phaser/dist/phaser';

import SimpleScene from "./scenes/simple-scene";

const gameConfig = {
  type: Phaser.AUTO,
  width: 680,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: {gravity: { y: 200 }}},
  scene: SimpleScene,
};

new Phaser.Game(gameConfig);


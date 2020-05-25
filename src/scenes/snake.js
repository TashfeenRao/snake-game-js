import Phaser from 'phaser/dist/phaser';

class MainScene extends Phaser.Scene {
  preload(){
    this.load.image('snake','assets/body.png');

  }
  create() {
    this.add.text(100, 100, 'Hello Stephen!', { fill: '#0f0' });
    this.add.image(200, 200, 'snake');
  }
  update (time, delta){
    
  }
}

export default MainScene
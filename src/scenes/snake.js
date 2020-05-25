import Phaser from 'phaser/dist/phaser';


var snake;
var cursors;

var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

class MainScene extends Phaser.Scene {
  
  preload(){
    this.load.image('snake','assets/body.png');

  }
  create() {
    const Createsnake = new Phaser.Class({

      initialize:

      function Createsnake (scene, x, y)
      {
          this.headPosition = new Phaser.Geom.Point(x, y);

          this.snakeBody = scene.add.group();

          this.snakeHead = this.snakeBody.create(x * 16, y * 16, 'snake');
          this.snakeHead.setOrigin(0);

          this.alive = true;

          this.snakeSpeed = 100;

          this.moveTime = 0;

          this.heading = RIGHT;
          this.direction = RIGHT;
      }
    });
    snake = new Createsnake(this, 8, 8);
  }
  update (time, delta){
    
  }
}

export default MainScene
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
      },
      
      move: function (time)
      {
          switch (this.heading)
          {
              case LEFT:
                  this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                  break;

              case RIGHT:
                  this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                  break;

              case UP:
                  this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                  break;

              case DOWN:
                  this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                  break;
          }

          this.direction = this.heading;

          //  Update the body segments
          Phaser.Actions.ShiftPosition(this.snakeBody.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1);

          //  Update the timer ready for the next movement
          this.moveTime = time + this.speed;

          return true;
      },

      update: function (time)
        {
            if (time >= this.moveTime)
            {
                return this.move(time);
            }
        },
    });
    snake = new Createsnake(this, 8, 8);
  }
  update (time, delta){
    
  }
}

export default MainScene
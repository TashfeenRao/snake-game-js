import Phaser from 'phaser/dist/phaser';


var snake;
var cursors;
var food;

var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

class snakeScene extends Phaser.Scene {
  
  preload(){
    this.load.image('snake','assets/body.png');
    this.load.image('snake-body','assets/snake-body.png');
    this.load.image('snake-food','assets/food.png');

  }
  create() {
    const Food = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

      function Food (scene, x, y)
      {
          Phaser.GameObjects.Image.call(this, scene)

          this.setTexture('snake-food');
          this.setPosition(x * 16, y * 16);
          this.setOrigin(0);

          this.total = 0;
          this.score = 0;

          scene.children.add(this);
      },
      eatFood: function ()
        {
            this.total++;
            this.score += 4;


            var x = Phaser.Math.Between(0, 39);
            var y = Phaser.Math.Between(0, 29);

            this.setPosition(x * 16, y * 16);
        }

  });
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
          this.snakeTail = new Phaser.Geom.Point(x, y);
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
          Phaser.Actions.ShiftPosition(this.snakeBody.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.snakeTail);
          var hitBody = Phaser.Actions.GetFirst(this.snakeBody.getChildren(), { x: this.snakeHead.x, y: this.snakeHead.y }, 1);
          if (hitBody) {
            console.log('dead');
            this.alive = false;

            return false;
            
          } else {
            //Update the timer ready for the next movement
            this.moveTime = time + this.snakeSpeed;

            return true;
            
          }
      },

      updateMoves: function (time)
        {
            if (time >= this.moveTime)
            {
                return this.move(time);
            }
        },
      goLeft: function ()
      {
          if (this.direction === UP || this.direction === DOWN)
          {
              this.heading = LEFT;
          }
      },

      goRight: function ()
      {
          if (this.direction === UP || this.direction === DOWN)
          {
              this.heading = RIGHT;
          }
      },

      goUp: function ()
      {
          if (this.direction === LEFT || this.direction === RIGHT)
          {
              this.heading = UP;
          }
      },

      goDown: function ()
      {
          if (this.direction === LEFT || this.direction === RIGHT)
          {
              this.heading = DOWN;
          }
      },

      grow: function ()
        {
            var newPart = this.snakeBody.create(this.snakeTail.x, this.snakeTail.y, 'snake-body');

            newPart.setOrigin(0);
        },

      collideWithFood: function (food)
      {
          if (this.snakeHead.x === food.x && this.snakeHead.y === food.y)
          {
              this.grow();

              food.eatFood();
              console.log(food.score)

              
              if (food.total% 5 === 0 && this.snakeSpeed > 30) {
                this.snakeSpeed -= 5;
                
              }

              return true;
          }
          else
          {
              return false;
          }
      }
    });
    snake = new Createsnake(this, 8, 8);
    food = new Food(this, 3, 4);
     
    cursors = this.input.keyboard.createCursorKeys();
  }
  update (time, delta){
    if (!snake.alive)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        snake.goLeft();
    }
    else if (cursors.right.isDown)
    {
        snake.goRight();
    }
    else if (cursors.up.isDown)
    {
        snake.goUp();
    }
    else if (cursors.down.isDown)
    {
        snake.goDown();
    }

    if (snake.updateMoves(time))
    {

        snake.collideWithFood(food);
    }
    
  }
}

export default snakeScene
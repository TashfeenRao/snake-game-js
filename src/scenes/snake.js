// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import { postUserScore } from '../utils/dashboard';


let snake;
let cursors;
let food;

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

class SnakeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'snakeScene' });
  }

  preload() {
    this.load.image('snake', 'assets/body.png');
    this.load.image('snake-body', 'assets/snake-body.png');
    this.load.image('snake-food', 'assets/food.png');
  }

  async create() {
    const Food = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

      function Food(scene, x, y) {
        Phaser.GameObjects.Image.call(this, scene);

        this.setTexture('snake-food');
        this.setPosition(x * 16, y * 16);
        this.setOrigin(0);

        this.total = 0;
        this.score = 0;

        scene.children.add(this);
      },
      eatFood() {
        this.total += 1;
        this.score += 4;


        const x = Phaser.Math.Between(0, 39);
        const y = Phaser.Math.Between(0, 29);

        this.setPosition(x * 16, y * 16);
      },

    });
    const Createsnake = new Phaser.Class({

      initialize:

      function Createsnake(scene, x, y) {
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

      async move(time) {
        // eslint-disable-next-line default-case
        switch (this.heading) {
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
        Phaser.Actions.ShiftPosition(this.snakeBody.getChildren(),
          this.headPosition.x * 16, this.headPosition.y * 16, 1, this.snakeTail);
        const hitBody = Phaser.Actions.GetFirst(this.snakeBody.getChildren(),
          { x: this.snakeHead.x, y: this.snakeHead.y }, 1);
        if (hitBody) {
          this.alive = false;

          const playername = document.getElementById('playerName').innerHTML;
          const errors = document.querySelector('#errors');

          try {
            await postUserScore(playername, food.score);
            errors.innerHTML = '';
            errors.innerHTML = 'score has been saved succesfully';
          } catch (error) {
            errors.innerHTML = '';
            errors.innerHTML = 'error';
          }


          return false;
        }
        this.moveTime = time + this.snakeSpeed;

        return true;
      },

      // eslint-disable-next-line consistent-return
      updateMoves(time) {
        if (time >= this.moveTime) {
          return this.move(time);
        }
      },
      goLeft() {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = LEFT;
        }
      },

      goRight() {
        if (this.direction === UP || this.direction === DOWN) {
          this.heading = RIGHT;
        }
      },

      goUp() {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = UP;
        }
      },

      goDown() {
        if (this.direction === LEFT || this.direction === RIGHT) {
          this.heading = DOWN;
        }
      },

      grow() {
        const newPart = this.snakeBody.create(this.snakeTail.x, this.snakeTail.y, 'snake-body');

        newPart.setOrigin(0);
      },

      collideWithFood(food) {
        const scoreBoard = document.querySelector('#score');


        if (this.snakeHead.x === food.x && this.snakeHead.y === food.y) {
          this.grow();

          food.eatFood();
          scoreBoard.innerHTML = food.score;


          if (food.total % 5 === 0 && this.snakeSpeed > 30) {
            this.snakeSpeed -= 5;
          }

          return true;
        }
        return false;
      },
    });
    snake = new Createsnake(this, 8, 8);
    food = new Food(this, 3, 4);

    cursors = this.input.keyboard.createCursorKeys();
  }

  // eslint-disable-next-line class-methods-use-this
  update(time) {
    if (!snake.alive) {
      return;
    }

    if (cursors.left.isDown) {
      snake.goLeft();
    } else if (cursors.right.isDown) {
      snake.goRight();
    } else if (cursors.up.isDown) {
      snake.goUp();
    } else if (cursors.down.isDown) {
      snake.goDown();
    }

    if (snake.updateMoves(time)) {
      snake.collideWithFood(food);
    }
  }
}

export default SnakeScene;
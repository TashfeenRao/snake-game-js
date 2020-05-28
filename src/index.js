import Phaser from 'phaser';
import SnakeScene from './scenes/snake';
import WelcomeScene from './scenes/welcome';


// Our game scene
const GameScene = new SnakeScene();
const EntryScene = new WelcomeScene();

const gameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: '#b9eaff',

};

const game = new Phaser.Game(gameConfig);


// load scenes
game.scene.add('welcomeScene', EntryScene);
game.scene.add('snakeScene', GameScene);

// start title
game.scene.start('welcomeScene');

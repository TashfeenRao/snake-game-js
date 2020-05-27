import Phaser from 'phaser';
import {userForm, operationsBtn} from '../utils/form'

var el;
class welcomeScene extends Phaser.Scene {

	constructor() {
		super({key:'welcomeScene'});
	}

	preload() {
    this.load.image('background', 'assets/setbackground.png');
    this.playerName = "";
    
    
	}

	create() {
		 var bg = this.add.image(0, 0,'background');
		  bg.setOrigin(0,0);

    var text = this.add.text(100,200, 'Welcome to my feed the snake game!', { color: 'black', fontSize: '25px ' });
    const dashboard = document.querySelector("#dashboard")
    dashboard.append(userForm(), operationsBtn())
    const opsBtn = document.querySelector("#opsBtn")
    opsBtn.style.display = 'none'

    var restartBtn = document.querySelector("#gameRestart")
    

    const userInput = document.querySelector("#user-form");
    userInput.addEventListener('submit', (event) => {
      event.preventDefault()
      if(event.target.elements[0].value.length > 1){
        userInput.style.display = 'none'
        opsBtn.style.display = 'block'
        this.playerName = event.target.elements[0].value
        this.loadGame()
        
      }else{
        console.log("name empty")
      }
      

    })

  
    
      
  }
  loadGame(){
    this.scene.switch('snakeScene');
    const player = document.querySelector("#playerName");
    player.innerHTML = this.playerName

  }


}

export default welcomeScene;
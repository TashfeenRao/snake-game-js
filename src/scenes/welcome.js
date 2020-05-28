import Phaser from 'phaser';
import {userForm, operationsBtn, generateTableHead, generateTableContent} from '../utils/form'
import {getAllUserScores} from '../utils/dashboard'
var el;
class welcomeScene extends Phaser.Scene {

	constructor() {
		super({key:'welcomeScene'});
	}

	preload() {
    this.load.image('background', 'assets/setbackground.png');
    this.playerName = "";
    
    
	}

	async create() {
		 var bg = this.add.image(0, 0,'background');
		  bg.setOrigin(0,0);

    var text = this.add.text(100,200, 'Welcome to my feed the snake game!', { color: 'black', fontSize: '25px ' });
    const dashboard = document.querySelector("#dashboard")
    dashboard.append(userForm(), operationsBtn())
    const opsBtn = document.querySelector("#opsBtn")
    opsBtn.style.display = 'none'

    var restartBtn = document.querySelector("#gameRestart")

    var errors = document.querySelector("#errors")
    

    const userInput = document.querySelector("#user-form");
    userInput.addEventListener('submit', (event) => {
      event.preventDefault()
      if(event.target.elements[0].value.length > 1){
        userInput.style.display = 'none'
        opsBtn.style.display = 'block'
        this.playerName = event.target.elements[0].value
        this.loadGame()
        errors.innerHTML = '';
        
      }else{
        errors.innerHTML = '';
        errors.innerHTML = 'Player name can not be empty'
      }
      

    })
    restartBtn.addEventListener('click',async () => {
      try {
        const data = await getAllUserScores()
        const getTable = document.querySelector("#table")
        getTable.innerHTML = ''
        generateTableContent(getTable, data.data.result)
        generateTableHead(getTable)
        errors.innerHTML = '';
        

        
      } catch (error) {
        errors.innerHTML = '';
        errors.innerHTML = 'error';
        
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
import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  title = 'rock-paper-scissors';

  answers: Array<string> = ['rock', 'paper', 'scissors']
  comAnswer: Array<string> = ['rock', 'paper', 'scissors']
  playerAnswer: String = new String();
  computerAnswer: String = new String();
  result: String = new String();
  playerScore = 0;
  compScore = 0;
  isWinner:boolean = false
  isLooser:boolean = false
  isDraw:boolean = false
   roundsLeft: number = 6;
   gamestart!:string;
   constructor(private gameservice: GameService) {


     }

  getRandomInteger (min: number, max:number){
    return Math.floor(Math.random() * (max-min + 1)) + min;
  }


 
  getResult2(event: Event) {
    let answer = (event.target as Element).id
    let comAnswer = this.getRandomInteger(0,2);
    console.log(comAnswer);
    console.log(answer);
    
    
    
if(this.roundsLeft===0){
  this.getWinner();
}else{
    if(comAnswer === 0 && answer === "rock" || comAnswer === 1 && answer === "paper" || comAnswer === 2 && answer === "scissors"){
      this.result = "Drow";
      this.playerAnswer = answer;
      this.computerAnswer = this.answers[comAnswer];
      this.roundsLeft -=1;
      

    } else if (comAnswer === 0 && answer === "paper" || comAnswer === 1 && answer === "scissors" ||  comAnswer === 2 && answer === "rock") {
      this.result = "You Win!"
      this.playerAnswer = answer;
      this.computerAnswer = this.answers[comAnswer];
      this.playerScore += 1
      this.roundsLeft -=1;

    } else if(comAnswer === 0 && answer === "scissors" || comAnswer === 1 && answer === "rock" ||  comAnswer === 2 && answer === "paper"){
      this.result = "You Loose!"
      this.playerAnswer = answer;
      this.computerAnswer = this.answers[comAnswer];
      this.compScore +=1
      this.roundsLeft -=1;
    }
   
  }
    
    
  }

  getWinner () {
    if(this.playerScore >this.compScore){
      this.isWinner = true
    } else 
    if(this.compScore >this.playerScore){
      this.isLooser = true
    }else{
      this.isDraw = true
    }
    this.send();
  }


  data: any;
  // Api to Post Data
  send() {
    this.data = {
      "name": this.gamestart,
      "userScore": this.playerScore,
      "compScore": this.compScore,
      // "status": this.result

    }
    this.gameservice.post(this.data).subscribe((response: any) => {
      console.log('API response:', response);
    },
      (error: any) => {
        console.log('API error:', error);

     }
   );
  }

  reload(){
    window.location.reload();
    
  }
  
}
//constantes - variables - Elementos de la UI
const title = document.getElementById("title");
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const questionImg = document.getElementById("questionImg");
const choiceA = document.getElementById("a");
const choiceB = document.getElementById("b");
const choiceC = document.getElementById("c");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const scoreContainer = document.getElementById("scoreContainer");
const progress =  document.getElementById("progress");
let imgCorrect = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];


let minigames = [
    {
        title: "Miguel Angel Puzzle",
        imgs: window.onload = function() {
            for (let r=0; r < rows; r++) {
                for (let c=0; c < columns; c++) {
        
         
                    let tile = document.createElement("img");
         
                    tile.src = "img/" + imgOrder.shift()  + ".png";
        
            
                    tile.addEventListener("dragstart", dragStart);  
                    tile.addEventListener("dragover", dragOver);    
                    tile.addEventListener("dragenter", dragEnter);  
                    tile.addEventListener("dragleave", dragLeave);  
                    tile.addEventListener("drop", dragDrop);        
                    tile.addEventListener("dragend", dragEnd);      
        
                    document.getElementById("board").append(tile);
        
                }
            }
        },
        solution: imgCorrect

    },

   // {
       // title: "Señor Presidente Puzzle",
      //  imgs: window.onload = function() {
      //      for (let r=0; r < rows; r++) {
      //          for (let c=0; c < columns; c++) {
        
         
      //              let tile = document.createElement("img");
         
      //              tile.src = "img/" + imgOrder.shift()  + ".jpg";
        
            
         //           tile.addEventListener("dragstart", dragStart);  
        //            tile.addEventListener("dragover", dragOver);    
         //           tile.addEventListener("dragenter", dragEnter);  
         //           tile.addEventListener("dragleave", dragLeave);  
        //            tile.addEventListener("drop", dragDrop);        
        //            tile.addEventListener("dragend", dragEnd);      
        
       //             document.getElementById("board").append(tile);
        
       //         }
       //     }
      // },
     //   solution: imgCorrect
        
  //  }










]




//Variables Globales 

let lastMinigame = minigames.length -1;

let runningQuestion = 0;
let count = 0;
const questionTime = 10; //10 segundos
const gaugeWith = 150; //150px
const gaugeUnit = gaugeWith / questionTime;
let TIMER;
let score = 0;
let rows = 3;
let columns = 3;
let currTile;
let otherTile; 
let turns = 0;
let imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
let imgSolution = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];



const startQuiz = () =>{
    start.style.display="none";
    title.style.display  = "none";
   
    quiz.style.display = "block"

    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); //1000ms = 1s
}

start.addEventListener("click",startQuiz);

const renderProgress = () =>{
    for(let qIndex = 0; qIndex <= lastMinigame; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

const renderCounter = () =>{
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit+"px";
        count++
    }else{
        count = 0;
    // Indica progreso y coloca 'malo' (rojo)
    answerIsWrong();
    if(runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }else{
    // Finaliza el quiz y muestra el punteo
        clearInterval (TIMER);
        scoreRender();
    }
}
}



function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 

}

function dragEnd() {
  

        
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;


      
   

}



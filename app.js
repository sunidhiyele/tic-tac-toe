let boxes=document.querySelectorAll(".btn");
let resetBtn=document.querySelector(".reset");
let newGameBtn=document.querySelector("#new-game");
let msgBox=document.querySelector(".msgContainer");
let msg=document.querySelector("#msg");
let turn =document.querySelector("#turn");

const moveSound=new Audio("sounds/move.wav");
const resetSound=new Audio("sounds/reset.wav")
const winSound=new Audio("sounds/win.wav")
const loseSound=new Audio("sounds/lose.wav")

let turnX=true;
let count=0;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const reset=()=>{
    turnX=true;
    count=0;
     turn.innerText="Player X's turn"
    enableBoxes();
    msgBox.classList.add("hide");
  resetSound.currentTime=0;
      resetSound.play();

}



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{

      if(box.innerText !== "") return;
      moveSound.currentTime=0;
      moveSound.play();
       

       if(turnX){
        box.innerText="X";
        
         turn.innerText="Player O's turn";
        turnX=false;
       
       }else{
        box.innerText="O";
        
             turn.innerText="Player X's turn";
       turnX=true;
       
       }
  
         box.disabled=true;
         count++;
        let isWinner= checkWinner();

        if(count==9 && !isWinner){
            drawGame();
        }
    });
  
});

const drawGame=()=>{
     msg.innerText="Game was a Draw";
     msgBox.classList.remove("hide");
     disableBoxes();
       loseSound.currentTime=0;
    loseSound.play();
}


const disableBoxes=()=>{
    for( let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for( let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
   
     msg.innerText=`Winner is ${winner}`;
     msgBox.classList.remove("hide");
     disableBoxes();
      winSound.currentTime=0;
    winSound.play();
}

 const checkWinner=()=>{
    for( let pattern of winPatterns ){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
         if(pos1Val != "" && pos2val != "" && pos3Val != ""){
            if(pos1Val === pos2val && pos2val === pos3Val){
                console.log(`Winner is ${pos1Val}`);
                showWinner(pos1Val);
                }
                
            }
            }
        }
    

    resetBtn.addEventListener("click", reset);
    newGameBtn.addEventListener("click",reset);
let gameseq=[];
let userseq=[];
let btns = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;
let highestScore = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if ( started == false) {
    console.log("Game started");
    started = true;
    levelUp();
    }
});

function btnFlash(randbtn){
    randbtn.classList.add("flash");
    setTimeout(function(){
        randbtn.classList.remove("flash");
    }, 250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 4 );
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    btnFlash(randbtn);
    gameseq.push(randColor);
    console.log(`Game Seq: ${gameseq}`);
   
} 

    function checkAnswer(idx){
        if(userseq[idx] === gameseq[idx]){
            if(userseq.length === gameseq.length){
               setTimeout(levelUp,100);
            }
        }else{

            let currentScore = Math.max(level - 1,0);

            if (currentScore > highestScore){
                highestScore = currentScore;
            }

            h2.innerHTML = `Game Over! Your score was: <b>${currentScore}</b> <br> Highest Score: <b>${highestScore}</b> <br>Press any key to restart.`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout (function(){
                document.querySelector("body").style.backgroundColor = "white";
            }, 150);
            resetGame();
        }
    }
   
function btnPress(){
    let btn = this;
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    console.log(`User Seq: ${userseq}`);
    checkAnswer(userseq.length-1);
}

let Allbtns = document.querySelectorAll(".btn");
for(let btn of Allbtns){
    btn.addEventListener("click",btnPress);
    
}

function resetGame(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

/* todo:
1. menu with different songs
    a. JSON with songs(links to youtube and name)
    b. show menu with songs from JSON 
    c. after selecting of every song game will start

2. create modal window with good adaptive visual content of gameScreen
3. change squares to rings
4. then tap on button => color will lighter
5. 

*/
var score = 0;
var misses = 0
// [x, y]
var blocks = [[0, 0]];
var speedBlocks = 20;
let maxMisses = 30;

let falling ;
let stateOfGame = false;
let backgroundVideo =document.getElementById('myBackgroundVideo')
let startStopButton =document.getElementById('stateOfGame');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "30px Arial";

var colors = ["red", "yellow", "green", "cornflowerblue"]

setTimeout(makeBlock, 0);
window.addEventListener("keydown", keyDown);
startStopButton.addEventListener('click', changeStateOfGame)
function changeStateOfGame(){
    // let textStartStopButton = 
    stateOfGame = !stateOfGame;
    stateOfGame? startGame():stopGame();
    
}
function startGame(){
    if(misses >= maxMisses) reloadGame();
    startStopButton.textContent = 'Stop';
    backgroundVideo.play();
    falling = setInterval(fallingBlocks, 50/3);
}
function stopGame(){
    startStopButton.textContent = 'Start';
    backgroundVideo.pause();
    clearInterval(falling);
}
function reloadGame(){
    // clearInterval(falling);
    score = 0;
    speedBlocks = speedBlocks;
    misses = 0;
    blocks = [];
    // changeStateOfGame();
    // falling = setInterval(fallingBlocks, 50/3);
}
function rect(x, y, wid, hi){
  ctx.beginPath();
  ctx.rect(x, y, wid, hi)
}
function text(message, x, y){
  ctx.fillStyle = "black";
  ctx.fillText(message, x, y);
}
function fill(r, g, b){
  ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.fill();
  ctx.stroke();
}
function line(x1, y1, x2, y2){ 
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Arrows
function leftArrow(arrowX, arrowY){
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX + 50, arrowY)
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX + 20, arrowY - 10);
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX + 20, arrowY + 10);
  ctx.stroke();
}

function rightArrow(arrowX, arrowY){
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 50, arrowY)
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 20, arrowY - 10);
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 20, arrowY + 10);
  ctx.stroke();
}

function upArrow(arrowX, arrowY){
    arrowX += 8;
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX, arrowY + 50)
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX + 10, arrowY + 20);
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 10, arrowY + 20);
  ctx.stroke();
}

function downArrow(arrowX, arrowY){
    arrowX -= 7;
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX, arrowY - 50)
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX + 10, arrowY - 20);
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 10, arrowY - 20);
  ctx.stroke();
}

function drawArrows(arrowsX, arrowsY, arrowSpacer){
for (var i = 0; i < 4; i++){
ctx.beginPath();
ctx.rect(i * canvas.width/4, 800, canvas.width/4, 100);
ctx.fillStyle = colors[i];
ctx.fill();
}

ctx.font = "100px Arial";
text("v", arrowsX, arrowsY + canvas.width / 16);
text("b", arrowsX+canvas.width/4, arrowsY + canvas.width/13);
text("n", arrowsX + 1.99*canvas.width/4, arrowsY + canvas.width / 16);
text("m", arrowsX + 2.88*canvas.width/4, arrowsY + canvas.width / 16);
line(0, 800, 450, 800);
for (var i = 1; i < 4; i++){
    line(i * canvas.width/4, 800, i * canvas.width/4, 900)
}

}

function drawBlocks(){
    for (var i = 0; i < blocks.length; i++){
        ctx.beginPath();
        ctx.rect(blocks[i][0] * canvas.width/4, blocks[i][1], canvas.width/4, 100);
        ctx.fillStyle = colors[blocks[i][0]];
        ctx.fill();
    }
}

function makeBlock(){
    blocks.push([Math.round(Math.random()*3), -canvas.width/4])
    setTimeout(makeBlock, 3* 1000/speedBlocks);
}

function fallingBlocks(){
    
    // speedBlocks += 0.001
    // document.getElementById("speed").innerHTML = "Speed: " + Math.round(speedBlocks);
    document.getElementById("score").innerHTML = "Score: " + Math.round(score)
    document.getElementById("misses").innerHTML = "Misses: " + misses;
    
    for (var i = 0; i < blocks.length; i++){
        blocks[i][1] += speedBlocks;
        if (blocks[i][1] > 800){
            blocks.splice(i, 1);
            misses += 1;
            score -= 1;
        }
    }
    
    if (misses >= maxMisses){
        // clearInterval(falling);
        changeStateOfGame();
        document.getElementById("misses").innerHTML = "Misses: " + misses;

        // ctx.clearRect(0, 0, 450, 900);
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        text('You can BETTER press "R"', 15, 300);
    } else {
      ctx.clearRect(0, 0, 450, 900);
      drawBlocks();
      drawArrows(30, 850, 130);
    }
}

function keyDown(event){
    var key = event.key;

    if (key == "v"){ 
        if (blocks[0][0] == 0){
            if (blocks[0][1] >= 800 - canvas.width/4){
                score += 2;
                blocks.splice(0, 1);
                // console.log(this)
            } else {
                minusPoint();
            }
        } else {
            minusPoint();
        }
    } else if (key == "b"){
        if (blocks[0][0] == 1){
            if (blocks[0][1] >= 800 - canvas.width/4){
                score += 2;
                blocks.splice(0, 1);
            } else {
                minusPoint();
            }
        } else {
            minusPoint();
        }
    } else if (key == "n"){
        if (blocks[0][0] == 2){
            if (blocks[0][1] >= 800 - canvas.width/4){
                score += 2;
                blocks.splice(0, 1);
            } else {
                minusPoint();
            }
        } else {
            minusPoint();
        }
    } else if (key == "m"){
        if (blocks[0][0] == 3){
            if (blocks[0][1] >= 800 - canvas.width/4){
                score += 2;
                blocks.splice(0, 1);
            } else {
                minusPoint();
            }
        } else {
            minusPoint();
        }
    } else if (key == 'esc' || key == 'Escape') {
        if(stateOfGame){
            stopGame()
            stateOfGame = !stateOfGame;
        }
    }

    if (misses >= maxMisses && key == "r"){
        reloadGame();
        changeStateOfGame();
    }
}

function minusPoint(){
    score --;
    misses ++;
}
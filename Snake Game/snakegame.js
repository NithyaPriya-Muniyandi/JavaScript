const gameboard = document.getElementById('gameboard')
const context = gameboard.getContext('2d')
const scoreText = document.getElementById('scoreVal')

const width = gameboard.width;
const height = gameboard.height;
const unit = 20;
let foodX;
let foodY;
let snake=[
    {x:unit*3, y:0},
    {x:unit*2, y:0},
    {x:unit, y:0},
    {x:0, y:0}
]
let xVal = 20;
let yVal = 0;
let score = 0;
let started=false;
let active=true;
window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
    context.fillStyle = '#212121';
    // fillRect(xStart,yStart,width,height)
    // context.fillRect(0,0,500,500)
    context.fillRect(0,0,width,height);
    createFood();
    displayFood();
    drawSnake();
    // moveSnake();
    // clearBoard();
    // drawSnake();
    
}

function clearBoard(){
    context.fillStyle = '#212121';
    // fillRect(xStart,yStart,width,height)
    // context.fillRect(0,0,500,500)
    context.fillRect(0,0,width,height);
}

function createFood(){
    foodX= Math.floor(Math.random()*width/unit)*unit;
    foodY=Math.floor(Math.random()*height/unit)*unit;
}
 
function displayFood(){
    context.fillStyle='red';
    // context.fillRect(1,0,unit,unit);
    context.fillRect(foodX,foodY,unit,unit);
}

function drawSnake(){
    context.fillStyle='lightgreen';
    context.strokeStyle='#212121';
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,unit,unit);
        context.strokeRect(snakePart.x,snakePart.y,unit,unit);
    })
}

function moveSnake(){
        const head = {x:snake[0].x+xVal,
                        y:snake[0].y+yVal}
        snake.unshift(head)
        if(snake[0].x==foodX && snake[0].y==foodY){
            score +=1;
            scoreText.textContent = score;
            createFood();
        }
        else
            snake.pop();
}

function nextTick(){
    if(active){

    
        setTimeout(()=>{
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 200);
    }
    else{
        clearBoard();
        context.font="bold 50px serif";
        context.fillStyle="white";
        context.textAlign="center";
        context.fillText("Game Over!!",width/2, height/2)
    }
}
function keyPress(event){
    // The key codes for the left arrow key, up arrow key, 
    // right key, and down arrow key are 37, 38, 39, and 40, 
    // respectively.
    if (!started){
        started = true;
        nextTick();
    }
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    switch(true){
        case(event.keyCode==left && xVal!==unit):
        xVal=-unit;
        yVal=0;
        break;
        case(event.keyCode==right && xVal!==-unit):
        xVal=unit;
        yVal=0;
        break;
        case(event.keyCode==up && yVal!=unit):
        xVal=0;
        yVal=-unit;
        break;
        case(event.keyCode==down && yVal!=-unit):
        xVal=0;
        yVal=unit;
        break;
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=width):
        case(snake[0].y<0):
        case(snake[0].y>=height):
        active=false;
        break;
    }
}
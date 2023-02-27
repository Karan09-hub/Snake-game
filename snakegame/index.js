const board=document.querySelector("#board")
const ctx=board.getContext("2d");
const scoretext=document.querySelector("#score");
const reset=document.querySelector("#r");
const gheight=board.height;
const gwidth=board.width;
const boardcolor="aqua";
const snakecolor="burlywood";
const snakeborder="coral";
const foodcolor="red";
const unit=12;
let runnin=false;
let xvelocity=unit;
let yvelocity=0;
let foodx;
let foody;
let score=0;
let snake=[
    {x:unit*4,y:0},
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}
]


window.addEventListener("keydown",changedir);
reset.addEventListener("click",resetgame);

gamestart();


function gamestart(){
    runnin=true;
    scoretext.textContent=score;
    createfood();
    drawfood();
    nexttick();

};
function nexttick(){
    if(runnin){
        setTimeout(()=>{
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();
        },75);
    }
    else{
        displaygamover();
    }
}

function clearboard(){
    ctx.fillStyle=boardcolor;
    ctx.fillRect(0,0,gwidth,gheight);
};
function createfood(){
    function randomfood(min,max){
        const randnum=Math.round((Math.random()*(max-min)+min)/unit)*unit;
        return randnum;
    }
    foodx=randomfood(0,gwidth-unit);
    foody=randomfood(0,gwidth-unit);
    

};
function drawfood(){
    ctx.fillStyle=foodcolor;
    ctx.fillRect(foodx,foody,unit,unit)
};
function movesnake(){
    const head={x:snake[0].x+xvelocity,
                y:snake[0].y+yvelocity};
    snake.unshift(head);
    
    if(snake[0].x==foodx && snake[0].y==foody ){
        score+=1;
        scoretext.textContent=score;
        createfood();

    }
    else{
        snake.pop();
    }
};
function drawsnake(){
    ctx.fillStyle=snakecolor;
    ctx.strokeStyle=snakeborder;
    snake.forEach(snakepart=>{
        ctx.fillRect(snakepart.x,snakepart.y,unit,unit)
        ctx.strokeRect(snakepart.x,snakepart.y,unit,unit)
    })
};
function changedir(event){
    const kepress=event.keyCode;
    const LEFT=37,RIGHT=39,UP=38,DOWN=40;
    const goingUP=(yvelocity==-unit);
    const goingDOWN=(yvelocity==unit);
    const goingRIGHT=(xvelocity==unit);
    const goingLEFT=(xvelocity==-unit);
    switch(true){
        case (kepress==LEFT && !goingRIGHT):
        xvelocity=-unit;
        yvelocity=0;
        break;

        case (kepress==UP && !goingDOWN):
        xvelocity=0;
        yvelocity=-unit;
        break;

        case (kepress==RIGHT && !goingLEFT):
        xvelocity=unit;
        yvelocity=0;
        break;

        case (kepress==DOWN && !goingUP):
        xvelocity=0;
        yvelocity=unit;
        break;
        
    }
};
function checkgameover(){
    switch(true){
        case (snake[0].x<0):
            runnin=false;
            break;
        case (snake[0].x>=gwidth):
            runnin=false;
            break;
        case (snake[0].y>=gheight):
            runnin=false;
            break;
        case (snake[0].y<0):
            runnin=false;
            break;
    }
    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            runnin=false;
        }
    }
};
function displaygamover(){
    ctx.font="25px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER!",gwidth/2,gheight/2);
    runnin=false;
};
function resetgame(){
    score=0;
    xvelocity=unit;
    yvelocity=0;
    snake=[
        {x:unit*4,y:0},
        {x:unit*3,y:0},
        {x:unit*2,y:0},
        {x:unit,y:0},
        {x:0,y:0}
    ];
    gamestart();


};
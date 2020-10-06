var ball;
var database;
var reference,refchg,refpos;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    reference = database.ref("Ball/Position");
    console.log(reference);
}

function draw(){
    background("white");
    if(refpos !== undefined){
        
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
  
    drawSprites();
    refchg = reference.on("value",changes,errors);
}

function changePosition(x,y){
   // ball.x = ball.x + x;
   // ball.y = ball.y + y;
   reference.set(
       {
           x: refpos.x + x,
           y: refpos.y + y
       }
   )
}

function changes(position){
  refpos = position.val();
  console.log(refpos);
  ball.x = refpos.x;
  ball.y = refpos.y;
}

function errors(){
console.log("error occured");

}

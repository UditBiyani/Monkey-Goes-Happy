var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstaceImage
var foodGroup, obsGroup
var score = 0;
var ground;
var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var jump;
var jungle, jungleImage;
var check;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  jump = loadSound("jump-1.mp3");
  check = loadSound("checkPoint.mp3");
  
  jungleImage = loadImage("jungle.jpg");
  
}

function setup(){
  createCanvas(600,400);
  
  
  monkey = createSprite(50,320,10,10);
  monkey.addAnimation("monkey running",monkey_running);
  monkey.scale = 0.1;
  monkey.debug = true;
  monkey.depth = 2;
  
  ground = createSprite(300,350 ,600,3);
  ground.visible = false; 
  
  obsGroup = createGroup();
  foodGroup = createGroup();
  
  jungle = createSprite(300,200,10,10);
  jungle.addImage("jungle",jungleImage);
  jungle.scale = 0.6;
  jungle.depth = 1;
}




function draw() {
  background("white");
  drawSprites();
  console.log(monkey.y);
  text("Survival Time = " + score,50,50)
  
  if(gameState == PLAY){
    
    score = score + Math.round(getFrameRate()/60);
   
    monkey.collide(ground);
    if(keyDown("space")&& monkey.y > 315 ){
      monkey.velocityY = -10;
      jump.play();
    }
    monkey.velocityY += 0.5;
    
    spawnObs();
    fruit();
    if(monkey.isTouching(obsGroup)){
      gameState = END;
    }
    
    if(score>0 && score%100 === 0){
      check.play();
    }
    
  }
  
  
  if(gameState === END){
    over();
  }
  
}
function spawnObs(){
  if(frameCount% 60 == 0){
  var obstacle = createSprite(600,320,10,10);
  obstacle.addImage("Image",obstaceImage);
  obstacle.scale = 0.15;
  obstacle.velocityX   = -8;
  monkey.depth = obstacle.depth + 1;
  obstacle.lifetime=75 ;
    obsGroup.add(obstacle);
  }
}

function fruit(){
  if(frameCount% 30 == 0){
  var banana = createSprite(600, round(random(150,250  )) ,10,10);
  banana.addImage("Image",bananaImage);
  banana.scale = 0.1 ;
  banana.velocityX   = -8;
  monkey.depth = banana.depth + 1;
  banana.lifetime=75 ;
  foodGroup.add(banana);
  }
}

function over(){
  monkey.setVelocity(0,0);
  obsGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  obsGroup.setVelocityEach(0,0);
  foodGroup.setVelocityEach(0,0);
}






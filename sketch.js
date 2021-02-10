var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground,back,backImage;


function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  backImage=loadImage("background.jpg");
  
}



function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,370,800,10);
  ground.velocityX= -(6 + 3*score/10);
  ground.x=ground.width/2;
  ground.visible=true;
  
  back=createSprite(400,370,800,10);
  back.addImage(backImage);
  back.velocityX= -(6 + 3*score/10);
  back.x=back.width/2;
  
  
  obstaclesGroup=new Group();
   FoodGroup=new Group()
  
  score=0;
}


function draw() {
  background("white");
   
  
  if(ground.x>0) {
    ground.x=ground.width/2;
  }
  if(back.x<0) {
    back.x=back.width/2;
  }
  
  if(keyDown("space") && monkey.y>190) {
      monkey.velocityY = -12;
    
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
  
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
     switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        case 50:monkey.scale=0.20;
                break;
        default: break;
    }
     monkey.collide(ground);
    if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.08
     }
    
     
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);
  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnFoods();
  drawSprites()}


function spawnObstacles() {
  if(frameCount % 70 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -(7 + 3*score/10);
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
 function spawnFoods(){
if (frameCount % 120 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(190,300);   
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}






var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, backGround,backGroundimg;

function preload(){  
  monkey_running=            
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  backGroundimg = loadImage("jungle.jpg");
}



function setup() {
   createCanvas(600, 600); 
   backGround=createSprite(300,300,300,300);
   backGround.addImage("back" backGroundimg);
   backGround.x=backGround.width/2;
   monkey=createSprite(80,500,20,20);
   monkey.addAnimation("run", monkey_running);  
   monkey.scale=0.1;
  
ground = createSprite(400,550,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  var survivalTime=0;
}


function draw() {
  
  background(backGroundimg);

  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (backGround.x < 0){
      backGround.x = backGround.width/2;
    }
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);   
    
    if(FoodGroup.isTouching(monkey)){
        
        if(monkey.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
      }
    
    
    }
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,300,40,10);
    banana.y = random(200,320);    
    banana.velocityX = -5;
    
   
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,530,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

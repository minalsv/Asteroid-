var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  asteroids.setUp();
    
  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();
  drawScoreBoard();
  spaceship.run();
  asteroids.run();

  drawEarth();

     
  drawScoreBoard();// show how many astoroids has been shot
    
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
   

 
}

//////////////////////////////////////////////////
//draw the score board
function drawScoreBoard(){
    //display the score: number of astoroids deleted
    //let s = asteroids.deletedAstroids;
    fill(250);
    textSize(40);
    textAlign(CENTER);
    text('Score:'+asteroids.deletedAstroids, width/2, height-50); // Text wraps within text box 
   
}

//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);

}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    for(var i=0; i < asteroids.locations.length ; i++){
        if( isInside(spaceship.location,spaceship.size,asteroids.locations[i],asteroids.diams[i])){
            gameOver();
        }
            
    }

    //asteroid-2-earth collisions
    for(var i=0; i < asteroids.locations.length ; i++){
        if( isInside(earthLoc,earthSize.x,asteroids.locations[i],asteroids.diams[i])){
            gameOver();
        }
            
    }

    //spaceship-2-earth
    if( isInside(earthLoc,earthSize.x,spaceship.location,spaceship.size)){
            gameOver();
    }

    //spaceship-2-atmosphere
    if( isInside(atmosphereLoc,atmosphereSize.x,spaceship.location,spaceship.size)){
            spaceship.setNearEarth();
    }

    //bullet collisions
    var i = 0;
    while( i < asteroids.locations.length ){
        astorideDeleted = false;
        for(var j=0; j < spaceship.bulletSys.bullets.length; j++){
        
            if( isInside(spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam, asteroids.locations[i], asteroids.diams[i])){
                asteroids.destroy(i);
                astorideDeleted = true;
            }
        }
        
        if( !astorideDeleted ){
            //since astoride has NOT been deleted increment the astoroid index i
            i++;
        }

            
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    
    var collision = false;
    
    try{
        var d = int(dist(locA.x, locA.y, locB.x, locB.y)); // calculate the distance between two centers of the two input circles.

        if( d <= ((sizeA/2)+ (sizeB/2))){
             collision = true; // Collision identified
        }
    }
    catch(error){
        console.log('Ignore checking');
    }
    return collision;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

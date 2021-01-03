/*
Step 1: In bulletSystem.js complete the function edges() by looping over the bullets array and for each bullet check if it has left the screen. If it has, remove the specific bullet from the array. (Hint: Use splice() to remove the bullet from the array). Remember: If you want to call a function or use any variable that belongs to the class you'll need to prefix it with the word "this". So in this case it would be: this.bullets.myFunction();
*/

class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
      // YOUR CODE HERE (3 lines approx)
	  // identify if the bullet has gone out of the screen and if so then remove it from the array.
	  var i=0;
	  while( i < this.bullets.length ){
		  if( this.bullets[i].y <= 0 ){
			  this.bullets.splice(i,1); // remove the bullet at position i and DO NOT increment the i
			  console.log('Removed the bullet'); //Keeping it just for testing purpose.
		  }
		  else{
			  i++; // incrementing i here is important since the array length would reduce by 1 if the splice gets executed.
		  }
			  
	  }
		  
  }
}

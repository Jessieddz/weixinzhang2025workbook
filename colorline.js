function setup() {
    createCanvas(windowWidth, windowHeight);
    background(250); 
  }
  
  function draw() {
   
    stroke(random(256), random(256), random(256));
    strokeWeight(3);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  function mousePressed() {
    background(random(256), random(256), random(256));
  }
  
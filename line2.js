function setup() {
    createCanvas(windowWidth, windowHeight);
    background(windowWidth,windowHeight);
  }
  function draw() {
    fill(mouseX/4, mouseY/2, mouseX/2);
    circle(mouseX, mouseY, 100);
  }
  function mousePressed(){
    background(random(300), random(300), random(300));
  }
// —— 配置文字部分 ——
const textContent = " Dora";
const cols = 40;
const rows = 40;
const swirlForce = 5;
const letterSpacing=1;
const buttonFontSize = 50;



let label1, subLabel1, label2, subLabel2;
let letters = [];
let gifImage;
let myFont;
function preload() {
  myFont = loadFont('myfont/WinkyRough-VariableFont_wght.ttf'); 
  gif1= createImg('img5/dic.gif'); 
  gif1.hide();  

  gif2= createImg('img7/huauhauhua.gif'); 
  gif2.hide();  
  
}

// 这个是几个模块啦
let buttons = [
  {
    label: "DICE GAME",
    subLabel: "Roll the dice!",
    x: 0, y: 0, r:150,
    color: "#ffffff",
    link: "rolldice.html"
  },
  {
    label: "INSPIRED BY YAYOI KUSAMA",
    subLabel: "Infinity meets interaction",
    x: 0, y: 0, r: 190,
    color: "",
    link: "kusama.html"
  },

  

];



function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(20);
  textFont(myFont);
  capture = createCapture(VIDEO);

capture.size(440, 280);
capture.hide();



  buttons[0].x = width / 2 - 500;
  buttons[0].y = height / 2 - 200;

  buttons[1].x = width / 2 +500;
  buttons[1].y = height / 2 + 200;

// 设置 gif1 显示在按钮1
gif1.size(buttons[0].r * 2, buttons[0].r * 2);
gif1.position(buttons[0].x - buttons[0].r, buttons[0].y - buttons[0].r);
gif1.show();

// 设置 gif2 显示在按钮2
gif2.size(buttons[1].r * 2, buttons[1].r * 2);
gif2.position(buttons[1].x - buttons[1].r, buttons[1].y - buttons[1].r);
gif2.show();

// 设置 gif1
gif1.style("border-radius", "50%");
gif1.style("overflow", "hidden");
gif1.style("object-fit", "cover"); // 保证填满圆形区域
gif1.style("border", "4px solid #ffffff"); // 可选白色边框

// 设置 gif2
gif2.style("border-radius", "50%");
gif2.style("overflow", "hidden");
gif2.style("object-fit", "cover");
gif2.style("border", "4px solid #ffffff");

// 主标题 1
label1 = createDiv("DICE GAME");
label1.style("font-size", "40px");
label1.style("color", "#black");
label1.style("text-align", "center");
label1.style("font-family", "WinkyRough-VariableFont_wght");
label1.style("text-shadow", "10px 10px 50px rgb(13, 20, 221)");
label1.style("width", buttons[0].r * 2 + "px");
label1.style("z-index", "20");
label1.style("position", "absolute");
label1.position(buttons[0].x - buttons[0].r, buttons[0].y + buttons[0].r -220);

// 主标题 2
label2 = createDiv("Inspired by YAYOI KUSAMA's installation - Flower Obsession");
label2.style("font-size", "30px");
label2.style("color", "#ffff");
label2.style("text-align", "center");
label2.style("font-family", "WinkyRough-VariableFont_wght");
label2.style("text-shadow", "10px 10px 50px rgb(13, 20, 221)");
label2.style("width", buttons[1].r * 2 + "px");
label2.style("z-index", "20");
label2.style("position", "absolute");
label2.position(buttons[1].x - buttons[1].r, buttons[1].y + buttons[1].r -220);

label2 = createDiv("What are you doing?");
label2.style("font-size", "20px");
label2.style("color", "#black");
label2.style("text-align", "center");
label2.style("font-family", "WinkyRough-VariableFont_wght");
label2.style("text-shadow", "10px 10px 50px rgb(13, 20, 221)");
label2.style("width", buttons[1].r * 2 + "px");
label2.style("z-index", "20");
label2.style("position", "absolute");
label2.position(buttons[1].x - buttons[1].r +120, buttons[1].y + buttons[1].r -800);


 

  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = map(c, 0, cols - 1, 50, width - 50);
      let y = map(r, 0, rows - 1, 50, height - 50);
      let ch = textContent.charAt(idx % textContent.length);
      idx++;
      letters.push(new Letter(ch, x, y));
    
      
    }
  }
  let insectContainer = createDiv(''); 
  
  // insect
  insectContainer.style("position", "relative");
  insectContainer.style("width", "500px");
  insectContainer.style("height", "500px");
  insectContainer.style("margin", "50px auto");
  
 
  
  
  let insectElement = createDiv('');
 
  insectElement.style("position", "absolute");  
  insectElement.style("top", "-300px");           
  insectElement.style("left", "-300px");           
  insectElement.style("width", "100px");
  insectElement.style("height", "100px");
  insectElement.style("background", "url('https://www.animatedimages.org/data/media/323/animated-insect-image-0048.gif') no-repeat center center");
  insectElement.style("background-size", "contain");
  

  let insect2 = createDiv('');
  insect2.style("position", "absolute");
  insect2.style("top", "-500px");          
  insect2.style("left", "950px");         
  insect2.style("width", "50px");
  insect2.style("height", "50px");
  insect2.style("background", "url('https://www.animatedimages.org/data/media/323/animated-insect-image-0048.gif') no-repeat center center");
  insect2.style("background-size", "contain");
  insect2.class("insect");
  insectContainer.child(insect2);
 
  insectContainer.child(insectElement);
  
  
  let styleContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .insect:hover {
      animation: spin 1s linear infinite;
    }
  `;
 
  insectElement.class("insect");
  
 
  let styleElement = createElement('style', styleContent);
  styleElement.parent(document.head);
}



function draw() {
  background("#d8e8e8");
  image(capture, width / 2 + 960, height / 2 - 880);

filter(THRESHOLD);

  for (let l of letters) {
    l.update();
    l.display();
  }

  drawCatFace();
  /* ---------- 线条像素摄像机 ---------- */
let stepSize = 10;           
let previewW = 300;          
let previewH = 225;          
let offsetX   = width - previewW - 40; 
let offsetY   = 40;

push();
translate(offsetX, offsetY); 
capture.loadPixels();

for (let y = 0; y < previewH; y += stepSize) {
  for (let x = 0; x < previewW; x += stepSize) {

   
    let sx = int(map(x, 0, previewW, 0, capture.width  - 1));
    let sy = int(map(y, 0, previewH, 0, capture.height - 1));
    let idx = (sx + sy * capture.width) * 4;

    let r = capture.pixels[idx];
    let g = capture.pixels[idx + 1];
    let b = capture.pixels[idx + 2];
    let bright = (r + g + b) / 3;

    let threshold = 60; 

    if (bright < threshold) {
      stroke(0);
      strokeWeight(2);
      line(x, y, x + stepSize, y + stepSize); 
    }
  }
}
pop();


 
  push();
  
textFont(myFont); 
for (let b of buttons) {
  fill(b.color);
  noStroke();
  ellipse(b.x, b.y, b.r * 2);

  push();
  textAlign(CENTER, CENTER);        
  textFont(myFont);                 
  textSize(buttonFontSize);         
  fill(0);                          

 
 
  pop();
}

}







class Letter {
  constructor(ch, x, y) {
    this.ch = ch;
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    let distToMouse = dist(mouseX, mouseY, this.x, this.y);
    if (distToMouse < 100) {
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      let force = map(distToMouse, 0, 100, 1, 0) * swirlForce;
      this.vx += cos(angle) * force;
      this.vy += sin(angle) * force;
    }
    let spring = 0.01;
    let dx = this.baseX - this.x;
    let dy = this.baseY - this.y;
    this.vx += dx * spring;
    this.vy += dy * spring;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.95;
    this.vy *= 0.95;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill("#138ec0");
    noStroke();
    text(this.ch, 0, 0);
    pop();
  }
}


function drawCatFace() {
  push();
  translate(width / 2, height / 2);

  scale(1);

  noStroke();

  fill("#f4edb0");
  ellipse(0, 0, 350, 350);

  fill("#C4BE8D");
  triangle(-130, -130, -70, -180, -40, -90);
  triangle(130, -130, 70, -180, 40, -90);
  
    fill("#FFFFFF");
  ellipse(-60, -40, 60, -70, 50, -90);
  ellipse(55, -40, 60, -70, 50, -90);


  let eyeMoveX = map(mouseX, 0, width, -5, 5);
let eyeMoveY = map(mouseY, 0, height, -5, 5);

// 左眼瞳孔
fill("black");
ellipse(-60 + eyeMoveX, -30 + eyeMoveY, 20, 20);
// 右眼瞳孔
ellipse(60 + eyeMoveX, -30 + eyeMoveY, 20, 20);
  
  


  fill("pink");
  triangle(-15, 20, 15, 20, 0, 40);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(-10, 50, 20, 20, 0, PI);
  arc(10, 50, 20, 20, 0, PI);

  stroke(80);
  line(-20, -70, -20, -50);
  line(0, -75, 0, -55);
  line(20, -70, 20, -50);

  pop();
}

function mousePressed() {
  for (let b of buttons) {
    let d = dist(mouseX, mouseY, b.x, b.y);
    if (d < b.r) {
      window.open(b.link, "_self"); 
      return;
    }
  }
}
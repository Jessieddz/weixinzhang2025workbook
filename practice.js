// —— 配置文字部分 ——
const textContent = " P5.js sketch";
const cols = 40;
const rows = 40;
const swirlForce = 5;
const letterSpacing=1;
const buttonFontSize = 50;



let label1, subLabel1, label2, subLabel2,label3,sublabel3,label4,sublabel4;
let letters = [];
let gifImage;
let myFont;
function preload() {
  myFont = loadFont('myfont/WinkyRough-VariableFont_wght.ttf'); 
  gif1= createImg('img5/line.gif'); 
  gif1.hide();  

  gif2= createImg('img5/line2.gif'); 
  gif2.hide();  

  gif3= createImg('img/127.0.0.gif'); 
  gif3.hide(); 

  gif4= createImg('img4/127.0.1.gif'); 
  gif4.hide(); 
}

// 这个是几个模块啦
let buttons = [
  {
    label: "line color1",
    subLabel: "Roll the dice!",
    x: 0, y: 0, r:150,
    color: "",
    link:"colorline.html"
  },
  {
    label: "line color2",
    subLabel: "Infinity meets interaction",
    x: 0, y: 0, r: 190,
    color: "#",
    link: "line2.html"
  },
  {
    label: "canyouhearme",
    subLabel: "Infinity meets interaction",
    x: 0, y: 0, r: 150,
    color: "",
    link: "canyouhe.html"
  },

  {
    label: "video",
    subLabel: "Infinity meets interaction",
    x: 0, y: 0, r: 150,
    color: "",
    link: "video.html"
  },

];



function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(20);
  textFont(myFont);
  capture = createCapture(VIDEO);
  capture.hide();
  



  buttons[0].x = width / 2 - 500;
  buttons[0].y = height / 2 - 200;

  buttons[1].x = width / 2 +500;
  buttons[1].y = height / 2 + 200;

  buttons[2].x = width / 2 -100;
  buttons[2].y = height / 2 +100;

  buttons[3].x = width / 2 +300;
  buttons[3].y = height / 2 -200;

// 设置 gif1 显示在按钮1
gif1.size(buttons[0].r * 2, buttons[0].r * 2);
gif1.position(buttons[0].x - buttons[0].r, buttons[0].y - buttons[0].r);
gif1.show();

// 设置 gif2 显示在按钮2
gif2.size(buttons[1].r * 2, buttons[1].r * 2);
gif2.position(buttons[1].x - buttons[1].r, buttons[1].y - buttons[1].r);
gif2.show();

gif3.size(buttons[2].r * 2, buttons[2].r * 2);
gif3.position(buttons[2].x - buttons[2].r, buttons[2].y - buttons[2].r);
gif3.show();

gif4.size(buttons[3].r * 2, buttons[3].r * 2);
gif4.position(buttons[3].x - buttons[3].r, buttons[3].y - buttons[3].r);
gif4.show();

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

gif3.style("border-radius", "50%");
gif3.style("overflow", "hidden");
gif3.style("object-fit", "cover");
gif3.style("border", "4px solid #ffffff");

gif4.style("border-radius", "50%");
gif4.style("overflow", "hidden");
gif4.style("object-fit", "cover");
gif4.style("border", "4px solid #ffffff");






 

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
}


function draw() {
  background("#d8e8e8");
  image(capture, width / 2 + 960, height / 2 - 880);



  for (let l of letters) {
    l.update();
    l.display();
  }

 
  
let stepSize = 10;           // 线条密度（数字越小越密）
let previewW = 300;          // 显示区域宽度
let previewH = 225;          // 显示区域高度
let offsetX   = width - previewW - 40; // 右上角留 40px 边距
let offsetY   = 40;

push();


for (let y = 0; y < previewH; y += stepSize) {
  for (let x = 0; x < previewW; x += stepSize) {

    // 把 (x,y) 映射到原始 capture 像素坐标
    let sx = int(map(x, 0, previewW, 0, capture.width  - 1));
    let sy = int(map(y, 0, previewH, 0, capture.height - 1));
    let idx = (sx + sy * capture.width) * 4;

    let r = capture.pixels[idx];
    let g = capture.pixels[idx + 1];
    let b = capture.pixels[idx + 2];
    let bright = (r + g + b) / 3;

    let threshold = 60; // 亮度阈值（可调）

    if (bright < threshold) {
      stroke(0);
      strokeWeight(2);
      line(x, y, x + stepSize, y + stepSize); // 对角线
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
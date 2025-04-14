const textContent = " Dora";
const cols = 40;
const rows = 40;
const swirlForce = 5;
let letters = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(30);

  // 创建文字网格，每个 Letter 对象代表一个文字
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

  // 遍历每个 Letter 对象，更新位置并显示
  for (let l of letters) {
    l.update();
    l.display();
  }
}

// Letter 类：用来创建每个单独的文字对象
class Letter {
  constructor(ch, x, y) {
    this.ch = ch;
    this.baseX = x; // 原始位置
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    // 检测当前文字与鼠标之间的距离
    let distToMouse = dist(mouseX, mouseY, this.x, this.y);
    if (distToMouse < 100) {
      // 当鼠标靠近时产生涡旋效果，让文字离开鼠标的位置
      let angle = atan2(this.y - mouseY, this.x - mouseX);
      let force = map(distToMouse, 0, 100, 1, 0) * swirlForce;
      this.vx += cos(angle) * force;
      this.vy += sin(angle) * force;
    }
    // 加入回弹的 "弹簧" 效果，使文字回到原始位置
    let spring = 0.01;
    let dx = this.baseX - this.x;
    let dy = this.baseY - this.y;
    this.vx += dx * spring;
    this.vy += dy * spring;
    
    this.x += this.vx;
    this.y += this.vy;
    
    // 阻尼处理
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
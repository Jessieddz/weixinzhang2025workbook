var spin = 0;
var letterSize = 24;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
  // 使用 HSB 模式，方便用 hue 值来动态变化颜色
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  textAlign(CENTER);
  frameRate(15);
}

function draw() {
  // 让背景以一定透明度覆盖，产生拖影效果
  background(220, 51);

  fill(0); // 文本颜色设为黑色
  push();
  translate(width/2, height/2);
  rotate(spin);
  textSize(letterSize);
  text('Slide', 0, -letterSize * 0.3);

  // 根据鼠标的 X 坐标来改变旋转速度和方向
  spin += map(mouseX, 0, width, -10, 10);
  // 根据鼠标的 Y 坐标来映射文字尺寸
  letterSize = map(mouseY, 0, height, 8, 72);

  // 绘制中心的小圆，用 fill(0) 保持黑色
  circle(0, 0, letterSize / 2);

  // 绘制外围大圆：先禁用填充，再设置动态变色的描边颜色
  noFill();
  // 使用 frameCount 来改变 hue 值，每一帧色调值都会变化，从而产生彩色线条的效果
  stroke((frameCount * 5) % 360, 80, 80);
  circle(0, 0, letterSize * 10);
  
  pop();
}

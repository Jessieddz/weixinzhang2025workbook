

const cloudPixelScale      = 16;
const cloudCutOff          = 0.5;
const panSpeed             = 8;
const cloudEvolutionSpeed  = 4;
const message              = "Waiting";



const linkData = [
  { url: "inspirationk.html", desc:"Inspiration", size:100,hue:348},
  { url: "Creaticecode.html", desc: "Creative coding", size:80,hue:260},
  { url: "progress.html", desc: "progress", size:70,hue:71},
  { url: "interativee.html", desc: "Interactivities",size:80,hue:61 },
];

let flowers = [];
let nextFlowerIndex = 0;     
const spawnInterval = 30;    
let lastSpawnFrame = 0;      

let myFont;
function preload() {
  myFont = loadFont('myfont/WinkyRough-Black.ttf');  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  colorMode(HSB, 360, 255, 255, 255); 
  textFont(myFont);

}


  function draw() {
   
    background('#138ec0');
    drawClouds();
  

  if (isReadyToSpawn()) {
    spawnNextFlower();
  }

  for (let i = flowers.length - 1; i >= 0; i--) {
    flowers[i].grow();
    flowers[i].display();
  }
}

function drawClouds(){

	for (let x = 0; x <= width; x += cloudPixelScale) {
		for (let y = 0; y <= height; y += cloudPixelScale) {
			let tinyTimeOffset = millis() / 100000;

			let noiseScale = 0.01; 
			
		
			let n = noise(
				x * noiseScale + tinyTimeOffset * panSpeed,
				y * noiseScale + tinyTimeOffset * 0.25 * panSpeed,
				tinyTimeOffset * cloudEvolutionSpeed
			);
			
		
			if (n < cloudCutOff) { continue; }

		
			let alpha = map(n, cloudCutOff, 0.65, 10, 255);
			fill(255, alpha);

			
			textSize(cloudPixelScale * 1.2);
			text(getLetterForCoordinate(x, y), x, y);
		}
	}
}



function getLetterForCoordinate(x, y) {
  
  const col = Math.floor(x / cloudPixelScale);
  const row = Math.floor(y / cloudPixelScale);
  const colsPerRow = Math.ceil(width / cloudPixelScale);
  const idx = (row * colsPerRow + col) % message.length;
  return message.charAt(idx);
}

function isReadyToSpawn() {
  return nextFlowerIndex < linkData.length && frameCount - lastSpawnFrame >= spawnInterval;
}

function spawnNextFlower() {
  const data = linkData[nextFlowerIndex];

  const x = map(nextFlowerIndex, 0, linkData.length - 1, width * 0.15, width * 0.85);
  const y = random(height * 0.3, height * 0.7);
  
  const { url, desc, size, hue } = data;
  flowers.push(new Flower(x, y, url, desc, size, hue));

  nextFlowerIndex++;
  lastSpawnFrame = frameCount;
}


function mousePressed() {
  // First check whether we clicked on an existing flower head
  for (let i = flowers.length - 1; i >= 0; i--) {
    if (flowers[i].isClicked(mouseX, mouseY)) {
      flowers[i].handleClick();
      return; // Stop – don’t plant a new flower if we just clicked one
    }
  }
  const idx = flowers.length;
  if (idx < linkData.length) {
    const { url, desc, size, hue } = linkData[idx];
    flowers.push(new Flower(mouseX, mouseY, url, desc, size, hue));
  } else {
    flowers.push(new Flower(mouseX, mouseY));   // 随机大小/颜色
  }
}




class Flower {
  constructor(xPx, yPx, link = null, desc = null,
              fixedSize = null, fixedHue = null) {
  
    this.xNorm = xPx / width;   
    this.yNorm = yPx / height; 


    this.stemProgress   = 0;                 
    this.stemSpeed      = random(0.015, 0.025); 
    this.bloomed        = false;

    this.numPetals      = int(random(5, 12));
    this.petalProgress  = 0;          // 0‒1
    this.petalSpeed     = 0.08;
    this.petalColor     = color(fixedHue ?? random(360), 200, 255, 200);

    this.link = link;
    this.desc = desc;
  }

  grow() {
    if (!this.bloomed) {
      this.stemProgress += this.stemSpeed;
      if (this.stemProgress >= 1) {
        this.stemProgress = 1;
        this.bloomed = true;
      }
    } else if (this.petalProgress < 1) {
      this.petalProgress += this.petalSpeed;
      if (this.petalProgress > 1) this.petalProgress = 1;
    }
  }

  display() {
    /* ---------- 4) 把百分比换回像素 ---------- */
    const baseX    = this.xNorm * width;   // 茎底（永远在画布底边）
    const baseY    = height;
    const targetY  = this.yNorm * height;  // 花心目标高度
    const stemLen  = (baseY - targetY) * this.stemProgress;
    const headY    = baseY - stemLen;      // 当前花心位置
    const petalMax = 90;                  // 跟以前差不多的尺寸
    const petalNow = petalMax * this.petalProgress;

    push();
    translate(baseX, baseY);

    /* ——— 茎 ——— */
    stroke(120, 200, 120);
    strokeWeight(5);
    line(0, 0, 0, -stemLen);

    /* ——— 花瓣 & 文字 ——— */
    if (this.bloomed) {
      translate(0, -stemLen);
      noStroke();
      fill(this.petalColor);
      for (let i = 0; i < this.numPetals; i++) {
        const a = map(i, 0, this.numPetals, 0, TWO_PI);
        push();
        rotate(a + frameCount * 0.01);
        ellipse(0, petalNow * 0.5, petalNow, petalNow * 2);
        pop();
      }

      fill(60, 255, 255);
      ellipse(0, 0, petalMax);

      if (this.desc) {
        fill(0, 0, 50);
        textAlign(CENTER, CENTER);
        textSize(petalMax * 0.7);
        text(this.desc, 0, 0);
      }
    }
    pop();
  }


  isClicked(px, py) {
    if (!this.bloomed) return false;
    const headX = this.xNorm * width;
    const headY = height - (height * (1 - this.yNorm)) * this.stemProgress;
    const radius = 180 * this.petalProgress;   
    return dist(px, py, headX, headY) < radius;
  }

  handleClick() {
    if (this.link) window.open(this.link, "_blank");
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
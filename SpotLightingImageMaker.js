let input
let img;
let b = 30;
let help = true;
let help_c = 0;
let arr = [];
let p = null;
let layer;
let fname = "";

function setup() {
  createCanvas(400, 400);
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function draw() {
  if (!img || !layer) return;

  layer.erase();
  for (let a of arr) {
    layer.ellipse(a[0], a[1], a[2], a[3]);
  }
  layer.noErase();

  image(img, 0, 0);
  image(layer, 0, 0);

  if (p) {
    stroke(0);
    noFill();
    ellipse(p.x + (mouseX - p.x) / 2, p.y + (mouseY - p.y) / 2, abs(p.x - mouseX), abs(p.y - mouseY));
  }

  if (help) {
    textSize(16);
    fill(255, 255, 0);
    noStroke();
    rect(0, 0, width, 40);
    fill(0);
    text("操作キー　明度(Q:アップ, A:ダウン) ESC:取消 S:保存", 0, 30);
    if (++help_c > 200) help = false;
  }
}

function mousePressed() {
  if (!img) return;
  p = createVector(mouseX, mouseY);
}

function mouseReleased() {
  if (!img) return;
  arr.push([p.x + (mouseX - p.x) / 2, p.y + (mouseY - p.y) / 2, abs(p.x - mouseX), abs(p.y - mouseY)]);
  p = null;
}

function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, e => {
      layer = createGraphics(e.width, e.height);
      resetLayer(e.width, e.height);
      resizeCanvas(e.width, e.height);
      fname = file.name;
    });
  } else {
    img = null;
  }
  input.remove();
}

function keyPressed() {
  if (!img) return;

  if (keyCode == ESCAPE) {
    arr.pop();
    resetLayer(width, height);
    return;
  }
  
  if (key == 'a' || key == 'A') {
    if ((b += 5) > 255) b = 255;
    resetLayer(width, height);
  }
  
  if (key == 'q' || key == 'Q') {
    if ((b -= 5) < 0) b = 0;
    resetLayer(width, height);
  }
  
  if (key == 's' || key == 'S') {
    const ext = fname.slice(fname.lastIndexOf("."));
    const name = fname.slice(0, fname.lastIndexOf("."));
    saveCanvas(name + "_", ext);
  }
}

function resetLayer(w, h) {
  layer.clear();
  layer.noStroke();
  layer.fill(0, b);
  layer.rect(0, 0, w, h);
}

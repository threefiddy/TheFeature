var canvas, ctx, sprites,
    width = 500,
    height = 400,
    rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    ship_x = (width / 2) - 25, ship_y = height - 66, ship_w = 22, ship_h = 66,
    srcX = 10, srcY = 0;

function clearCanvas() {
  ctx.clearRect(0,0,500,400);
}
function drawShip() {
  if (rightKey) {
    ship_x += 5;
    srcX = 44;
  } else if (leftKey) {
    ship_x -= 5;
    srcX = 22;
  }
  ctx.drawImage(sprites,srcX,srcY,ship_w,ship_h,ship_x,ship_y,ship_w,ship_h);
  if (rightKey == false || leftKey == false) {
    srcX = 0;
  }
}
function loop() {
  clearCanvas();
  drawShip();
}
function keyDown(e) {
  if (e.keyCode == 39) rightKey = true;
  else if (e.keyCode == 37) leftKey = true;
}
function keyUp(e) {
  if (e.keyCode == 39) rightKey = false;
  else if (e.keyCode == 37) leftKey = false;
}
(function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  sprites = new Image();
  sprites.src = 'playerSprite.png';
  setInterval(loop, 1000/30);
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
})();
//init();
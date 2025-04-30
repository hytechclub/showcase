let squareDistance = 30;
let squareSize = 15;
let squareColor = "#ffffff";
let g_tickLength = 5;







let g_animationTimer;
let g_tickNumber = 0;
let g_direction = "clockwise";

function startAnimation() {
  let canvas = document.getElementById("ex-1-canvas");
  let context = canvas.getContext('2d');

  g_animationTimer = setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (g_direction == "clockwise") {
      g_tickNumber++;
    } else {
      g_tickNumber--;
    }

    if (g_tickNumber > 360) {
      g_tickNumber -= 360;
    }

    if (g_tickNumber < 0) {
      g_tickNumber += 360;
    }

    let radians = (g_tickNumber * (Math.PI / 180));

    context.fillStyle = squareColor;
    context.fillRect(
      (canvas.width / 2) + (squareDistance * Math.cos(radians)),
      (canvas.height / 2) + (squareDistance * Math.sin(radians)),
      squareSize * 2,
      squareSize);
  }, g_tickLength);
}

function stopAnimation() {
  if (g_animationTimer) {
    clearInterval(g_animationTimer);
  }
}

function setClockwise() {
  g_direction = "clockwise";
}

function setCounterClockwise() {
  g_direction = "counter clockwise";
}

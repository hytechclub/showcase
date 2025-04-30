let g_gradientSpeed = 5;
let colorStep = 1;







let g_gradientTimer;
let g_redStep = 255;
let g_redDirection = "down";
let g_greenStep = 255;
let g_greenDirection = "down";
let g_blueStep = 255;
let g_blueDirection = "down";

function resetBG() {
  setBg("white");
}

function setBGBlue() {
  setBg("blue");
}

function setBGRed() {
  setBg("red");
}

function setBGGreen() {
  setBg("green");
}

function setBg(color) {
  document.body.style.background = color;
}

function startCoolGradients() {
  g_gradientTimer = setInterval(function () {
    let colorRandom = Math.random();

    if (colorRandom <= 0.333) {
      if (g_redDirection == "up") {
        g_redStep = g_redStep + colorStep;

        if (g_redStep >= 255) {
          g_redStep = 255;
          g_redDirection = "down";
        }
      } else {
        g_redStep = g_redStep - colorStep;

        if (g_redStep <= 0) {
          g_redStep = 0;
          g_redDirection = "up";
        }
      }
    } else if (colorRandom > 0.333 && colorRandom <= 0.667) {
      if (g_blueDirection == "up") {
        g_blueStep = g_blueStep + colorStep;

        if (g_blueStep >= 255) {
          g_blueStep = 255;
          g_blueDirection = "down";
        }
      } else {
        g_blueStep = g_blueStep - colorStep;

        if (g_blueStep <= 0) {
          g_blueStep = 0;
          g_blueDirection = "up";
        }
      }
    } else {
      if (g_greenDirection == "up") {
        g_greenStep = g_greenStep + colorStep;

        if (g_greenStep >= 255) {
          g_greenStep = 255;
          g_greenDirection = "down";
        }
      } else {
        g_greenStep = g_greenStep - colorStep;

        if (g_greenStep <= 0) {
          g_greenStep = 0;
          g_greenDirection = "up";
        }
      }
    }

    let color = "rgb(" + g_redStep + "," + g_greenStep + "," + g_blueStep + ")";

    setBg(color);
  }, g_gradientSpeed);
}

function stopCoolGradients() {
  if (g_gradientTimer) {
    clearInterval(g_gradientTimer);
  }
}

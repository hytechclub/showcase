let particleColor = "lime";
let particleSize = 10;
let circleSize = 20;
let circleSpeed = .01;

// background values - between 0 and 255
let bgRed = 10;
let bgGreen = 10;
let bgBlue = 100;
let bgOpacity = 220;




let t = 0; // time variable

function setup() {
  createCanvas(600, 600);
  noStroke();
  fill(particleColor);
}

function draw() {
  background(color(bgRed, bgGreen, bgBlue, bgOpacity));

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + circleSize * cos(2 * PI * t + angle);
      const myY = y + circleSize * sin(2 * PI * t + angle);

      ellipse(myX, myY, particleSize); // draw particle
    }
  }

  t = t + circleSpeed; // update time
}

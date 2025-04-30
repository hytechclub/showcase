let numNames = 10;
let sizeOfText = 50;
let backgroundColor = "black";
let darkBackground = true;
let regularColor = "white";
let greetingMessage = "hi ";

let baseR = 0;
let baseG = 0;
let baseB = 255;






let inputElement, button, greeting, p2, ans;

function setup() {
  // create canvas
  createCanvas(710, 400);
  background(backgroundColor);

  inputElement = createInput();
  inputElement.position(20, 65);

  button = createButton('submit');
  button.position(inputElement.x + inputElement.width, 65);
  button.mousePressed(greet);

  p2 = "ndy";

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);
  greeting.style("color", regularColor);
  greeting.style("background", backgroundColor)

  textAlign(CENTER);
  textSize(sizeOfText);
}

let p1 = "ca";

function greet() {
  const name = inputElement.value();
  greeting.html(greetingMessage + name + '!');

  if (numNames < 10) {
    ans = `🔑 the answer to question seven is: ${p1}${p2}`;
  } else {
    ans = `🔑 try to figure out the answer by changing numNames...`;
  }

  let newMsg = document.createElement("p");
  newMsg.textContent = ans;

  document.body.appendChild(newMsg);

  for (let i = 0; i < numNames; i++) {
    push();
    
    if (darkBackground) {
      fill(random(baseR, 255), random(baseG, 255), random(baseB, 255));
    } else {
      fill(random(0, baseR), random(0, baseG), random(0, baseB));
    }
    
    translate(random(width), random(height));
    rotate(random(2 * PI));
    text(name, 0, 0);
    pop();
  }
}

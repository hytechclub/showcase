
function getRandomWholeNumber(max) {
  let randomDecimal = Math.random();
  let randomDecimalRange = randomDecimal * max;
  let randomWhole = Math.ceil(randomDecimalRange);

  return randomWhole;
}

function getRandomColor() {
  let randomNumber = getRandomWholeNumber(4);
  let color = "";

  if (randomNumber === 1) {
    color = "yellow";
  } else if (randomNumber === 2) {
    color = "red";
  } else if (randomNumber === 3) {
    color = "blue";
  } else if (randomNumber === 4) {
    color = "limegreen";
  }

  return color;
}

function generateImage() {
  let container = document.querySelector("#container");
  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
  container.style.width = "200px";
  container.style.height = "200px";

  for (let i = 0; i < 32; i++) {
    let newCell = document.createElement("div");
    newCell.style.width = "50px";
    newCell.style.height = "50px";
    newCell.style.background = getRandomColor();
    container.appendChild(newCell);
  }
}

function animate1() {
  let id = setInterval(generateImage,100)
  setTimeout(function(){
    clearInterval(id)
  },30000)

}

function gamePage() {
 window.location.href = 'gamepage.html';
  return false;
}

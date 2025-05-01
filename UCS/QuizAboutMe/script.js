function startQuiz() {
  alert("Welcome to my quiz!");

  let numQuestions = 2;
  let score = 0;

  let answer1 = prompt("Where was I born?");
  if (answer1 === "Cleveland") {
    score = score + 1;
  }

  let answer2 = prompt("How old am I?");
  if (answer2 === "29") {
    score = score + 1;
  }

  alert("Number correct: " + score);

  let fraction = score / numQuestions;
  let percent = fraction * 100;
  
  alert("Percent correct: " + percent);

  if (percent === 100) {
    document.querySelector("#final").textContent = "😎😎😎";
  }
}

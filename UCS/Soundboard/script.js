function ready() {
  alert("I'm ready.");
}

function cry() {
  alert("I'll have you know that I stubbed by toe last week and only cried for 20 minutes.");
}

function moment() {
  alert("You never really know the true value of a moment, until it becomes a memory.");
}

function myLeg() {
  let myLegAudio = new Audio("myleg.mp3");
  myLegAudio.play();
}

function conditional() {
  let answer = prompt("What kind of quote do you want?");

  if (answer === "happy") {
    alert("With imagination, you can be anything you want.");
  }

  if (answer === "sad") {
    alert("Here lies Squidward's hopes and dreams.");
  }
}

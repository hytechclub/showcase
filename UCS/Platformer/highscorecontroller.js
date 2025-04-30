async function getHighScores() {
  return [];
}

async function sendHighScore(newScore) {
  try {
    const response = await fetch('/high-scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newScore)
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    alert(error);
  }
}

async function getHighestScore() {
  const topScores = await getTopScores();
  if (topScores.length === 0) {
    return 0;
  } else {
    return topScores[0].score;
  }
}

async function addNewScore(score) {
  const currentHighest = await getHighestScore();

  if (score > currentHighest) {
    alert("NEW HIGH SCORE!!!");
  }

  if (score === currentHighest) {
    alert("You tied for highest score!");
  }
  
  let initials = "";
  while (initials.length !== 3) {
    initials = prompt("You won! Enter your initials (3 characters)");
  }
  
  await sendHighScore({ initials, score });
  await displayHighScores();
}

async function getTopScores() {
  const currentHighScores = await getHighScores();
  currentHighScores.sort((hs1, hs2) => hs2.score - hs1.score);
  return currentHighScores;
}

async function displayHighScores() {
  const hsTable = document.querySelector("#hs-table");
  hsTable.innerHTML = "";
  const topScores = await getTopScores();
  
  const numToDisplay = Math.min(3, topScores.length);
  for (let i = 0; i < numToDisplay; i++) {
    const currentScore = topScores[i];
    const newRow = document.createElement("tr");
    
    const initsCell = document.createElement("td");
    initsCell.textContent = currentScore.initials;
    
    const scoreCell = document.createElement("td");
    scoreCell.textContent = currentScore.score;
    
    newRow.appendChild(initsCell);
    newRow.appendChild(scoreCell);
    hsTable.appendChild(newRow);
  }
}

displayHighScores();

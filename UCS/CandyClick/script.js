let upgrades = [
  {
    id: 0,
    name: "Confectioner",
    desc: "Hire a confectioner to make candy for you.",
    pic: "confectioner.webp",
    cost: 10,
    generation: 1,
    active: false
  },
  {
    id: 1,
    name: "Factory",
    desc: "Buy a factory that makes a lot of candy.",
    pic: "factory.jpg",
    cost: 1000,
    generation: 10,
    active: false
  }
];

let candyCount = 0;
let upgradeTick = 1000;

function candyClicked() {
  popImage(200);
  candyCount = candyCount + 1;
  updateCandyCount();
}

function updateCandyCount() {
  let candyCountElement = document.querySelector("#candy-count");
  candyCountElement.textContent = `You have ${candyCount} ${candyCount === 1 ? 'piece' : 'pieces'} of candy.`;

  if (candyCount >= 10) {
    revealUpgrades();
  }

  updateUpgrades();
}

function purchaseUpgrade(id) {
  let upgrade = upgrades.find(u => u.id === id);
  if (upgrade.active || upgrade.cost > candyCount) {
    return;
  }
  
  upgrade.active = true;
  candyCount = candyCount - upgrade.cost;

  updateCandyCount();
}

function updateUpgrades() {
  upgrades.forEach(u => {
    let displayElement = document.querySelector(`#upgrade-${u.id}`);
    displayElement.className = "";
    
    if (u.active) {
      displayElement.classList.add("bought");
    } else if (u.cost <= candyCount) {
      displayElement.classList.add("buyable");
    }
  });
}

setInterval(() => {
  let addedCandy = 0;
  
  for (let i = 0; i < upgrades.length; i++) {
    let currentUpgrade = upgrades[i];
    if (currentUpgrade.active) {
      addedCandy = addedCandy + currentUpgrade.generation;
    }
  }

  candyCount = candyCount + addedCandy;

  if (candyCount > 0) {
    updateCandyCount(); 
  } 
}, upgradeTick);

function makeHtmlForUpgrade(upgrade) {
  let upgradeElement = document.createElement("div");
  upgradeElement.id = `upgrade-${upgrade.id}`;
  upgradeElement.addEventListener("click", () => purchaseUpgrade(upgrade.id));

  upgradeElement.innerHTML = `
<div>
  <img src="${upgrade.pic}" />
</div>
<div>
  <h2>${upgrade.name}</h2>
  <p>${upgrade.desc} Cost: ${upgrade.cost} pieces of candy.</p>
</div>`;

  return upgradeElement;
}

function revealUpgrades() {
  let upgradesDiv = document.querySelector(".upgrades");
  upgradesDiv.style.display = "flex";
  upgradesDiv.style.opacity = 1;
}

function popImage(speed) {
  let imgElement = document.querySelector("img");
  imgElement.style.animation = `shake ${speed}ms`;
  
  setTimeout(() => {
    imgElement.style.animation = "";
  }, speed);
}



let upgradesDiv = document.querySelector(".upgrades");
upgrades.forEach(u => {
  let upgradeElement = makeHtmlForUpgrade(u);
  upgradesDiv.appendChild(upgradeElement);
});

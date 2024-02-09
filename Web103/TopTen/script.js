let restaurantNames = ["Taco Bell", "McDonald's", "Burger King", "Subway", "Chipotle", "The Cheesecake Factory", "Denny's"];

function addRestaurant(name) {
  let list = document.querySelector("#list");

  let newItem = document.createElement("li");
  
  let newItemText = document.createElement("span");
  newItemText.textContent = name;

  let newItemEditButton = document.createElement("button");
  newItemEditButton.textContent = "edit";
  newItemEditButton.onclick = () => {
    let newName = prompt("What restaurant should go in this place?");

    if (newName) {
      newItemText.textContent = newName;
    }
  }

  let newItemDeleteButton = document.createElement("button");
  newItemDeleteButton.textContent = "delete";
  newItemDeleteButton.onclick = () => {
    list.removeChild(newItem);
  }

  newItem.appendChild(newItemText);
  newItem.appendChild(newItemEditButton);
  newItem.appendChild(newItemDeleteButton);

  list.appendChild(newItem);
}

function addStarterRestaurants() {
  for (let i = 0; i < restaurantNames.length; i++) {
    let currentRestaurantName = restaurantNames[i];
    addRestaurant(currentRestaurantName);
  }
}

function addNewRestaurant() {
  let newRestaurantName = prompt("What restaurant would you like to add?");
  addRestaurant(newRestaurantName);
}

addStarterRestaurants();

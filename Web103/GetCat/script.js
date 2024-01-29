async function run() {
  let catPic = document.querySelector("#cat-pic");

  let messageInput = document.querySelector("#cat-message");
  let message = messageInput.value;
  let size = 40 + Math.random() * 10;

  catPic.src = `https://cataas.com/cat/says/${message}?font=Comic%20Sans%20MS&fontSize=${size}&fontColor=%23FFF&fontBackground=%23000&filter=mono&position=bottom`;
}

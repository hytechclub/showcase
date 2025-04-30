let fadeTickLength = 10;






function hidePicture() {
  let picture = document.getElementById("hyland-image");
  picture.style.opacity = 0;
}

function showPicture() {
  let picture = document.getElementById("hyland-image");
  picture.style.opacity = 1;
}

function fadeOutPicture() {
  let picture = document.getElementById("hyland-image");

  let i = 100;

  let fadeOutTimer = setInterval(function () {
    if (i >= 0) {
      picture.style.opacity = i / 100;
      i = i - 1;
    } else {
      clearInterval(fadeOutTimer);
    }
  }, fadeTickLength);
}

function showTwo() {
  let imgElement = document.querySelector("#hyland-image-2");
  imgElement.src = "cooldog/h7qrv4yw92m.png";
  imgElement.style.opacity = .02;
}

function fadeInPicture() {
  let picture = document.getElementById("hyland-image");

  let i = 0;

  let fadeInTimer = setInterval(function () {
    if (i <= 100) {
      picture.style.opacity = i / 100;
      i = i + 1;
    } else {
      clearInterval(fadeInTimer);
    }
  }, fadeTickLength);
}

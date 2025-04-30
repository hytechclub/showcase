let fadeTime = 500;
let holdTime = 3000;
let slides = [
  "images/slide1.jpg",
  "images/slide2.jpg",
  "images/slide3.jpg",
];






let index;

$(document).ready(function () {
  setInterval(switchImage, holdTime);
  index = 0;
});

function switchImage() {
  $("#flatironpic").animate({ opacity: 0.0 }, fadeTime, function () {
    if (index < slides.length-1) {
      index++;
    } else {
      index = 0;
    }
    
    $("#flatironpic").attr("src", slides[index]).animate({ opacity: 1.0 }, fadeTime);
  });
}

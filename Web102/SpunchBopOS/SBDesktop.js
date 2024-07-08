class Window {
  constructor(title, index, iframeSrc, icon, iconStyle, width, height, fullscreen, minimized, top, left) {
    this.title = title;
    this.index = index;
    this.iframeSrc = iframeSrc;
    this.icon = icon;
    this.iconStyle = iconStyle;
    this.width = width;
    this.height = height;
    this.fullscreen = fullscreen;
    this.minimized = minimized;
    this.top = top;
    this.left = left;
  }
}
class InternetWindow {
  constructor(windowID, history) {
    this.windowID = windowID;
    this.history = history;
    this.page = -1;
    this.backForwardRefreshPressed = false;
  }
}
let boowomp = new Audio('boowomp.mp3');
boowomp.preload = 'auto';
let menuOpen = false;
let timer;
let keyPress = false;
function redirect() {
  window.location.href = "SpongeBobScreenSaver.html";
}
function resetTimer() {
  clearTimeout(timer);
  startTimer();
}
function startTimer() {
  timer = setTimeout(function() {
    if (!keyPress) {
      redirect();
    }
  }, 900000);
}
document.addEventListener('keydown', function() {
  keyPress = true;
  resetTimer();
});
document.addEventListener('keyup', function() {
  keyPress = false;
  resetTimer();
});document.addEventListener('mousemove', function(event) {
  resetTimer();
});

document.addEventListener('click', function(event) {
  resetTimer();
});


startTimer();
let windowTotal = 0;
let testWindow = new Window("Internet Explorer", 1, "https://oldgoogle.neocities.org/2009/", "BubbleWindow.png", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
let windowList = [testWindow];
let internetWindowList = [];
let clickedOnWindow = false;
document.addEventListener('click', function() {
  if (!clickedOnWindow) {
    let allShortcuts = document.querySelectorAll("#shortcut");
    for (let i = 0; i < allShortcuts.length; i++) {
      allShortcuts[i].setAttribute("style", "width:60px; height:90px; border-color: rgba(0,0,255,0); border-style: double;");
    }
  }
  clickedOnWindow = false;
});
function menuButton()
{
  menuOpen = !menuOpen;     
document.querySelector("#StartMenu").style.display = menuOpen ? "block" : "none";
}
function createWindowElement(window) {
  // Create the window element
  let resizableDiv = document.createElement("div");
  resizableDiv.setAttribute("class", "ui-widget-content");
  resizableDiv.setAttribute("id", "resizable");
  resizableDiv.setAttribute("style", "width: 310px; height: 231px; top: 330.75px left:0px; background: transparent; position:absolute; left:calc(50% - 210px); top:calc(25% + 000px);");
  resizableDiv.setAttribute("windowIndex", window.index);

  /*let titleFooter = document.createElement("footer");
  titleFooter.setAttribute("style", "display:flex; background: #eeeeee url(images/ui-bg_highlight-soft_100_eeeeee_1x100.png) 50% top repeat-x;");
  resizableDiv.appendChild(titleFooter);*/

  let openCloseFooter = document.createElement("footer");
  openCloseFooter.setAttribute("style", "display:flex; background: #eeeeee url(images/ui-bg_highlight-soft_100_eeeeee_1x100.png) 50% top repeat-x;");
  resizableDiv.appendChild(openCloseFooter);
  let icon = document.createElement("img");
  icon.setAttribute("draggable", "false");
  icon.setAttribute("src", window.icon);
  icon.setAttribute("style", window.iconStyle);
  openCloseFooter.appendChild(icon);
  let title = document.createElement("p1");
  title.setAttribute("style", "-webkit-user-select: none; -ms-user-select: none; user-select: none; flex: 1 1 0%; margin-top: 2.5px;");
  title.textContent = window.title;
  openCloseFooter.appendChild(title);
  let minimizeButton = document.createElement("button");
  minimizeButton.setAttribute("id", "minimize");
  minimizeButton.setAttribute("onclick", "minimizeWindow(" + window.index + ")");
  minimizeButton.setAttribute("class", "ui-button ui-widget ui-corner-all ui-button-icon-only ui-button");
  minimizeButton.textContent = "-";
  openCloseFooter.appendChild(minimizeButton);
  let fullScreenButton = document.createElement("button");
  fullScreenButton.setAttribute("id", "fullScreen");
  fullScreenButton.setAttribute("class", "ui-button ui-widget ui-corner-all ui-button-icon-only ui-button");
  fullScreenButton.addEventListener("click", function() {
    window.fullscreen = !window.fullscreen;
    if (window.fullscreen) {
      window.width = resizableDiv.style.width;
      window.height = resizableDiv.style.height;
      window.top = resizableDiv.style.top;
      window.left = resizableDiv.style.left;
      resizableDiv.style.width = "calc(100% - 100px)";
      resizableDiv.style.height = "calc(100% - 125px)";
      resizableDiv.style.top = "0px";
      resizableDiv.style.left = "0px";
    }
    else {
      resizableDiv.style.width = window.width;
      resizableDiv.style.height = window.height;
      resizableDiv.style.top = window.top;
      resizableDiv.style.left = window.left;
    }
  });
  fullScreenButton.textContent = "□";
  openCloseFooter.appendChild(fullScreenButton);
  let closeButton = document.createElement("button");
  closeButton.setAttribute("id", "close");
  closeButton.setAttribute("class", "ui-button ui-widget ui-corner-all ui-button-icon-only ui-button");
  closeButton.setAttribute("onclick", "closeWindow(" + window.index + ")");
  if (window.title == "About") {
    closeButton.setAttribute("onclick", "messageBeforeClose(" + window.index + ")");
  }
  closeButton.textContent = "×";
  openCloseFooter.appendChild(closeButton);
  if (window.title == "Minesweeper")
  {
    fullScreenButton.disabled = true;
    fullScreenButton.style.cursor = "default";
    resizableDiv.style.width = "547px";
    resizableDiv.style.height = "373px";
  }
  if (window.title == "Internet Explorer") {
    let internetFooter = document.createElement("footer");
    internetFooter.setAttribute("style", "display:flex; background: #eeeeee url(images/ui-bg_highlight-soft_100_eeeeee_1x100.png) 50% top repeat-x;");
    resizableDiv.appendChild(internetFooter);
    let goBackButton = document.createElement("button");
    goBackButton.setAttribute("class", "ui-button ui-corner-all ui-widget");
    goBackButton.setAttribute("id", "goBack");
    goBackButton.textContent = "←";
    goBackButton.setAttribute("onClick", "goBack(" + window.index + ")");
    goBackButton.setAttribute("disabled", "");
    internetFooter.appendChild(goBackButton);
    let goForwardButton = document.createElement("button");
    goForwardButton.setAttribute("class", "ui-button ui-corner-all ui-widget");
    goForwardButton.setAttribute("id", "goForward");
    goForwardButton.setAttribute("onClick", "goForward(" + window.index + ")");
    goForwardButton.setAttribute("disabled", "");
    goForwardButton.textContent = "→";
    internetFooter.appendChild(goForwardButton);
    let refreshButton = document.createElement("button");
    refreshButton.setAttribute("class", "ui-button ui-corner-all ui-widget");
    refreshButton.setAttribute("id", "refresh");
    refreshButton.setAttribute("onClick", "refresh(" + window.index + ")");
    refreshButton.textContent = "↻";
    internetFooter.appendChild(refreshButton);
    let addressText = document.createElement("div");
    addressText.textContent = "Address:";
    addressText.setAttribute("style", "margin-top: 2.5px;")
    internetFooter.appendChild(addressText);
    let textbox = document.createElement("input");
    textbox.setAttribute("type", "text");
    textbox.setAttribute("style", "width:100%;");
    textbox.addEventListener("keypress", function(event) {
      if (event.keyCode == 13 || event.key === 'Enter') {
        search(window.index)
      }
    });


    internetFooter.appendChild(textbox);
    let IEWindow = new InternetWindow(window.index, [window.iframeSrc]);
    internetWindowList[window.index] = IEWindow;
    //console.log(internetWindowList[window.index]);
  }
  let iframe = document.createElement("iframe");
  iframe.setAttribute("id", "window");
  iframe.setAttribute("src", window.iframeSrc);
  iframe.setAttribute("onload", "webChange(" + window.index + ")");
  iframe.setAttribute("style", "height: calc(100% - 42px)");
  if (window.title != "Internet Explorer") {
    console.log("a")
    iframe.setAttribute("style", "height: calc(100% - 20px)");
  }
  resizableDiv.appendChild(iframe);
  document.body.appendChild(resizableDiv);
  if (window.title != "Minesweeper")
  {
  $(resizableDiv).resizable();
  }
  $(resizableDiv).draggable({ containment: "body" });

  //Add to taskbar
  const taskBar = document.querySelector(".taskBar")
  const windowElemnt = document.createElement("div");
  windowElemnt.setAttribute("class", "footer__window focus");
  windowElemnt.setAttribute("windowOpen", "true");
  windowElemnt.setAttribute("winSelect", window.index);
  windowElemnt.setAttribute("onclick", "minimizeWindow(" + window.index + ")");
  const windowIcon = document.createElement("img");
  windowIcon.setAttribute("draggable", "false");
  windowIcon.setAttribute("src", window.icon);
  windowIcon.setAttribute("style", window.iconStyle);
  const windowTitle = document.createElement("p1");
  windowTitle.setAttribute("style", "position:absolute; -webkit-user-select: none; -ms-user-select: none; user-select: none; bottom:0%; overflow:hidden; white-space: nowrap; text-overflow:ellipsis; left:40px; right:0px;");

  windowTitle.textContent = window.title;
  windowElemnt.appendChild(windowIcon);
  windowElemnt.appendChild(windowTitle);
  document.querySelector(".leftItems").appendChild(windowElemnt);
}
//createWindowElement(testWindow);

function closeWindow(id) {
  $('[windowIndex=' + id + ']')[0].remove();
  $('[winselect=' + id + ']')[0].remove();
}

function createWinAmp(thisWindow) {
  
  // Create the window element
  const Webamp = window.Webamp;
  const webamp = new Webamp({
    initialTracks: [
      {

        metaData: {
          artist: "DJ Mike Llama",
          title: "Llama Whippin' Intro",
        },
        url: "llama-2.91.wav",
        duration: 5.322286,
      },
      {
        metaData: {
          artist: "Avril Lavigne",
          title: "SpongeBob SquarePants Theme",
        },
        url: "SpongeBob SquarePants Theme.mp3",
        duration: 46,
      },
      {
        metaData: {
          artist: "The Flaming Lips",
          title: "SpongeBob and Patrick Confront the Psychic Wall of Energy",
        },
        url: "SpongeBob & Patrick Confront the Psychic Wall of Energy.mp3",
        duration: 219,
      },
      {
        metaData: {
          artist: "Wilco",
          title: "Just a Kid",
        },
        url: "Just a Kid.mp3",
        duration: 171,
      },
      {
        metaData: {
          artist: "EZ Mike",
          title: "The Goofy Goober Song",
        },
        url: "Goofy Goober Theme Song With Lyrics.mp3",
        duration: 161,
      },
      {
        metaData: {
          artist: "Paul Hutson, Wordsworth",
          title: "Prince Paul's Bubble Party",
        },
        url: "Prince Paul's Bubble Party.mp3",
        duration: 149,
      },
      {
        metaData: {
          artist: "Electrocute",
          title: "Bikini Bottom",
        },
        url: "Bikini Bottom.mp3",
        duration: 220,
      },
      {
        metaData: {
          artist: "SpongeBob and the Hi-Seas",
          title: "Best Day Ever",
        },
        url: "Spongebob Squarepants The Best Day Ever.mp3",
        duration: 182,
      },
      {
        metaData: {
          artist: "The Shins",
          title: "They'll Soon Discover",
        },
        url: "They'll Soon Discover.mp3",
        duration: 205,
      },
      {
        metaData: {
          artist: "Ween",
          title: "Ocean Man",
        },
        url: "Ocean Man.mp3",
        duration: 127,
      },
      {
        metaData: {
          artist: "Patrick Star",
          title: "Under My Rock",
        },
        url: "Under My Rock.mp3",
        duration: 197,
      },
      {
        metaData: {
          artist: "SpongeBob SquarePants, Patrick Star",
          title: "Now That We're Men (feat. The Monsters)",
        },
        url: "Now That We're Men.mp3",
        duration: 110,
      },
      {
        metaData: {
          artist: "Tom Rothrock, Jim Wise",
          title: "Goofy Goober Rock",
        },
        url: "Goofy Goober Rock.mp3",
        duration: 155,
      },
      {
        metaData: {
            artist: "Motörhead",
            title: "You Better Swim",
          },
          url: "You Better Swim.mp3",
          duration: 314,
        },
        {
          metaData: {
            artist: "Plus-Tech Squeeze Box",
            title: "The Jellyfish Song by the Jellyfish Band (feat. SpongeBob)",
          },
          url: "The Jellyfish Song by the Jellyfish Band (feat. SpongeBob).mp3",
          duration: 75,
        },
        {
          metaData: {
            artist: "Pirates",
            title: "SpongeBob SquarePants Theme (Movie Version)",
          },
          url: "SpongeBob SquarePants Theme (Movie Version).mp3",
          duration: 61,
        },
      {
        metaData: {
          artist: "SpongeBob SquarePants",
          title: "Employee of the Month",
        },
        url: "Employee of the Month.mp3",
        duration: 214,
      },
    ],
  });
  // Returns a promise indicating when it's done loading.
  webamp.renderWhenReady(document.getElementById("winApp"));
  
  webamp.onClose(() => {
    document.getElementById("webamp").setAttribute("windowIndex", thisWindow.index);
    closeWindow(thisWindow.index);
  });
  webamp.onMinimize(() => {
    document.getElementById("webamp").setAttribute("windowIndex", thisWindow.index);
    minimizeWindow(thisWindow.index);
  })
  
  //Add to taskbar
  const taskBar = document.querySelector(".taskBar")
  const windowElemnt = document.createElement("div");
  windowElemnt.setAttribute("class", "footer__window focus");
  windowElemnt.setAttribute("windowOpen", "true");
  windowElemnt.setAttribute("winSelect", thisWindow.index);
  windowElemnt.setAttribute("onclick", "minimizeWindow(" + thisWindow.index + ")");
  const windowIcon = document.createElement("img");
  windowIcon.setAttribute("draggable", "false");
  windowIcon.setAttribute("src", thisWindow.icon);
  windowIcon.setAttribute("style", thisWindow.iconStyle);
  const windowTitle = document.createElement("p1");
  windowTitle.setAttribute("style", "position:absolute; -webkit-user-select: none; -ms-user-select: none; user-select: none; bottom:0%; overflow:hidden; white-space: nowrap; text-overflow:ellipsis; left:35px; right:0px;");

  windowTitle.textContent = thisWindow.title;
  windowElemnt.appendChild(windowIcon);
  windowElemnt.appendChild(windowTitle);
  document.querySelector(".leftItems").appendChild(windowElemnt);
}
//createWindowElement(testWindow);

function closeWindow(id) {
  $('[windowIndex=' + id + ']')[0].remove();
  $('[winselect=' + id + ']')[0].remove();
}

function minimizeWindow(id) {
  let window = $('[windowIndex=' + id + ']')[0];
  let task = $('[winselect=' + id + ']')[0];
  let newOpenBool = $('[winselect=' + id + ']')[0].getAttribute("windowOpen");
  newOpenBool = newOpenBool != "true";
  console.log(newOpenBool);
  task.setAttribute("windowOpen", newOpenBool.toString());
  if (!newOpenBool) {
    window.style.display = "none";
    task.setAttribute("class", "footer__window cover")
  }
  else {
    window.style.display = "block";
    task.setAttribute("class", "footer__window cover focus")
  }
}

function openWindow(name, id) {
  clickedOnWindow = true;
  windowTotal += 1;
  if (id >= 0) {
    let allShortcuts = document.querySelectorAll("#shortcut");
    for (let i = 0; i < allShortcuts.length; i++) {
      allShortcuts[i].setAttribute("style", "width:60px; height:90px; border-color: rgba(0,0,255,0); border-style: double;");
    }
    $('[shortcutNumber=' + id + ']')[0].setAttribute("style", "width:60px; height:90px; background: rgba(0,128,255,0.5); border-color: rgba(0,0,255,0.33); border-style: double;");
  }
  switch (name) {
    case "IE":
      let IEWindow = new Window("Internet Explorer", windowTotal, "https://oldgoogle.neocities.org/2009/", "BubbleWindow.png", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(IEWindow)
      break;
    case "Paint":
      let paintWindow = new Window("Paint", windowTotal, "https://jspaint.app/", "Bold_and_Brash.webp", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(paintWindow);
      break;
    case "About":
      let aboutWindow = new Window("About", windowTotal, "about.html", "Q-Mark.webp", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(aboutWindow);
      break;
    case "Notepad":
      let noteWindow = new Window("Notepad", windowTotal, "Notepad.html", "WriteThatDown.png", "position:absolute; height: 20px; margin-right: 35px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(noteWindow)
      break;
      case "NotepadDoodle":
      let doodleWindow = new Window("Notepad", windowTotal, "Notepad.html", "WriteThatDown.png", "height: 20px; margin-right: 25px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(doodleWindow)

      break;
      case "Solitaire":
        let solitaireWindow = new Window("Solitaire", windowTotal, "https://www.freecell.io/game-frame/game/solitaire-windows-xp/", "windows-xp-games-v0-mimixjd9rwnc1.webp", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
        createWindowElement(solitaireWindow)
        break;
      case "Minesweeper":
      let mineWindow = new Window("Minesweeper", windowTotal, "https://pranx.com/minesweeper/", "MinesweeperIcon.webp", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(mineWindow)
      break;
      case "Pinball":
      let pinballWindow = new Window("Pinball", windowTotal, "https://98.js.org/programs/pinball/space-cadet.html", "PinballIcon.png", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(pinballWindow)
      break;
      case "Spider Solitaire":
      let spiderWindow = new Window("Spider Solitaire", windowTotal, "https://www.squidbyte.com/games/spidersolitairewindowsxp/", "Spider_Solitaire_WinXP.webp", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      createWindowElement(spiderWindow)
      break;
      case "WinAmp":
      let ampWindow = new Window("WinAmp", windowTotal, "I'm SpongeBob lmao.", "Winamp-logo.svg.png", "height: 20px; margin-right: 15px;-webkit-user-select: none; -ms-user-select: none;user-select: none;", "25%", "25%", false, false, "0px", "0px");
      
      if (!document.getElementById("webamp"))
      {
        createWinAmp(ampWindow)
      }
      break;
    case "Error":
      // Create resizable div element
      let resizableDiv = document.createElement("div");
      resizableDiv.setAttribute("id", "resizable");
      resizableDiv.setAttribute("style", "position:absolute; width: 250px; height: 150px;min-width: 250px; min-height:150px; max-width: 250px; max-height: 150px; left:calc(50% - 150px); top:calc(25% + 50px);");

      // Create inner div element
      let innerDiv = document.createElement('div');
      innerDiv.style.background = '#FFFFF0';
      innerDiv.style.width = '100%';
      innerDiv.style.height = '100%';

      // Create img element
      let img = document.createElement('img');
      img.setAttribute('src', 'error.png');
      img.style.width = '100px';
      img.style.position = 'absolute';
      img.style.marginLeft = '-15px';
      img.style.imageRendering = "pixelated";
      innerDiv.appendChild(img);

      // Create first paragraph element
      let firstParagraph = document.createElement('p');
      firstParagraph.innerText = 'Error';
      firstParagraph.style.position = 'absolute';
      firstParagraph.style.top = '-35px';
      firstParagraph.style.left = '5px';
      firstParagraph.style.color = 'black';
      firstParagraph.style.fontSize = '15px';
      innerDiv.appendChild(firstParagraph);

      // Create second paragraph element
      let secondParagraph = document.createElement('p');
      secondParagraph.innerHTML = 'C:/<br>Application not found';
      secondParagraph.style.position = 'absolute';
      secondParagraph.style.marginLeft = '75px';
      secondParagraph.style.marginTop = '37.5px';
      innerDiv.appendChild(secondParagraph);

      // Create button element
      let button = document.createElement('button');
      button.setAttribute('id', 'okButton');
      button.innerText = 'Ok';
      button.style.marginLeft = '80px';
      button.style.marginTop = '112px';
      button.style.width = '100px';
      button.onclick = function() {
        this.parentElement.parentElement.remove();
      };
      innerDiv.appendChild(button);

      resizableDiv.appendChild(innerDiv);

      // Append the created elements to the document body or any desired element
      document.body.appendChild(resizableDiv);
        boowomp.play();
      $(resizableDiv).resizable();
      $(resizableDiv).draggable({ containment: "body" });
      break;
    case "Secret Box":
      if (document.querySelector("#christmasShortcut").style.display == "block") {
        alert("There's nothing inside there anymore.");
      }
      else {
        let password = prompt("Password?");
        if (password == "B35T_FR13ND5_F0R3V3R") {
          alert("Correct password. A new file has been added to your computer.");
          document.querySelector("#christmasShortcut").style.display = "block";
        }
        else {
          alert("Incorrect password.");
          let resizableDiv = document.createElement("div");
          resizableDiv.setAttribute("id", "resizable");
          resizableDiv.setAttribute("style", "position:absolute; width: 250px; height: 150px;min-width: 250px; min-height:150px; max-width: 250px; max-height: 150px; left:calc(50% - 150px); top:calc(25% + 50px);");

          // Create inner div element
          let innerDiv = document.createElement('div');
          innerDiv.style.background = '#FFFFF0';
          innerDiv.style.width = '100%';
          innerDiv.style.height = '100%';

          // Create img element
          let img = document.createElement('img');
          img.setAttribute('src', 'error.png');
          img.style.width = '100px';
          img.style.position = 'absolute';
          img.style.marginLeft = '-15px';
          img.style.imageRendering = "pixelated";
          innerDiv.appendChild(img);

          // Create first paragraph element
          let firstParagraph = document.createElement('p');
          firstParagraph.innerText = 'Error';
          firstParagraph.style.position = 'absolute';
          firstParagraph.style.top = '-35px';
          firstParagraph.style.left = '5px';
          firstParagraph.style.color = 'black';
          firstParagraph.style.fontSize = '15px';
          innerDiv.appendChild(firstParagraph);

          // Create second paragraph element
          let secondParagraph = document.createElement('p');
          secondParagraph.innerHTML = 'Access Denied';
          secondParagraph.style.position = 'absolute';
          secondParagraph.style.marginLeft = '75px';
          secondParagraph.style.marginTop = '37.5px';
          innerDiv.appendChild(secondParagraph);

          // Create button element
          let button = document.createElement('button');
          button.setAttribute('id', 'okButton');
          button.innerText = 'Ok';
          button.style.marginLeft = '80px';
          button.style.marginTop = '112px';
          button.style.width = '100px';
          button.onclick = function() {
            this.parentElement.parentElement.remove();
          };
          innerDiv.appendChild(button);

          resizableDiv.appendChild(innerDiv);

          // Append the created elements to the document body or any desired element
          boowomp.play();
            document.body.appendChild(resizableDiv);
          $(resizableDiv).resizable();
          $(resizableDiv).draggable({ containment: "body" });
        }
      }
      break;
  }
}

function messageBeforeClose(windowID) {
  alert("Before it closes, here's a secret password for a secret something: B35T_FR13ND5_F0R3V3R");
  closeWindow(windowID);
}

//INTERNET EXPLORER FUNCTIONS BEGIN HERE
function search(windowID) {
  let windowDoc = $('[windowIndex=' + windowID + ']');
  let textBoxValue = windowDoc[0].querySelectorAll('[type="text"]')[0].value;
  if (textBoxValue.toLowerCase().includes("doodles4desktops.com"))
  {
    textBoxValue = "https://www.hylandtechclub.com";
  }
  //console.log(textBoxValue);
  if (isWebsite(textBoxValue)) {
    if (!textBoxValue.includes("https://")) {
      textBoxValue = "https://" + textBoxValue;
    }
    windowDoc[0].querySelector("iframe").src = textBoxValue;
    //internetWindowList[windowID].page += 1;
    //windowDoc[0].querySelectorAll('[type="text"]')[0].value = windowDoc[0].querySelector("iframe").src;
  }
  else {
    if (textBoxValue != "") {
      //internetWindowList[windowID].page += 1;
      windowDoc[0].querySelector("iframe").src = "https://oldgoogle.neocities.org/2009/search/?hl=en&source=hp&q=" + textBoxValue + "&btnG=Google+Search&aq=f&oq=&aqi=#gsc.tab=0&gsc.q=" + textBoxValue + "&gsc.page=1";
      //windowDoc[0].querySelectorAll('[type="text"]')[0].value = windowDoc[0].querySelector("iframe").src;

    }
  }
}
function isWebsite(str) {
  const websiteRegex = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}$/;
  return websiteRegex.test(str);
}

function webChange(windowID) {
  let windowDoc = $('[windowIndex=' + windowID + ']');
  windowDoc[0].querySelectorAll('[type="text"]')[0].value = windowDoc[0].querySelector("iframe").src;
  let windowClass = internetWindowList[windowID];
  if (!windowClass.backForwardRefreshPressed) {
    if (windowClass.page < windowClass.history.length - 1) {
      windowClass.history.splice(windowClass.page, windowClass.history.length - windowClass.page);
    }
    windowClass.page += 1;
    console.log(windowDoc[0].querySelector("iframe").src);
    windowClass.history.push(windowDoc[0].querySelector("iframe").src);
  }
  if (windowClass.page > 0) {
    //console.log(windowClass.page)
    windowDoc[0].querySelector("#goBack").removeAttribute("disabled");
  }
  if (windowClass.page < windowClass.history.length - 1) {
    windowDoc[0].querySelector("#goForward").removeAttribute("disabled");
  }
  windowDoc[0].querySelector("#refresh").removeAttribute("disabled");
  if (windowDoc[0].querySelector("iframe").src.includes("oldgoogle")) {

    windowDoc[0].querySelectorAll('[type="text"]')[0].value = windowDoc[0].querySelector("iframe").src.replace("oldgoogle.neocities.org/2009", "google.com");
  }
  windowClass.backForwardRefreshPressed = false;
}
function goBack(windowID) {
  internetWindowList[windowID].backForwardRefreshPressed = true;
  console.log(windowID)
  internetWindowList[windowID].page -= 1;
  let windowDoc = $('[windowIndex=' + windowID + ']');
  console.log(internetWindowList[windowID].history);
  windowDoc[0].querySelector("iframe").src = internetWindowList[windowID].history[internetWindowList[windowID].page];
  windowDoc[0].querySelector("#goBack").setAttribute("disabled", "");
  windowDoc[0].querySelector("#goForward").setAttribute("disabled", "");
  windowDoc[0].querySelector("#refresh").setAttribute("disabled", "");
}
function goForward(windowID) {
  internetWindowList[windowID].backForwardRefreshPressed = true;
  //console.log(internetWindowList[windowID].page)
  internetWindowList[windowID].page += 1;
  let windowDoc = $('[windowIndex=' + windowID + ']');
  windowDoc[0].querySelector("iframe").src = internetWindowList[windowID].history[internetWindowList[windowID].page];
  windowDoc[0].querySelector("#goBack").setAttribute("disabled", "");
  windowDoc[0].querySelector("#goForward").setAttribute("disabled", "");
  windowDoc[0].querySelector("#refresh").setAttribute("disabled", "");

}
function refresh(windowID) {
  internetWindowList[windowID].backForwardRefreshPressed = true;
  let windowDoc = $('[windowIndex=' + windowID + ']');
  windowDoc[0].querySelector("iframe").src = windowDoc[0].querySelector("iframe").src;
}
//INTERNET EXPLORER FUNCTIONS END HERE

//$( "#window" ).resizable();
//$( "#window" ).draggable({ containment: "body" });
/*const iframe = document.getElementById('window');
let isResizing = false;
let isDragging = false;
let offsetX, offsetY;
iframe.contentDocument.addEventListener('mousemove', (e) => {
  if (isResizing) {
    resizeIframe(e);
  }
  if (isDragging) {
    dragIframe(e);
  }
});
iframe.contentDocument.addEventListener('mouseup', () => {
  isResizing = false;
  isDragging = false;
});
iframe.contentDocument.addEventListener('mousedown', (e) => {
  const rect = iframe.getBoundingClientRect();
  const offsetXResize = 20;
  const offsetYResize = 20;
  if (e.offsetX > rect.width - offsetXResize && e.offsetY > rect.height - offsetYResize) {
    isResizing = true;
  } else {
    isDragging = true;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  }
});
function resizeIframe(e) {
  const rect = iframe.getBoundingClientRect();
  iframe.style.width = `${e.clientX - rect.left}px`;
  iframe.style.height = `${e.clientY - rect.top}px`;
}
function dragIframe(e) {
  iframe.style.left = `${e.clientX - offsetX}px`;
  iframe.style.top = `${e.clientY - offsetY}px`;
}
*/

function updateTime() {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let AMPM = "AM";
  if (hours >= 12) {
    AMPM = "PM";
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  document.querySelector("#time").textContent = hours + ":" + minutes + " " + AMPM;

  requestAnimationFrame(updateTime);
}

updateTime();
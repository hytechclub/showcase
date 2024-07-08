async function speak(message) {
  let ttsUrl = `https://tiktok-tts.weilnet.workers.dev/api/generation`;
  let body = {
    text: message,
    voice: 'en_us_rocket'
  }

  try {
    let response = await fetch(ttsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    let responseJson = await response.json();
    let audioUrl = `data:audio/wav;base64,${responseJson.data}`;
    let audio = new Audio(audioUrl);

    setTimeout(() => audio.play(), 1000);

  } catch (e) {
    alert(e);
    return;
  }
}

function randomColorVal() {
  return Math.floor(Math.random() * 256);
}

async function run() {
  let catPic = document.querySelector("#cat-pic");
  catPic.src = "https://media.tenor.com/o8m3bKTsifUAAAAM/hold-on.gif";

  let messageInput = document.querySelector("#cat-message");
  let message = messageInput.value;

  let r = randomColorVal();
  let g = randomColorVal();
  let b = randomColorVal();

  catPic.src = `https://cataas.com/cat/says/${message}?fontSize=50&fontColor=white&filter=custom&r=${r}&g=${g}&b=${b}`;

  await speak(message);
}

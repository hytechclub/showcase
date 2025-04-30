function takeInput() {
  let inputTextElement = $("#text");
  let inputText = inputTextElement.val();
  let newParagraph = $("<p></p>");
  newParagraph.text(inputText);

  /* 🔑 the answer to question four is: amongus */
  
  $("#messages").prepend(newParagraph);
  inputTextElement.val("");
}

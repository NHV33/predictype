function newElement(tag, attrs, parent) {
  const newElem = document.createElement(tag);
  parent = parent ? parent : document.body;
  parent.append(newElem);
  for (const key in attrs) {
    newElem.setAttribute(key, attrs[key])
  }
  return newElem
}

// const wordChoiceBox = document.getElementById("word-choice-box")
let choiceIndex = 0;
let selectedWord = "";

const textareaBox = newElement("div");

const inputField = newElement("textarea", {style: "min-width: 90vw; margin-bottom: 15px;"}, textareaBox);
// document.body.append(inputField);
// inputField.textContent = "_";

const preventDefKeys = ["F1", "F2", "F4", "ArrowUp", "ArrowDown"];

document.addEventListener("keydown", (event) => {
  console.log("event.key: ", event.key);
  if (preventDefKeys.includes(event.key)) {
    event.preventDefault();
  }
  handleKeyPress(event.key);
});

function handleKeyPress(key) {
  keyTest.textContent = key;
  switch (key) {
    case "F4":
      clearInput();
      toggleVisibleById("dialpad");
      break;
    case "F2":
      copyToClipboard();
      break;
    case "ArrowUp":
      selectChoice("prev");
      break;
    case "ArrowDown":
      selectChoice("next");
      break;
    default:
      break;
  }
}

const wordChoiceBox = newElement("div", {id:"word-choice-box", class:"word-choice-box"})

inputInterceptor = document.createElement("input");
document.body.append(inputInterceptor);
inputInterceptor.textContent = "Input Test";

inputInterceptor.select();

function popByVal(list, value) {
  var index = list.indexOf(value);
  if (index !== -1) {
    list.splice(index, 1);
  }
  return list;
}

// function sortedWords(wordArray) {
//   const wordsInFreqList = [];
//   wordsByFreq.forEach(word => {
//     if (wordArray.includes(word)) {
//       wordsInFreqList.push(word);
//       popByVal(wordArray, word)
//     }
//   });
//   return wordsInFreqList.concat(wordArray)
// }

function lookupWords() {
  if (!inputBuffer) {
    clearInput();
    return
  }
  const wordArray = allWords[inputBuffer];
  if (wordArray) {
    populateChoiceBox(wordArray);
  }
}

function populateChoiceBox(wordArray) {
  wordChoiceBox.textContent = "";
  wordArray.forEach(word => {
    const newOption = newElement("div", {}, wordChoiceBox);
    newOption.textContent = word;
  });
  if (wordArray.length > 0) {
    selectChoice("start");
  }
  // choiceIndex = 0;
  // wordChoiceBox.firstChild.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

function offsetIndex(list, current, offset) {
  let newIndex = current + offset;
  if (newIndex >= 0 && newIndex < list.length) {
    return newIndex
  } else if (newIndex >= 0) {
    return newIndex % list.length
  } else if (newIndex < 0) {
    return list.length - (Math.abs(newIndex) % list.length)
  }
}

function selectChoice(operation) {
  if (wordChoiceBox.children.length < 1) { return }
  console.log(wordChoiceBox.childNodes);
  switch (operation) {
    case "start":
      choiceIndex = 0;
      break;
    case "end":
      choiceIndex = wordChoiceBox.children.length - 1;
      break;
    case "prev":
      choiceIndex = offsetIndex(wordChoiceBox.children, choiceIndex, -1);
      break;
    case "next":
      choiceIndex = offsetIndex(wordChoiceBox.children, choiceIndex, 1);
      break;
    default:
      choiceIndex = 0;
      break;
  }
  const selectedChoice = wordChoiceBox.childNodes[choiceIndex];
  selectedChoice.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  wordChoiceBox.childNodes.forEach(choice => {
    choice.className = "";
  });
  selectedChoice.className = "selected-choice";
  selectedWord = selectedChoice.textContent;
  inputInterceptor.focus();
}

inputInterceptor.addEventListener("input", (event) => {
  const inputChar = inputInterceptor.value;
  inputInterceptor.value = "";
  handleInput(inputChar);
});

let inputBuffer = "";

function handleInput(inputChar) {
  if ("23456789".includes(inputChar)) {
    inputBuffer += inputChar;
    lookupWords();
  } else if (inputChar === " ") {
    confirmWord(selectedWord);
  } else if (inputChar === "*") {
    modifyPrevWord(toggleCase);
  } else if (inputChar === "1") {
    performBackspace();
  } else if (inputChar === "#") {
    showPunctuationOptions();
  }
  renderInputWords();
}

const placeholderize = (text, placeholderChar = "_") => placeholderChar.repeat(text.length);

function showPunctuationOptions() {
  // TODO: "paginate" symbol list with repeated keypresses
  // store an index of the current page, then reset upon input confirmation
  const punctuationAndSymbols = [
    ".", "?", "!", ",", ";", ":", "'", "\"", "/", "\\", "&", "@", "#", "$",
    "%", "^", "*", "(", ")", "[", "]", "{", "}"
  ];
  populateChoiceBox(punctuationAndSymbols);
}

function performBackspace() {
  if (inputBuffer.length > 0) {
    inputBuffer = inputBuffer.slice(0, inputBuffer.length - 1);
    lookupWords();
  } else if (inputBuffer.length < 1 && inputWordsArray.length > 0) {
    inputWordsArray = inputWordsArray.slice(0, inputWordsArray.length - 1);
  }
  renderInputWords();
}

function modifyPrevWord(modify) {
  if (inputWordsArray.length < 1) { return }
  const finalIndex = indexOfFinalWord();
  const finalWord = inputWordsArray[finalIndex];
  inputWordsArray[finalIndex] = modify(finalWord);
  renderInputWords();
}

function indexOfFinalWord() {
  for (let i = inputWordsArray.length -1; i >= 0; i--) {
    const word = inputWordsArray[i];
    if (!["", " "].includes(word)) {
      return i
    }
  }
}

function toggleCase(text) {
  // TODO: add quote / parenthesis wrapping?
  const firstLetter = text.slice(0, 1);
  const allCAPS = (text.toUpperCase() === text);
  const capitalized = (!allCAPS && firstLetter.toUpperCase() === firstLetter)
  if (capitalized && !allCAPS) {
    return text.toUpperCase()
  } else if (allCAPS) {
    return text.toLowerCase()
  } else {
    return firstLetter.toUpperCase() + text.slice(1)
  }
}

const prevWord = () => inputWordsArray.length > 0 ? inputWordsArray[inputWordsArray.length - 1] : "";

let inputWordsArray = []

function confirmWord(word) {
  word = word === "" ? " " : word;
  inputWordsArray.push(word);
  // addSpace(word);
  renderInputWords();
  clearInput();
}

function addSpace() {
  // const prefix = word.length > 1 && inputWordsArray.length > 1 ? " " : "";
  const prev = prevWord();
  if (prev.length > 1 || ["i", "a"].includes(prev.toLowerCase())) {
    inputWordsArray.push(" ");
  }
}

function renderInputWords() {
  inputField.value = "";
  inputWordsArray.forEach(word => {
    inputField.value += word;
  });
  // inputField.value += ` ${placeholderize(inputBuffer)}`;
  inputField.value += `${inputBuffer}`;
  // console.log("inputWordsArray: ", inputWordsArray);
  inputField.scrollTop = inputField.scrollHeight;
  inputInterceptor.focus();
}

const cursorChar = "▏";

function blinkCursor() {
  if (inputField.value.includes(cursorChar)) {
    inputField.value = inputField.value.replace(cursorChar, "");
  } else {
    inputField.value += cursorChar;
  }
}

setInterval(() => {
  blinkCursor();
}, 777);

function clearInput() {
  selectedWord = "";
  choiceIndex = 0;
  inputBuffer = "";
  populateChoiceBox([]);
}

function fetchJSON(url, updateFunction) {
  fetch(url)
    .then(function (promise) {
      return promise.json();
    })
    .then(function (data) {
      updateFunction(data);
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}

let allWords;
let wordsByFreq;
fetchJSON("num_words_superior.json", (data) => {allWords = data});
// fetchJSON("words_by_freq.json", (data) => {wordsByFreq = data});

const buttonGroups = ["", "@", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz", ""]
const dialpad = newElement("div", {id: "dialpad", style: "position: fixed; left: 10px; bottom: 10px; user-select: none; margin-top: 20px; display: flex; flex-wrap: wrap; width: 170px; min-height: 170px;"})
for (let i = 1; i < 10; i++) {
  const button = newElement("div", {style: "background-color: white; border: solid 1px black; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 50px; min-height: 50px;"}, dialpad)
  const buttonNum = newElement("h3", {style: "margin: 0px;"}, button);
  buttonNum.textContent = i;
  const buttonLabel = newElement("h4", {style: "margin: 0px;"}, button);
  buttonLabel.textContent = buttonGroups[i];
  button.addEventListener("click", () => {
    handleInput(buttonNum.textContent);
    inputInterceptor.focus();
  });
}

toggleVisibleById("dialpad");

function toggleVisibleById(elementId) {
  const element = document.getElementById(elementId);
  if (element.style.visibility === "hidden") {
    element.style.visibility = null;
  } else {
    element.style.visibility = "hidden";
  }
}


function copyToClipboard() {
  inputField.select();
  try {
    document.execCommand('copy');
    keyTest.textContent = 'Copied text!';
  } catch (err) {
    keyTest.textContent = 'Unable to copy text';
    console.error('Unable to copy text', err);
  }
}

const copyButton = newElement("button");
copyButton.textContent = "Copy to Clipboard";
copyButton.addEventListener("click", () => {
  copyToClipboard();
});

keyTest = document.createElement("h4");
document.body.append(keyTest);
keyTest.textContent = "Key Test";

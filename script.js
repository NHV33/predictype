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

keyTest = document.createElement("h4");
document.body.append(keyTest);
keyTest.textContent = "Key Test";

const textareaBox = newElement("div");

const inputField = newElement("textarea", {style: "min-width: 90vw; margin-bottom: 15px;"}, textareaBox);
// document.body.append(inputField);
// inputField.textContent = "_";

const preventDefKeys = ["F1"];

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
    case "F1":
      clearInput();
      toggleVisibleById("dialpad");
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

inputInterceptor.focus();

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

function lookupWord(numString) {
  console.log(numString)
  const wordArray = allWords[numString];
  console.log("wordArray: ", wordArray);
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
  if (!wordChoiceBox.hasChildNodes) { return }
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
}

inputInterceptor.addEventListener("input", (event) => {
  const inputChar = inputInterceptor.value;
  inputInterceptor.value = "";
  handleInput(inputChar);
});

let inputBuffer = "";

function handleInput(inputChar) {
  if (inputChar === " ") {
    keyTest.textContent = "space detected";
    confirmWord(selectedWord);
  } else {
    inputBuffer += inputChar;
    lookupWord(inputBuffer);
  }
}

function confirmWord(word) {
  if (!wordChoiceBox.hasChildNodes) { return }
  inputField.value += ` ${word}`;
  clearInput();
}

function clearInput() {
  selectedWord = "";
  choiceIndex = 0;
  inputBuffer = "";
  populateChoiceBox([]);
}

// async function fetchWords() {
//   let promise = await fetch("words.json");
//   let data = await promise.json();
//   allWords = data;
//   wordTest.textContent = data.join(", ");
// }

// function fetchWords() {
//   fetch("num_words.json")
//     .then(function (promise) {
//       return promise.json();  // Convert the response to JSON
//     })
//     .then(function (data) {
//       allWords = data;  // Assign data to `allWords`
//       wordTest.textContent = String(data['97683']);  // Update the content of `wordTest`
//     })
//     .catch(function (error) {
//       console.error('Error:', error);  // Handle any errors that occur
//     });
// }

function fetchJSON(url, updateFunction) {
  fetch(url)
    .then(function (promise) {
      return promise.json();  // Convert the response to JSON
    })
    .then(function (data) {
      updateFunction(data);
    })
    .catch(function (error) {
      console.error('Error:', error);  // Handle any errors that occur
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

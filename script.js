wordTest = document.createElement("h1");
document.body.append(wordTest);
wordTest.textContent = "himom";

keyTest = document.createElement("h1");
document.body.append(keyTest);
keyTest.textContent = "Key Test";

inputTest = document.createElement("h1");
document.body.append(inputTest);
inputTest.textContent = "_";

document.addEventListener("keydown", (event) => {
  console.log("event.key: ", event.key);
  keyTest.textContent = event.key;
  if (event.key === "ArrowUp") {
    inputTest.textContent = "_";
  }
});

phoneInputTest = document.createElement("input");
document.body.append(phoneInputTest);
phoneInputTest.textContent = "Input Test";

phoneInputTest.focus();

function popByVal(list, value) {
  var index = list.indexOf(value);
  if (index !== -1) {
    list.splice(index, 1);
  }
  return list;
}

function sortedWords(wordArray) {
  const wordsInFreqList = [];
  wordsByFreq.forEach(word => {
    if (wordArray.includes(word)) {
      wordsInFreqList.push(word);
      popByVal(wordArray, word)
    }
  });
  return wordsInFreqList.concat(wordArray)
}

function lookupWord(numString) {
  console.log(numString)
  const wordArray = allWords[numString];
  console.log("wordArray: ", wordArray);
  if (wordArray) {
    // wordTest.textContent = sortedWords(wordArray).join(", ")
    wordTest.textContent = wordArray.join(", ")
  }
}

phoneInputTest.addEventListener("input", (event) => {
  inputTest.textContent += phoneInputTest.value;
  phoneInputTest.value = "";
  lookupWord(inputTest.textContent.replace("_", ""));
});

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
fetchJSON("num_words.json", (data) => {allWords = data});
// fetchJSON("words_by_freq.json", (data) => {wordsByFreq = data});

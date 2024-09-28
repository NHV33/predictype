wordTest = document.createElement("textarea");
document.body.append(wordTest);
wordTest.textContent = "himom";

inputTest = document.createElement("h1");
document.body.append(inputTest);
inputTest.textContent = "Input Test";

async function fetchWords() {
  let promise = await fetch("words.json");
  let data = await promise.json();
  allWords = data;
  wordTest.textContent = data.join(", ");
  // let word_array = await promise.json()
  // return word_array
}

let allWords = [];
fetchWords();

document.addEventListener("keydown", (event) => {
  console.log("event.key: ", event.key);
  inputTest.textContent = event.key
});

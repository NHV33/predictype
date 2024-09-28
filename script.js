test = document.createElement("textarea");
document.body.append(test);
test.textContent = "himom";

async function fetchWords() {
  let promise = await fetch("words.json");
  let data = await promise.json();
  allWords = data;
  test.textContent = data.join(", ");
  // let word_array = await promise.json()
  // return word_array
}

let allWords = [];
fetchWords();

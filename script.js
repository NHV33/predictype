wordTest = document.createElement("textarea");
document.body.append(wordTest);
wordTest.textContent = "himom";

inputTest = document.createElement("h1");
document.body.append(inputTest);
inputTest.textContent = "Input Test";

// async function fetchWords() {
//   let promise = await fetch("words.json");
//   let data = await promise.json();
//   allWords = data;
//   wordTest.textContent = data.join(", ");
// }

function fetchWords() {
  fetch("words.json")
    .then(function (promise) {
      return promise.json();  // Convert the response to JSON
    })
    .then(function (data) {
      allWords = data;  // Assign data to `allWords`
      wordTest.textContent = data.join(", ");  // Update the content of `wordTest`
    })
    .catch(function (error) {
      console.error('Error:', error);  // Handle any errors that occur
    });
}

let allWords = [];
fetchWords();

document.addEventListener("keydown", (event) => {
  console.log("event.key: ", event.key);
  inputTest.textContent = event.key
});

### Live Demo
PredicType: 
[https://nhv33.github.io/predictype/](https://nhv33.github.io/predictype/)

### Description
This is simple interface that I designed for use on my "dumbphone," since it lacks a predictive style of text input and requires multiple
button presses for most letters (e.g., inputting the letter "s" requires pressing the `7` key four times!).

It loads a JSON file containing a hash of number sequences and the words to which they correspond.
The word arrays are sorted in order of frequency for maximum utility
(e.g., an extremely common word like "the" will appear before a less common one like "theta").

My phone's internet browser does not register dial pad inputs as key presses, so I had to intercept the inputs via a textbox (beneath the text area).

Additionally, the browser is quite out of date, so all code is ES5 compliant.

### Desktop Usage

Press `F4` to display a dial pad for testing this interface on a desktop environment.

### General Usage

Once the "intercept" textbox has been selected and the phone is in number input mode, it is possible to begin typing a word with the number keys.

After one or more dial key presses, and array of input options will appear above the "intercept" box.

Scroll through options by pressing the equivalent of `ArrowUp` or `ArrowDown` on your device, then confirm a selection by inputting the space key.

Pressing `1` will perform a backspace.

Pressing `*` will toggle capitalization.

Pressing `#` will provide punctuation input options.

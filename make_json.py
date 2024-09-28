import json

with open("mit_wordlist_10000.txt", "r", encoding="utf8") as s:
    content = s.read()

words = content.split("\n")[:-1]
# json_obj = json.loads(content)

button_groups = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]

_abc = [chr(i) for i in range(97, 97 + 26)]
_ABC = [ch.upper() for ch in _abc]

let2num = {}
for ch in _abc:
    for i, group in enumerate(button_groups):
        if ch in group:
            let2num[ch] = str(i + 2)


def word2num(word):
    text = ""
    for ch in word:
        num = let2num[ch]
        if num is not None:
            text += num
    return text

num2words = {}

for word in words:
    num_string = word2num(word)
    num2words.setdefault(num_string, [])
    num2words[num_string].append(word)

from pprint import pprint

pprint(num2words)


with open("words.json", "w", encoding="utf8") as o:
    o.write(json.dumps(words))

with open("num_words.json", "w", encoding="utf8") as o:
    o.write(json.dumps(num2words))

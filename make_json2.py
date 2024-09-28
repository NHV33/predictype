import json

with open("reduced_unigram_freq.txt", "r", encoding="utf8") as s:
    content = s.read()

words = content.split("\n")[:-1]
# words = words[:len(words) // 10]  # limit size for testing

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

nums_by_freq = [ f"{word2num(word)}*{word}" for word in words ]

num2words = {}

for word in words:
    num_string = word2num(word)
    num2words.setdefault(num_string, [])
    num2words[num_string].append(word)

dict_len = len(num2words)
key_index = 0

for num_key in num2words:
    most_freq = []
    for num_word_pair in nums_by_freq:
        # ex num_word_pair: '222*aaa'
        if num_word_pair[:len(num_key)] == num_key:
            word = num_word_pair.split("*")[1]
            if word not in most_freq:
                most_freq.append(word)
                if len(most_freq) >= 3:
                    break
    existing_words = num2words[num_key]
    for word in existing_words:
        if word not in most_freq:
            most_freq.append(word)

    num2words[num_key] = most_freq

    if key_index % 1000 == 0:
        print(f"Processed {key_index} of {dict_len}")
    key_index += 1

# from pprint import pprint

# pprint(num2words)


# with open("words.json", "w", encoding="utf8") as o:
#     o.write(json.dumps(words))

with open("num_words_superior.json", "w", encoding="utf8") as o:
    o.write(json.dumps(num2words))

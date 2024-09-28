import json

with open("mit_wordlist_10000.txt", "r", encoding="utf8") as s:
    content = s.read()

words = content.split("\n")[:-1]
# json_obj = json.loads(content)

from pprint import pprint

pprint(words)

with open("words.json", "w", encoding="utf8") as o:
    o.write(json.dumps(words))

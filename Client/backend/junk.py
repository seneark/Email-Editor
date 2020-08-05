import json
with open("data.json") as json_file:
    data = json.load(json_file)

(data["people"].append({
    "name": "Timmy"
}))

with open('data.txt', 'w') as outfile:
    json.dump(data, outfile)

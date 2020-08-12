from flask import Flask, jsonify, request
from flask import json
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import pickle5 as pickle
import json

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

data = {}
pentaData = {}


@app.route('/api/import/')
@cross_origin()
def import_data():
    global pentaData
    global data
    with open('data.p', 'rb') as fp:
        data = pickle.load(fp)
    with open('pentagram81.p', 'rb') as fp:
        pentaData = pickle.load(fp)
    json = {
        "name": "imported the predictions",
        "error": "No error",
    }
    return jsonify(json)


@app.route('/api/predict/', methods=['POST'])
@cross_origin()
def prediction():
    global data
    global pentaData
    textInput = []
    obj = request.get_json(silent=True)
    obj["input"] = obj["input"][0:obj["caretPos"]]
    # print(obj["input"])
    # print(obj)
    obj["input"] = obj["input"].lower()
    if obj["input"].count(".") == len(obj["input"].split(".\n")):
        textInput.append("None")
        textInput.append("None")
    else:
        obj["input"] = obj["input"].split(".")
        textInput.append("None")
        textInput.append("None")
        textInput = textInput + \
            (obj["input"][len(obj["input"]) - 1].split(" "))
    # results = data[textInput[-3], textInput[-2]]
    textInput = textInput[-3:-1]
    predictedWords = []
    try:
        results = data[(textInput[0], textInput[1])]
        for i in range(len(results)):
            if results[i][0].isalpha() and len(results[i][0]) > 2:
                predictedWords.append(results[i][0])
    except:
        predictedWords = ["the", "this", "that"]
    try:
        predictedPentagram = []
        result = pentaData[(textInput[0], textInput[1])]
        for i in range(len(result)):
            predictedPentagram.append(str(result[i][0]))
            # print(result[i][0])
        print(predictedPentagram)
    except :
        predictedPentagram = [""]
    return {
        "input": str(textInput),
        "results": predictedWords,
        "sentence": predictedPentagram
    }


@app.route('/api/saveDraft/', methods=['POST'])
@cross_origin()
def saveDraft():
    obj = request.get_json(silent=True)
    with open('../Views/data.json') as json_file:
        Data = json.load(json_file)
    Data.append(obj)
    try:
        with open('../Views/data.json', 'w') as outfile:
            json.dump(Data, outfile)
        return {
            "msg": "Successfully added"
        }
    except:
        return {
            "msg": "Failed to add"
        }


@app.route('/api/deleteDraft/', methods=['GET'])
@cross_origin()
def deleteDraft():
    Id = request.args.get("id")
    with open('../Views/data.json') as json_file:
        Data = json.load(json_file)
    del Data[int(Id)]
    try:
        with open('../Views/data.json', 'w') as outfile:
            json.dump(Data, outfile)
        return {
            "msg": "Successfully deleted"
        }
    except:
        return {
            "msg": "Failed to delete"
        }


@app.route('/404')
def error():
    print("error")
    return "ERROR not found", 404


if __name__ == "__main__":
    app.run(host='192.168.1.4', debug=True)
    # app.run(debug=True)

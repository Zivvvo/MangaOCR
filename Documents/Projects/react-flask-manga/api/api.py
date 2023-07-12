from flask import Flask, render_template
from flask import jsonify
from flask import redirect, url_for, request
from flask_cors import CORS, cross_origin
import time
import requests
import os

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class Cache():
    search_results = None
    selected_manga = None
    selected_page = None

stored_data = Cache()



@app.route('/time')
@cross_origin()
def get_current_time():
    
    return {'time': time.time()}

@app.route('/getImage')
@cross_origin()
def get_image():
    id = request.args.get('id')
    url = os.path.join('https://api.consumet.org/manga/mangadex/info/',id)

    response = requests.get(url)
    data = response.json()

    #print(data["image"])

    return jsonify(url=data["image"])



@app.route('/search', methods = ["GET"])
@cross_origin()
def get_browse_results():
    title = str(request.args.get('title'))
    page = str(request.args.get('page'));

    url = os.path.join('https://api.consumet.org/manga/mangadex/',title+"?"+"page="+page)
    
    response = requests.get(url)

    data = response.json()

    return jsonify(data=data["results"], page = data["currentPage"])

@app.route('/info', methods = ["GET"])
@cross_origin()
def get_info():
    id = str(request.args.get('id'))

    print(id)

    url = os.path.join('https://api.consumet.org/manga/mangadex/info', id).replace("\\","/")

    #print(url)

    response = requests.get(url)

    data = response.json()

    #print(data["description"])

    return jsonify(title = data["title"], chapters=data["chapters"], description = data["description"]["en"], genres = data["genres"], image = data["image"])

@app.route("/read", methods = ["GET"])
@cross_origin()
def get_pages():
    
    id = str(request.args.get('id'))

    #print(id)

    url = os.path.join('https://api.consumet.org/manga/mangadex/read', id).replace("\\","/")


    response = requests.get(url)

    data = response.json()

    #print(data)

    return jsonify(imgs = data)


import csv

reader = csv.reader(open('resources/languages.csv', 'r'))
lang_dict = {}
for row in reader:
   k, v = row
   lang_dict[k] = v


@app.route("/scan", methods = ["GET"])
@cross_origin()
def scan():
    img = request.args.get('img')
    curr_lang = request.args.get('from')
    to_lang = request.args.get('to')

    print(lang_dict[curr_lang])

    print(img)

    
    url = "https://api.ocr.space/parse/image"

    payload = {'language': lang_dict[curr_lang],
    'isOverlayRequired': 'true',
    'url': img,
    'iscreatesearchablepdf': 'false',
    'issearchablepdfhidetextlayer': 'false'}
    files=[

    ]
    headers = {
    'apikey': 'K86896070688957'
    }


    response = requests.request("POST", url, headers=headers, data=payload, files=files)

    print(response.json())

    #perform clustering on lines that are close together, put into one LineText

    

    return jsonify(results = response.json())



if __name__ == "__main__":
    app.run(debug = True)


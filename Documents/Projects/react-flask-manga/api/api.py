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

    print(data["image"])

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

    print(url)

    response = requests.get(url)

    data = response.json()

    print(data["description"])

    return jsonify(title = data["title"], chapters=data["chapters"], description = data["description"]["en"], genres = data["genres"], image = data["image"])


@app.route("/", methods = ["POST","GET"])
def home():
    if request.method == 'POST':
      query = request.form['nm']
      url = os.path.join("https://api.consumet.org/manga/mangadex", query).replace("\\","/")
      print(url)
      response = requests.get(url)
      data = response.json()

      stored_data.search_results = data

      return redirect(url_for('success'))
    else:
        return render_template("home.html")

@app.route('/success')
def success():
    #render Manga Pages from search tool
    #print(stored_data.search_results)
    return render_template("success.html", data = stored_data.search_results)


@app.route("/search2")
def search():
    return "search engine"

@app.route("/select", methods=['GET'])
def select():
    args = request.args

    url = "https://api.consumet.org/manga/mangadex/info/"+ args.get("id")
    
    print(url)

    response = requests.get(url)
    data = response.json()

    stored_data.selected_manga = data

    print(data)

    return render_template("select.html", data = stored_data.selected_manga)


@app.route("/about", methods= ["GET"])
def about():
    return render_template("about.html")

@app.route("/read", methods=["GET"])
def read():

    args = request.args

    url = "https://api.consumet.org/manga/mangadex/read/"+ args.get("id")
    response = requests.get(url)
    data = response.json()

    stored_data.selected_page = data

    return render_template("read.html", data = enumerate(data), data2 = data)


if __name__ == "__main__":
    app.run(debug = True)


import json
from sklearn.cluster import OPTICS
import numpy as np
from sklearn.neighbors import NearestNeighbors
from matplotlib import pyplot as plt
 

class Clusterer():

    def __init__(self, json_data):

        self.json_data = json_data

        self.data = dict()

        for line in json_data["ParsedResults"][0]["TextOverlay"]["Lines"]:
            self.data[line["LineText"]] = (line["Words"][0]['Left'], line['MinTop'])
        
        coords = list(self.data.values())
        self.X = np.array(coords)

        self.model = None

    def generate_model(self):
        neighbors = NearestNeighbors(n_neighbors=2)
        neighbors_fit = neighbors.fit(self.X)
        distances, indices = neighbors_fit.kneighbors(self.X)

        distances = np.sort(distances, axis=0)
        print(distances)
        distances = distances[:,1]
        plt.plot(distances)

        eps = Clusterer.find_max_slope_index(distances)

        self.model = OPTICS(eps=eps, min_samples=2)
    
    def fit(self):
        if (self.model != None):
            self.model.fit(self.X)
        else:
            raise ValueError("Model has not been provided")
    
    def getResults(self):
        #finish this shit
        results = self.json_data.copy()





    
    def slope(x, y):
        return abs(x-y)

    def find_max_slope_index(l):
        curr = 0
        index = 0
        for i in range(len(l)-1):
            if (Clusterer.slope(l[i],l[i+1]) > curr):
                index = i
            curr = max(curr, Clusterer.slope(l[i],l[i+1]))
        return l[i]
    
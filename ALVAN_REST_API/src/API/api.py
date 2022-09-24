from cgitb import reset
from urllib import response
from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
# import machine_learning.TTW as ML_model
from requestors.weather_requestor import requestor as weather_requestor
import requestors.named_entity_extractor as NEE
import json

app = Flask(__name__)
app.config.SERVER_NAME = "flask-api:5001"
api = Api(app)
CORS(app)


class HelloWorld(Resource):
  def get(self):
    return {"data": "Hello World"}

#TODO get tensorflow working on M1 chip
class ALVAN(Resource):
  def post(self):
    tts_response = ''
    print(request)
    if request.form['query']:
      #TODO get tts response from ML training set
      print(request.form['query'])
      print(ML_model.query(request.form['query']))
      tts_response = ML_model.query(request.form['query'])
      named_entities = NEE.request(request.form['query'])['result']
    return {"tts_cd": tts_response, "named_entities": named_entities}

class Weather(Resource):
  def get(self, location):
    response = weather_requestor(location).json()
    return response

api.add_resource(HelloWorld, '/helloworld')
api.add_resource(ALVAN, '/alvan/api/query')
api.add_resource(Weather, '/alvan/api/weather/<location>')

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True, port=5001)
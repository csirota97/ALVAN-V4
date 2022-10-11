from cgitb import reset
from urllib import response
from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
# import machine_learning.TTW as ML_model
from requestors.weather_requestor import requestor as weather_requestor
import requestors.named_entity_extractor as NEE
import json
from mysqlConnection import Connector

app = Flask(__name__)
app.config.SERVER_NAME = "flask-api:5001"
api = Api(app)
CORS(app)

#TODO replace localhost with remote DB once we figure that out
db = Connector('localhost', 'root', '')

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
      # print(ML_model.query(request.form['query']))
      # tts_response = ML_model.query(request.form['query'])
      named_entities = NEE.request(request.form['query'])['result']
    return {"tts_cd": tts_response, "named_entities": named_entities}

class Weather(Resource):
  def get(self, location):
    response = weather_requestor(location).json()
    return response

class ToDoID(Resource):
  def get(self, table, id):
    response = {"error": 404}

    if table.lower() == 'lists':
      if int(id) == -1:
        response = {'lists': db.getLists(-1).result}
      else:
        response = {'lists': db.getLists(int(id)).result}
    elif table.lower() == 'events':
      response = {'events': db.getEvents(int(id)).result}

    return response

  def put(self, table, id):
    response = {"error": 404}

    if table.lower() == 'event':
      print(id, request.json['completed'])
      response = {'event': db.updateEvent(id, str(request.json['completed'])).result}

    return response


class ToDo(Resource):
  def post(self, table):
    response = {"error": 404}

    if table.lower() == 'list':
      response = {'lists': db.newList(request.form['ownerId'],request.form['calendarId'],request.form['listName']).result}
    elif table.lower() == 'event':
      print("hit", request.form)
      response = {'events': db.newEvent(request.form['listId'], request.form['description'], request.form['completed']).result}

    return response

api.add_resource(HelloWorld, '/helloworld')
# api.add_resource(ALVAN, '/alvan/api/query')
api.add_resource(Weather, '/alvan/api/weather/<location>')
api.add_resource(ToDoID, '/alvan/api/todo/<table>/<id>')
api.add_resource(ToDo, '/alvan/api/todo/<table>')

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True, port=5001)
from cgitb import reset
from urllib import response
from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import json
from mysqlConnection import Connector
from resources import Weather, ToDo, UserAuth

# from resources import ALVAN

app = Flask(__name__)
app.config.SERVER_NAME = "flask-api:5000"
api = Api(app)
CORS(app)



class HelloWorld(Resource):
  def get(self):
    return {"data": "Hello World"}


# api.add_resource(ALVAN, '/alvan/api/query')

api.add_resource(HelloWorld, '/helloworld')
api.add_resource(Weather.Weather, '/alvan/api/weather/<location>')
api.add_resource(ToDo.ToDoID, '/alvan/api/todo/<table>/<id>')
api.add_resource(ToDo.ToDo, '/alvan/api/todo/<table>')
api.add_resource(UserAuth.UserAuth, '/alvan/api/auth/<method>')

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True, port=5000)
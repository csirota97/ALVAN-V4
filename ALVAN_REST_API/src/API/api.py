from cgitb import reset
from urllib import response
from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import json
from mysqlConnection import Connector
from resources import Weather, ToDo, UserAuth, ALVAN, Reminders, Device, Lights, Admin

from flask_apscheduler import APScheduler

app = Flask(__name__)
app.config.SERVER_NAME = "flask-api:5000"
api = Api(app)
CORS(app)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()


class HelloWorld(Resource):
  def get(self):
    return {"data": "Hello World"}


api.add_resource(ALVAN.ALVAN, '/alvan/api/query')

api.add_resource(HelloWorld, '/helloworld')
api.add_resource(Weather.Weather, '/alvan/api/weather/<location>')
api.add_resource(ToDo.ToDoID, '/alvan/api/todo/<table>/<id>')
api.add_resource(ToDo.ToDo, '/alvan/api/todo/<table>', resource_class_kwargs={'scheduler': scheduler})
api.add_resource(Reminders.Reminders, '/alvan/api/reminder/<id>', '/alvan/api/reminder/<id>/<offset>', resource_class_kwargs={'scheduler': scheduler})
api.add_resource(UserAuth.UserAuth, '/alvan/api/auth/<method>')
api.add_resource(Device.Device, '/alvan/api/device')
api.add_resource(Lights.Lights, '/alvan/api/lights')
api.add_resource(Admin.Admin, '/alvan/api/admin/<table>')

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True, port=5000)
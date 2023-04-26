from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

#TODO get tensorflow working on M1 chip

class Lights(Resource):
  '''
  DeviceType:
  1: security camera
  2: light
  '''
  def post(self):
    print(request.form)
    lights, room = db.toggleLights(request.form['query'],request.form['homeId'], request.form['status'])
    response = {'lights': lights, 'room': room}
    return response

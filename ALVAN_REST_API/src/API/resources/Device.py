from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

#TODO get tensorflow working on M1 chip

class Device(Resource):
  '''
  DeviceType:
  1: security camera
  2: light
  '''
  def post(self):
    response = {'devices': db.registerDevice(request.form['homeId'],request.form['deviceId'], request.form['deviceType'])}
    return response

  def get(self):
    id = request.args.get('userId')
    devices = db.getDevicesByRoom(id)
    response = {'devices': devices}
    return response

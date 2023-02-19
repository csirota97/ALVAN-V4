from urllib import response
from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

class Reminders(Resource):
  def post(self, id):
    response = {'lists': db.newReminder(id,request.form['reminderString'],request.form['reminder_dt']).result}
    return response

  def get(self, id):
    response = {'lists': db.getReminders(id).result}
    return response

  def put(self, table): #NOT IMPLEMENTED
    response = {"error": 404}

    if table.lower() == 'resetRepeatingEvents'.lower():
      print("reset")
      response = {'events': db.resetRepeatingEvents().result}

    return response

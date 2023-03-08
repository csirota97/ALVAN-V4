from urllib import response
from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

class Reminders(Resource):
  def post(self, id):
    for m in request.form:
      print(m)
    response = {'reminders': db.newReminder(id,request.form['reminder'],request.form['reminder_dt']).result}
    return response

  def get(self, id):
    response = {'reminders': db.getReminders(id).result}
    return response

  def put(self, table): #NOT IMPLEMENTED
    response = {"error": 404}

    if table.lower() == 'resetRepeatingEvents'.lower():
      print("reset")
      response = {'events': db.resetRepeatingEvents().result}

    return response

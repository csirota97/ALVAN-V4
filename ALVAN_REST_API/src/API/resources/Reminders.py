from urllib import response
from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

class Reminders(Resource):
  def __init__(self, scheduler):
    self.scheduler = scheduler

  def post(self, id):
    for m in request.form:
      print(m)
    response = {'reminders': db.newReminder(id,request.form['reminder'],request.form['query'], self.scheduler).result}
    return response

  def get(self, id):
    response = {'reminders': db.getUserReminders(id).result}
    return response

  def put(self, table): #NOT IMPLEMENTED
    response = {"error": 404}

    if table.lower() == 'resetRepeatingEvents'.lower():
      print("reset")
      response = {'events': db.resetRepeatingEvents().result}

    return response

from urllib import response
from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

class ToDo(Resource):
  def __init__(self, scheduler):
    self.scheduler = scheduler


  def post(self, table):
    response = {"error": 404}

    if table.lower() == 'list':
      response = {'lists': db.newList(request.form['ownerId'],request.form['calendarId'],request.form['listName']).result}
    elif table.lower() == 'event':
      response = {'events': db.newEvent(request.form['listId'], request.form['description'], request.form['completed'], request.form['repeatUnit'], request.form['repeatInterval'], request.form['repeatStartDate']).result}

    return response


  def put(self, table):
    response = {"error": 404}

    if table.lower() == 'resetRepeatingEvents'.lower():
      response = {'events': db.resetRepeatingEvents().result, 'reminders': db.getUpcomingReminders(self.scheduler).result}
      

    return response


class ToDoID(Resource):
  def delete(self, table, id):
    response = {"error": 404}

    if table.lower() == 'list':
      response = {'events': db.deleteList(int(id)).result}
    elif table.lower() == 'event':
      response = {'events': db.deleteEvent(int(id)).result}

    return response


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
      response = {'event': db.updateEvent(id, str(request.json['completed']), str(request.json['inProgress'])).result}

    return response

  def post(self, table, id):
    response = {"error": 404}

    if table.lower() == 'registertodo':
      response = {'register': db.registerToDoDevice(id, request.form['deviceToken']).result}

    return response
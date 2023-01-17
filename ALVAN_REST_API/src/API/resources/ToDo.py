from urllib import response
from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

class ToDo(Resource):
  def post(self, table):
    response = {"error": 404}

    if table.lower() == 'list':
      response = {'lists': db.newList(request.form['ownerId'],request.form['calendarId'],request.form['listName']).result}
    elif table.lower() == 'event':
      print("hit", request.form)
      response = {'events': db.newEvent(request.form['listId'], request.form['description'], request.form['completed']).result}

    return response


class ToDoID(Resource):
  def delete(self, table, id):
    response = {"error": 404}

    if table.lower() == 'list':
      print(id)
    elif table.lower() == 'event':
      response = {'events': db.deleteEvent(int(id)).result}

    return response


  def get(self, table, id):
    response = {"error": 404}

    if table.lower() == 'lists':
      print(id)
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

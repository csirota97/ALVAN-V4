from flask import request
from flask_restful import Resource
from utils import CONSTANTS

db = CONSTANTS.db

#TODO get tensorflow working on M1 chip

class Admin(Resource):
  def get(self, table):
    column_names, tableResults = db.adminGet(table)
    return {'columns': column_names, 'table': tableResults}

  def post(self, table):
    column_names, tableResults = db.adminPost(table, request.form['params'].split(','), request.form['columns'].split(','), request.form['columnTypes'].split(','))
    return {'columns': column_names, 'table': tableResults}


  def delete(self, table):
    column_names, tableResults = db.adminDelete(table, request.form['primaryKey'])
    return {'columns': column_names, 'table': tableResults}

from flask import request
from flask_restful import Resource
from mysqlConnection import Connector
from utils import CONSTANTS

db = CONSTANTS.db


#TODO get tensorflow working on M1 chip

class UserAuth(Resource):
  def post(self, method):
    print(request.form)
    # return {"success": 100}
    if method == 'newUser':
      response = {"result": db.createUser(request.form['firstName'], request.form['lastName'],request.form['email'],request.form['passwordHash'])}
    elif method == 'login':
      response = {"result": db.login(request.form['email'],request.form['passwordHash'])}

    print(response)
    return response

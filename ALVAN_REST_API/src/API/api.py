from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import machine_learning.TTW as ML_model

app = Flask(__name__)
app.config.SERVER_NAME = "flask-api:5000"
api = Api(app)
CORS(app)


class HelloWorld(Resource):
  def get(self):
    return {"data": "Hello World"}

class ALVAN(Resource):
  def post(self):
    tts_response = ''
    print(request)
    print(request.form, 69)
    if request.form['query']:
      #TODO get tts response from ML training set
      print(request.form['query'])
      print(ML_model.query(request.form['query']))
      tts_response = ML_model.query(request.form['query'])
    return {"tts": tts_response}

api.add_resource(HelloWorld, '/helloworld')
api.add_resource(ALVAN, '/alvan')

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)
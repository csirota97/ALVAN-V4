from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class HelloWorld(Resource):
  def get(self):
    return {"data": "Hello World"}

class ALVAN(Resource):
  def post(self):
    tts_response = ''
    print(request)
    print(request.form, 69)
    if request.form['query']:
      tts_response = request.form['query']
    return {"tts": tts_response}

api.add_resource(HelloWorld, '/helloworld')
api.add_resource(ALVAN, '/alvan')

if __name__ == '__main__':
  app.run(debug=True)
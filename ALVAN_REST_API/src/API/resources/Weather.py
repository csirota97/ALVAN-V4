from flask_restful import Resource
from requestors.weather_requestor import requestor as weather_requestor

class Weather(Resource):
  def get(self, location):
    return weather_requestor(location).json()

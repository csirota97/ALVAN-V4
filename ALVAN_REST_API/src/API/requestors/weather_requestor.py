import requests

def requestor(location):
  url = "https://weatherapi-com.p.rapidapi.com/forecast.json"

  querystring = {"q":location, "days":"3"}

  headers = {
    "X-RapidAPI-Key": "afb2def87amsha51bff62360a712p127288jsn00cd27b226c8",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
  }

  response = requests.request("GET", url, headers=headers, params=querystring)
  return response
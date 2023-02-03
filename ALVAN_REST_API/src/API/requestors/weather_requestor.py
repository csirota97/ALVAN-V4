import requests

def location_requestor(location):

  url = "https://forward-reverse-geocoding.p.rapidapi.com/v1/search"

  querystring = {"q":location,"accept-language":"en","polygon_threshold":"0.0"}

  headers = {
    "X-RapidAPI-Key": "afb2def87amsha51bff62360a712p127288jsn00cd27b226c8",
    "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com"
  }

  response = requests.request("GET", url, headers=headers, params=querystring)

  return response.json()[0]

def requestor(location):
  url = "https://weatherapi-com.p.rapidapi.com/forecast.json"

  location_data = location_requestor(location)
  lat_lon = "{0},{1}".format(location_data['lat'], location_data['lon'])

  querystring = {"q":lat_lon, "days":"3"}

  headers = {
    "X-RapidAPI-Key": "afb2def87amsha51bff62360a712p127288jsn00cd27b226c8",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
  }

  response = requests.request("GET", url, headers=headers, params=querystring)
  return response
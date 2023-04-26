import requests

def requestor(url):
  response = requests.request("GET", url)

  return response
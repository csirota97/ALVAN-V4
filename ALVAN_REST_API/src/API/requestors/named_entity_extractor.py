import requests

def request(query):
    url = "https://named-entity-extraction1.p.rapidapi.com/api/lingo"

    payload = {
        "extractor": "en",
        "text": query
    }
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": "afb2def87amsha51bff62360a712p127288jsn00cd27b226c8",
        "X-RapidAPI-Host": "named-entity-extraction1.p.rapidapi.com"
    }

    return requests.request("POST", url, json=payload, headers=headers).json()

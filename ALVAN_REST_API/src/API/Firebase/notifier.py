import requests
import json
from utils import apiKeys

url = "https://fcm.googleapis.com/fcm/send"

headers = {
  'Content-Type': 'application/json',
  'Authorization': apiKeys.ALVAN_FCM
}

def notify(title, body, reg_id):
  payload = json.dumps({
    "registration_ids": [
      reg_id
    ],
    "notification": {
      "body": body,
      "title": title
    }
  })
  response = requests.request("POST", url, headers=headers, data=payload)


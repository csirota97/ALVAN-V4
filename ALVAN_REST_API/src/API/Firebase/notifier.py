import requests
import json
from utils import apiKeys

url = "https://fcm.googleapis.com/fcm/send"

headers = {
  'Content-Type': 'application/json',
  'Authorization': apiKeys.ALVAN_FCM
}

def notify(title, body, reg_id, tag):
  payload = json.dumps({
    "registration_ids": [
      reg_id
    ],
    "notification": {
      "body": body,
      "title": title,
      "tag": tag,
      "icon":"notification_icon",
      "color": "#FFFFFF",
      "android_channel_id": "ALVAN_CHANNEL"
    },
    "android": {
      "notification": {
        "sound": "notification_ding",
      }
    },
  })
  response = requests.request("POST", url, headers=headers, data=payload)

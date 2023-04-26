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
      "color": "#FFFFFF"
    },
    "android": {
      "notification": {
        "sound": "notification_ding.mp3",
        "click_action": "TOP_STORY_ACTIVITY"
      }
    },
  })
  response = requests.request("POST", url, headers=headers, data=payload)

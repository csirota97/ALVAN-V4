import requests
import testRunner as testRunner

BASE = "http://127.0.0.1:5000/"

alvan_POST_request = lambda x, expected: requests.post(BASE + "alvan",x).json()["tts"] == expected

tests = [
  (
    "HelloWorld endpoint returns correct value",
    lambda x, expected: requests.get(BASE + "helloworld").json()["data"] == expected,
    {},
    "Hello World"
  ),
  (
    "ALVAN endpoint returns empty string when no body is present",
    alvan_POST_request,
    {'query': ''},
    ""
  ),
  (
    "ALVAN endpoint returns query string when a query is present",
    alvan_POST_request,
    {'query': 'test query'},
    'test query'
  )
]

testRunner.run(tests)
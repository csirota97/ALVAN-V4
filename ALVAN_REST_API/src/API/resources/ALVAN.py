from flask import request
from flask_restful import Resource
import machine_learning.TTW as ML_model
import requestors.named_entity_extractor as NEE

#TODO get tensorflow working on M1 chip

class ALVAN(Resource):
  def post(self):
    tts_response = ''
    print(request)
    if request.form['query']:
      #TODO get tts response from ML training set
      print(request.form['query'])
      # print(ML_model.query(request.form['query']))
      tts_response, follow_up = ML_model.query(request.form['query'])
      named_entities = NEE.request(request.form['query'])['result']
    return {"tts_cd": tts_response, "named_entities": named_entities, "follow_up": follow_up}

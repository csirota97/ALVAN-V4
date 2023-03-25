from flask import request
from flask_restful import Resource
# import machine_learning.TTW as ML_model
import machine_learning.temp_query as ML_model
import requestors.named_entity_extractor as NEE

#TODO get tensorflow working on M1 chip

class ALVAN(Resource):
  def post(self):
    tts_response = ''
    if request.form['query']:
      #TODO get tts response from ML training set
      tts_response, follow_up = ML_model.query(request.form['query'])
      try:
        named_entities = NEE.request(request.form['query'])['result']
      except KeyError:
        named_entities = []
    return {"tts_cd": tts_response, "named_entities": named_entities, "follow_up": follow_up}

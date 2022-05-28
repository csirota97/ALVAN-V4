import random
import os
import json
import pickle
import numpy as np
try:
    import nltk
except LookupError:
  nltk.download('punkt')
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model

lemmatizer = WordNetLemmatizer()
intents = json.loads(open('intents.json').read())

words = pickle.load(open('training_data{}words.pkl'.format(os.sep), 'rb'))
classes = pickle.load(open('training_data{}classes.pkl'.format(os.sep), 'rb'))
# model = load_model('training_data{}alvan_response_trained_model.h5'.format(os.sep))
model = load_model('chatbotmodel.h5')

# print(words)
# print(classes)
# print(model)

def clean_up_sentence(sentence):
  sentence_words = nltk.word_tokenize(sentence)
  sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
  return sentence_words

def bag_of_words(sentence):
  sentence_words = clean_up_sentence(sentence)
  bag = [0] * len(words)

  for w in sentence_words:
    for i, word in enumerate(words):
      if word == w:
        bag[i] = 1
  return np.array(bag)

def predict_class(sentence):
  bow = bag_of_words(sentence)
  res = model.predict(np.array([bow]))[0]
  ERROR_THRESHOLD = 0
  result = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

  result.sort(key=lambda x: x[1], reverse=True)
  return_list = []

  for r in result:
    return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
  
  return return_list
test="turn on the lights"
print(clean_up_sentence(test))
print(bag_of_words(test))
print(predict_class(test))
import json
import nltk
import numpy
import random
import pickle
import os

from nltk.stem.lancaster import LancasterStemmer

# nltk.download('punkt')
stemmer = LancasterStemmer()

with open('machine_learning/test_intents.json') as file:
    data = json.load(file)

try:
  with open(os.path.join("training_data","data.pickle"), "rb") as f:
    words, labels, training, output = pickle.load(f)
except:
  words = []
  labels = []
  docs_x = []
  docs_y = []

  for intent in data["intents"]:
    for pattern in intent["patterns"]:
      wrds = nltk.word_tokenize(pattern)
      words.extend(wrds)
      docs_x.append(wrds)
      docs_y.append(intent["tag"])

    if intent["tag"] not in labels:
      labels.append(intent["tag"])

  words = [stemmer.stem(w.lower()) for w in words if w != "?"]
  words = sorted(list(set(words)))

  labels = sorted(labels)

  training = []
  output = []

  out_empty = [0 for _ in range(len(labels))]

  for x, doc in enumerate(docs_x):
    bag = []

    wrds = [stemmer.stem(w.lower()) for w in doc]

    for w in words:
      if w in wrds:
        bag.append(1)
      else:
        bag.append(0)

    output_row = out_empty[:]
    output_row[labels.index(docs_y[x])] = 1

    training.append(bag)
    output.append(output_row)

  training = numpy.array(training)
  output = numpy.array(output)

  with open(os.path.join("training_data","data.pickle"), "wb") as f:
    pickle.dump((words, labels, training, output), f)

def query(query):
  training_lines = training
  query_words = nltk.word_tokenize(query)
  query_words = [stemmer.stem(w.lower()) for w in query_words if w != "?"]
  query_words = sorted(list(set(query_words)))

  lineWithMostPoints = 0
  maxPoints = -1

  for index, line in enumerate(training_lines):
    points = 0
    line_list = []
    for wrd in query_words:
      if wrd in words and line[words.index(wrd)] == 1:
        points += 1

    if points > maxPoints:
      lineWithMostPoints = index
      maxPoints = points

  predicted_line = output[lineWithMostPoints]
  output_list = output.tolist()
  final_output = []
  _ = [final_output.append(output_row) for output_row in output_list if output_row not in final_output]

  for index, line in enumerate(final_output):
    if line == output[lineWithMostPoints].tolist():
      return (data['intents'][index+1]['responses'], data['intents'][index+1]['follow_up'])
  

query("how hot is it outside")
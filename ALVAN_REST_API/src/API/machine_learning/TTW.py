import json
import nltk
import numpy
import random
import tensorflow
import tflearn
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

tensorflow.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

# try:
    # model.load("training_data{}model.tflearn".format(os.sep))
# except:
model.fit(training, output, n_epoch=4000, batch_size=8, show_metric=True)
model.save(os.path.join("training_data","model.tflearn"))

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return numpy.array(bag)


def chat():
    print("Start talking with the bot (type quit to stop)!")
    while True:
        inp = input("You: ")
        if inp.lower() == "quit":
            break

        results = model.predict([bag_of_words(inp, words)])[0]
        results_index = numpy.argmax(results)
        tag = labels[results_index]

        if (results[results_index] > 0.7):
            for tg in data["intents"]:
                if tg['tag'] == tag:
                    response = tg['responses']

            print(response)
        else:
            print("I'm not sure about that. Try again.")

def query(user_query, attempt=0):
    try:
        results = model.predict([bag_of_words(user_query, words)])[0]
        results_index = numpy.argmax(results)
        tag = labels[results_index]

        if (results[results_index] > 0.7):
            for tg in data["intents"]:
                    if tg['tag'] == tag:
                        response = tg['responses']
                        follow_up = tg['follow_up']
            return response, follow_up
        return -1, False
    except LookupError:
        nltk.download('punkt')
        if attempt==0:
            query(user_query, attempt=1)

if __name__ == '__main__':
  chat()
FROM wongko/docker-flask:python3

COPY requirements.txt .

COPY src/API/api.py .

COPY src/API/machine_learning/. machine_learning/.

COPY src/API/intents.json .

COPY src/API/training_data/. training_data/.

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "api.py"]


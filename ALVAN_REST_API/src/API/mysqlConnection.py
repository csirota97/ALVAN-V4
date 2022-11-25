import mysql.connector
from db_connections import todo_connections as todo, user_connections as userC

class Connector:
  def __init__(self, host, user, password):
    self.connection = mysql.connector.connect(
      host=host,
      user=user,
      password=password,
      database="alvandb"
    )
    self.host=host
    self.user=user
    self.password=password

    self.connection.autocommit = True

    self.cursor = self.connection.cursor()

  #----------------------------------------------------------------
  # To Do List
  #----------------------------------------------------------------

  def newList (self, ownerId, calendarId, listName): #CONNECTED
    try:
      return todo.newList(self,ownerId,calendarId, listName)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return todo.newList(self,ownerId,calendarId, listName)


  def newEvent (self, listId, description, completed): #CONNECTED
    try:
      return todo.newEvent(self, listId, description, completed)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return todo.newEvent(self, listId, description, completed)

  def updateEvent (self, eventId, completed): #CONNECTED
    try:
      return todo.updateEvent(self, eventId, completed)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return todo.updateEvent(self, eventId, completed)

  def deleteEvent (self, eventId):
    try:
      return todo.deleteEvent(self, eventId)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return todo.deleteEvent(self, eventId)
  
  def getLists(self, ownerId): #CONNECTED
    try:
      return todo.getLists(self, ownerId)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return todo.getLists(self, ownerId)
    
  def getEvents(self, listId): #CONNECTED
    try:
      return todo.getEvents(self, listId)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return todo.getEvents(self, listId)

  #----------------------------------------------------------------
  # User Authentication
  #----------------------------------------------------------------

  def createUser(self, firstName, lastName, email, password):
    try:
      return userC.createUser(self, firstName, lastName, email, password)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return userC.createUser(self, firstName, lastName, email, password)

  def login(self, email, password):
    try:
      return userC.login(self, email, password)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return userC.login(self, email, password)
  
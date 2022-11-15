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

    self.connection.autocommit = True

    self.cursor = self.connection.cursor()

  #----------------------------------------------------------------
  # To Do List
  #----------------------------------------------------------------

  def newList (self, ownerId, calendarId, listName): #CONNECTED
    return todo.newList(self,ownerId,calendarId, listName)

  def newEvent (self, listId, description, completed): #CONNECTED
    return todo.newEvent(self, listId, description, completed)

  def updateEvent (self, eventId, completed): #CONNECTED
    return todo.updateEvent(self, eventId, completed)

  def deleteEvent (self, eventId): 
    return todo.deleteEvent(self, eventId)

  def getLists(self, ownerId): #CONNECTED
    return todo.getLists(self, ownerId)

  def getEvents(self, listId): #CONNECTED
    return todo.getEvents(self, listId)

  #----------------------------------------------------------------
  # User Authentication
  #----------------------------------------------------------------

  def createUser(self, firstName, lastName, email, password):
    return userC.createUser(self, firstName, lastName, email, password)

  def login(self, email, password):
    return userC.login(self, email, password)
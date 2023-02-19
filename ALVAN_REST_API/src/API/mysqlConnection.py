import mysql.connector
from db_connections import todo_connections as todo, user_connections as userC, reminder_connections as reminderC

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

  def __catchDBError__(self, serviceCall, args):
    try:
      return serviceCall(self, *args)
    except mysql.connector.errors.DatabaseError:
      self.connection = mysql.connector.connect(
        host=self.host,
        user=self.user,
        password=self.password,
        database="alvandb"
      )
      self.connection.autocommit = True
      self.cursor = self.connection.cursor()
      return serviceCall(self, *args)

  #----------------------------------------------------------------
  # Reminders
  #----------------------------------------------------------------

  def newReminder (self, ownerId, reminderString, reminder_dt):
    return self.__catchDBError__(reminderC.newReminder, [ownerId, reminderString, reminder_dt])

  def getReminders (self, ownerId):
    return self.__catchDBError__(reminderC.getReminders, [ownerId])


  #----------------------------------------------------------------
  # To Do List
  #----------------------------------------------------------------

  def newList (self, ownerId, calendarId, listName): #CONNECTED
    return self.__catchDBError__(todo.newList, [ownerId, calendarId, listName])

  def newEvent (self, listId, description, completed, repeatUnit, repeatInterval, repeatStartDate): #CONNECTED
    return self.__catchDBError__(todo.newEvent, [listId, description, completed, repeatUnit, repeatInterval, repeatStartDate])

  def updateEvent (self, eventId, completed, inProgress): #CONNECTED
    return self.__catchDBError__(todo.updateEvent, [eventId, completed, inProgress])

  def deleteList (self, listId):
    return self.__catchDBError__(todo.deleteList, [listId])

  def deleteEvent (self, eventId):
    return self.__catchDBError__(todo.deleteEvent, [eventId])
  
  def getLists(self, ownerId): #CONNECTED
    return self.__catchDBError__(todo.getLists, [ownerId])
    
  def getEvents(self, listId): #CONNECTED
    return self.__catchDBError__(todo.getEvents, [listId])

  def resetRepeatingEvents(self):
    return self.__catchDBError__(todo.resetRepeatingEvents, [])

  #----------------------------------------------------------------
  # User Authentication
  #----------------------------------------------------------------

  def createUser(self, firstName, lastName, email, password):
    return self.__catchDBError__(userC.createUser, [firstName, lastName, email, password])

  def login(self, email, password):
    return self.__catchDBError__(userC.login, [email, password])
  
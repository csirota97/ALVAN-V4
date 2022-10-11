import mysql.connector

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


  def newList (self, ownerId, calendarId, listName): #CONNECTED
    # self.cursor.execute("show columns in Lists;")
    self.cursor.execute(
      'INSERT INTO Lists (OWNER, CALENDAR, NAME) VALUES ({0}, {1}, "{2}");'
      .format(ownerId, calendarId, listName)
    )

    self.result = self.cursor.fetchall()
    return self


  def newEvent (self, listId, description, completed): #CONNECTED
    print(listId, description, completed)
    self.cursor.execute(
      'INSERT INTO Events (LISTID, DESCRIPTION, COMPLETED) VALUES ({0}, "{1}", {2});'
      .format(listId, description, completed)
    )

    self.result = self.cursor.fetchall()
    return self


  def updateEvent (self, eventId, completed):
    print(eventId, completed)
    if not eventId or not completed:
      raise ValueError('eventId and completed must be provided')
    self.cursor.execute(
      'UPDATE Events SET COMPLETED = {0} WHERE id={1};'
      .format(str(completed), eventId)
    )

    self.result = self.cursor.fetchall()
    return self


  def getLists(self, ownerId): #CONNECTED
    print(ownerId)
    if ownerId and ownerId != -1:
      self.cursor.execute(
        'SELECT * FROM Lists WHERE OWNER={0}'.format(ownerId)
      )
    else:
      print(123)
      self.cursor.execute('SELECT * FROM Lists JOIN Events')

    self.result = self.cursor.fetchall()
    print(self.result)
    return self


  def getEvents(self, listId): #CONNECTED
    if not listId and not isinstance(listId, int):
      raise ValueError('listId must be provided as an integer value')
    self.cursor.execute(
      'SELECT * FROM Events WHERE LISTID={0}'.format(listId)
    )

    self.result = self.cursor.fetchall()
    return self

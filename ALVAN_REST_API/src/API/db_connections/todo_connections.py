def newList (self, ownerId, calendarId, listName):
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


def deleteEvent (self, eventId): #CONNECTED
  self.cursor.execute(
    'Delete from Events where id={0};'
    .format(eventId)
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
    print("in A")
    self.cursor.execute(
      'SELECT * FROM Lists JOIN Events where ListId = Lists.id AND Lists.owner={0}'.format(ownerId)
    )
  else:
    print(123)
    print("in B")
    self.cursor.execute('SELECT * FROM Lists JOIN Events where ListId = Lists.id')

  self.result = self.cursor.fetchall()
  self.cursor.execute('Select * from Lists where id NOT IN (SELECT listId FROM Events) AND Lists.owner={0}'.format(ownerId))
  self.result.extend(self.cursor.fetchall())
  self.result.sort(key=lambda res: res[0])
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

import datetime
from Firebase import notifier

def newList (self, ownerId, calendarId, listName):
  # self.cursor.execute("show columns in Lists;")
  self.cursor.execute(
    'INSERT INTO Lists (OWNER, CALENDAR, NAME) VALUES ({0}, {1}, "{2}");'
    .format(ownerId, calendarId, listName)
  )

  self.result = self.cursor.fetchall()
  return self


def newEvent (self, listId, description, completed, repeatUnit, repeatInterval, repeatStartDate): #CONNECTED
  print(listId, description, completed, repeatUnit, type(repeatUnit))
  if repeatUnit == "-1":
    self.cursor.execute(
      'INSERT INTO Events (LISTID, DESCRIPTION, COMPLETED) VALUES ({0}, "{1}", {2});'
      .format(listId, description, completed)
    )

    self.result = self.cursor.fetchall()
    return self

  self.cursor.execute(
    'INSERT INTO Events (LISTID, DESCRIPTION, COMPLETED, repeatUnit, repeatInterval, repeatStartDate) VALUES ({0}, "{1}", {2}, {3}, {4}, "{5}");'
    .format(listId, description, completed, repeatUnit, repeatInterval, repeatStartDate)
  )

  self.result = self.cursor.fetchall()
  return self

def deleteList (self, listId): #CONNECTED
  self.cursor.execute(
    'Delete from Events where ListId={0};'
    .format(listId)
  )

  self.result = self.cursor.fetchall()

  self.cursor.execute(
    'Delete from Lists where id={0};'
    .format(listId)
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


def updateEvent (self, eventId, completed, inProgress):
  if not eventId or not completed:
    raise ValueError('eventId and completed must be provided')
  self.cursor.execute(
    'UPDATE Events SET COMPLETED = {0}, inProgress = {1} WHERE id={2};'
    .format(str(completed), str(inProgress), eventId)
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

def resetRepeatingEvents(self):
  self.cursor.execute('SELECT * FROM Events JOIN alvandb.lists on events.listId = lists.id JOIN alvandb.todo_list_device_keys on lists.owner = todo_list_device_keys.userId WHERE repeatInterval <> -1')
  repeatingEventRows = self.cursor.fetchall()

  def resetRow(id):
    updateEvent(self, id, '0', '0')

  TODAY = datetime.date.today()
  MONTHS_WITH_30_DAYS = [9, 4, 6, 11]

  # repeat units
  # 0 = day
  # 1 = week (7 days)
  # 2 = month (same calendar date every month, if day doesn't exist in month, default to last day of month i.e. jan. 30 -> feb. 28)
  for row in repeatingEventRows:
    #row[5] = repeat interval
    #row[6] = repeat unit
    #row[7] = repeat start date
    repeatInterval, repeatUnit, repeatStartDateStr = row[5:8]
    repeatStartDate = datetime.date(*[int(dateComponent) for dateComponent in repeatStartDateStr.split('-')])

    if repeatInterval == None:
      repeatInterval = 1
    if repeatUnit == None:
      repeatUnit = 1
    if repeatUnit == 1:
      repeatUnit = 0
      repeatInterval = repeatInterval * 7

    if repeatUnit == 2:
      if repeatStartDate.day == TODAY.day:
        notifyEventReset(row)
        resetRow(row[0])
      else:
        if repeatStartDate.day == 31 and ((TODAY.day == 30 and TODAY.month in MONTHS_WITH_30_DAYS) 
                                      or (TODAY.day == 29 and TODAY.month == 2 and TODAY.year % 4 == 0)
                                      or (TODAY.day == 28 and TODAY.month == 2 and TODAY.year % 4 != 0)):
          notifyEventReset(row)
          resetRow(row[0])
        elif repeatStartDate.day == 30 and TODAY.month in MONTHS_WITH_30_DAYS and ((TODAY.day == 29 and TODAY.month == 2 and TODAY.year % 4 == 0)
                                      or (TODAY.day == 28 and TODAY.month == 2 and TODAY.year % 4 != 0)):
          notifyEventReset(row)
          resetRow(row[0])
      continue
    if (TODAY - repeatStartDate).days % repeatInterval == 0:
      notifyEventReset(row)
      resetRow(row[0])


  self.cursor.execute('SELECT * FROM Events WHERE repeatInterval <> -1')
  self.result = self.cursor.fetchall()
  
  return self

def registerDevice(self, ownerId, deviceToken):
  self.cursor.execute(
    "INSERT INTO todo_list_device_keys (userId, device_key) VALUES ({0},'{1}');"
    .format(ownerId, deviceToken)
  )

  self.result = self.cursor.fetchall()
  return self

def notifyEventReset(row):
  row_name = row[2]
  list_name = row[11]
  device_key = row[12]

  notification_body = "List: {1}\nTask: {0}".format(row_name, list_name)
  print('\n------------------------------')
  print(notification_body)

  notifier.notify("Task Reset", notification_body ,device_key)
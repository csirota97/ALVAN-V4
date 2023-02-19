import datetime

def newReminder (self, ownerId, reminderString, reminder_dt):
  self.cursor.execute(
    'INSERT INTO `ALVANDB`.`Reminders` (`userId`, `reminderString`, `reminder_dt`) VALUES ({0}, {1}, {2});'
    .format(int(ownerId), reminderString, int(reminder_dt))
  )

  self.result = self.cursor.fetchall()
  return self


def deleteReminder (self, listId): 
  pass

def updateReminder (self, eventId, completed, inProgress):
  pass

def getReminders (self, ownerId):
  self.cursor.execute(
    'Select * from Reminders where userId = {0} and completed = 0 and reminder_dt > ROUND(UNIX_TIMESTAMP(CURTIME(4)) * 1000);'
    .format(int(ownerId))
  )

  self.result = self.cursor.fetchall()
  return self


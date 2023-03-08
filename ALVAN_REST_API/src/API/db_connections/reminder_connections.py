import datetime
import datefinder

def newReminder (self, ownerId, reminderString, reminder_dt):
  reminder_dt = reminder_dt.lower().replace('today',(datetime.date.today()).strftime('%m/%d/%Y'))
  reminder_dt = reminder_dt.lower().replace('tomorrow',(datetime.date.today()+ datetime.timedelta(days=1)).strftime('%m/%d/%Y'))
  for dateTime in datefinder.find_dates(reminder_dt):
    break

  self.cursor.execute(
    'INSERT INTO `ALVANDB`.`Reminders` (`userId`, `reminderString`, `reminder_dt`) VALUES ({0}, "{1}", {2});'
    .format(
      int(ownerId),
      reminderString,
      int(dateTime.timestamp()))
  )

  self.result = self.cursor.fetchall()
  return self


def deleteReminder (self, listId): 
  pass

def updateReminder (self, eventId, completed, inProgress):
  pass

def getReminders (self, ownerId):
  self.cursor.execute(
    'Select * from Reminders where userId = {0} and completed = 0 and reminder_dt >  ROUND(UNIX_TIMESTAMP(CURTIME(4)));'
    .format(int(ownerId))
  )

  self.result = self.cursor.fetchall()
  return self


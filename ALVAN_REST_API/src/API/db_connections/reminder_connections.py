import datetime
import datefinder
from Firebase import notifier
import copy

from flask_apscheduler import APScheduler

global_index = 0

def newReminder (self, ownerId, reminderString, query, scheduler):
  modified_query = query.lower().replace('today',(datetime.date.today()).strftime('%m/%d/%Y'))
  modified_query = modified_query.lower().replace('tomorrow',(datetime.date.today()+ datetime.timedelta(days=1)).strftime('%m/%d/%Y'))
  for dateTime in datefinder.find_dates(modified_query):
    break


  self.cursor.execute(
    'INSERT INTO Reminders (userId, reminderString, reminder_dt) VALUES ({0}, "{1}", {2});'
    .format(
      int(ownerId),
      reminderString,
      int(dateTime.timestamp()))
  )

  queryResults = copy.deepcopy(self.cursor.fetchall())

  getUpcomingReminders(self, scheduler)

  self.result = queryResults
  return self


def deleteReminder (self, listId): 
  pass

def updateReminder (self, eventId, completed, inProgress):
  pass

def getUserReminders (self, ownerId):
  self.cursor.execute(
    'Select * from Reminders where userId = {0} and completed = 0 and reminder_dt >  UNIX_TIMESTAMP(CURTIME());'
    .format(int(ownerId))
  )

  self.result = self.cursor.fetchall()
  return self

def getUpcomingReminders (self, scheduler):
  global global_index
  global_index = 0
  self.cursor.execute(
    'Select * from Reminders JOIN todo_list_device_keys on Reminders.userId = todo_list_device_keys.userId where reminder_dt >  UNIX_TIMESTAMP(CURTIME())  ORDER BY reminder_dt ASC;'
  )
  reminderRows = self.cursor.fetchall()

  scheduler.delete_all_jobs()

  reminder_job_funcs = []
  run_datetimes = []
  
  
  for index, row in enumerate(reminderRows):
    job_id = "{}-{}".format(copy.copy(row[0]), copy.copy(row[5]))
    timecode = row[3]

    while timecode in run_datetimes:
      timecode+=1

    run_datetimes.append(timecode)
    job_run_date=datetime.datetime.fromtimestamp(timecode).isoformat()

    def notifyReminder(index, reminderRows):
      global global_index
      index = global_index
      row = copy.deepcopy(reminderRows[index])
      reminder_string = row[2]
      device_key = copy.copy(row[5])
      tag = "ALVAN_REMINDER_NOTIFICATION_TAG_{}".format(row[0])
      notifier.notify("Reminder:", reminder_string, copy.copy(device_key), tag)
      global_index +=1
    reminder_job_funcs.append(copy.deepcopy((job_id,lambda: notifyReminder(copy.copy(index), reminderRows), job_run_date)))

  for index in range(len(reminder_job_funcs)):
    scheduler.add_job(reminder_job_funcs[copy.copy(index)][0], reminder_job_funcs[copy.copy(index)][1], trigger='date', run_date=reminder_job_funcs[copy.copy(index)][2])
  
  self.cursor.execute(
    'Select * from Reminders where reminder_dt >  UNIX_TIMESTAMP(CURTIME())'
  )
  self.result = self.cursor.fetchall()
  return self

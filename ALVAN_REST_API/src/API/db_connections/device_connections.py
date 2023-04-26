from requestors.ifttt_requestor import requestor

def registerDevice(self, homeId, deviceId, deviceType): 
  self.cursor.execute('INSERT INTO `alvandb`.`Device` (`id`, `deviceType`, `homeId`) VALUES ({0}, {1}, {2});'.format(deviceId, deviceType, homeId))
  
  result = self.cursor.fetchall()
  return result

def toggleLights(self, query, homeId, status):
  self.cursor.execute("SELECT * FROM `alvandb`.`Rooms` where homeId='{0}';".format(homeId))
  rooms = self.cursor.fetchall()
  print(rooms)

  for room in rooms:
    if room[1].lower() in query.lower():
      self.cursor.execute("SELECT * FROM `alvandb`.`Device` where deviceType=2 and roomId={0};".format(room[0]))
      devices = self.cursor.fetchall()

      print(devices)
      for device in devices:
        if device[4] and '{STATUS}' in device[4]:
          requestor(device[4].replace('{STATUS}', status.lower()))

      return devices, room[1]

  return [], 'No Matching Room Found In Home'

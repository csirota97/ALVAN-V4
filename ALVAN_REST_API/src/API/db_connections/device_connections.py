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

def getDevicesByRoom(self, userId):
  self.cursor.execute('Select d.id, d.name, d.deviceType, d.webHookKey, r.id, r.name, h.id, h.name from `alvandb`.`Device` d JOIN `alvandb`.`Rooms` r on d.roomId=r.id JOIN `alvandb`.`Home` h on d.homeId = h.id WHERE h.userId = {0};'.format(userId))
  result = self.cursor.fetchall()
  self.cursor.execute('Select d.id, d.name, d.deviceType, d.webHookKey, r.id, r.name, h.id, h.name From `alvandb`.`Rooms` r LEFT OUTER JOIN `alvandb`.`Device` d on r.id = d.roomId JOIN `alvandb`.`Home` h on r.homeId = h.id where d.roomId is null and h.userId = {0};'.format(userId))
  result += self.cursor.fetchall()
  self.cursor.execute('Select d.id, d.name, d.deviceType, d.webHookKey, r.id, r.name, h.id, h.name from `alvandb`.`Home` h LEFT OUTER JOIN `alvandb`.`Device` d on d.homeId = h.id LEFT OUTER JOIN `alvandb`.`Rooms` r on d.roomId=r.id WHERE d.id is NULL and r.id is null and h.userId = {0};'.format(userId))
  result += self.cursor.fetchall()
  
  return result

def updateDevice(self, deviceId, newHomeId, newRoomId, newName):
  result = ''
  if newHomeId:
    self.cursor.execute("UPDATE `alvandb`.`Device` d SET d.homeId='{0}' WHERE d.id={1};".format(newHomeId, deviceId))
    result = self.cursor.fetchall()
  if newRoomId:
    self.cursor.execute('UPDATE `alvandb`.`Device` d SET d.roomId={0} WHERE d.id={1};'.format(newRoomId, deviceId))
    result = self.cursor.fetchall()
  if newName:
    self.cursor.execute("UPDATE `alvandb`.`Device` d SET d.name='{0}' WHERE d.id={1};".format(newName, deviceId))
    result = self.cursor.fetchall()
  
  return result


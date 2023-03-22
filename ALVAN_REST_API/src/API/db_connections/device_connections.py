def registerDevice(self, homeId, deviceId, deviceType): 
  self.cursor.execute('INSERT INTO `alvandb`.`Device` (`id`, `deviceType`, `homeId`) VALUES ({0}, {1}, {2});'.format(deviceId, deviceType, homeId))
  
  result = self.cursor.fetchall()
  return result

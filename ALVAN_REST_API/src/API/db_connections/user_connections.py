import hashlib

def createUser(self, firstName, lastName, email, password): 
  self.cursor.execute('SELECT * FROM `Users` WHERE email = "{0}";'.format(email))
  if len(self.cursor.fetchall()) >= 1:
    return 'already exists'

  token = hashlib.sha256(bytes("{0}{1}{2}{3}".format(firstName, lastName, email, password), 'utf-8')).hexdigest()
  results = self.cursor.execute(
    'INSERT INTO `Users` (`firstName`, `lastName`, `email`, `passwordHash`, `token`) VALUES ("{0}", "{1}", "{2}", "{3}", "{4}"); SELECT * FROM `Users` where email = "{2}";'
    .format(firstName, lastName, email, password, token[0:45]),
    multi=True
  )

  output = []
  for result in results:
    if result.with_rows:
      output.append(result.fetchall())

  return output


def login(self, email, password): 
  self.cursor.execute('SELECT * FROM `Users` WHERE email = "{0}" AND passwordHash = "{1}";'.format(email, password))

  result = self.cursor.fetchall()

  if len(result) == 0:
    result = 'Incorrect Email or Password'
  
  return result

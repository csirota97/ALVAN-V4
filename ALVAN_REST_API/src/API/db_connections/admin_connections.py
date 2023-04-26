def get(self, table): 
  if ';' in table:
    return "Not Today", "Hacker"
  self.cursor.execute('select * from `alvandb`.`{0}`;'.format(table))
  
  column_names, result = self.cursor.column_names, self.cursor.fetchall()
  return column_names, result

def post(self, table, params, columns, columnTypes):
  typed_columns = columns.copy()
  formatted_params = params.copy()
  for i in range(len(typed_columns)):
    if columnTypes[i] == '':
      formatted_params[i] = None
    elif columnTypes[i] == 'string':
      formatted_params[i] = '"{0}"'.format(formatted_params[i])
    elif columnTypes[i] == 'number':
      if '.' in formatted_params[i]:
        formatted_params[i] = float(formatted_params[i])
      else:
        print(typed_columns[i])
        formatted_params[i] = int(formatted_params[i])
    typed_columns[i] = '`{0}`'.format(typed_columns[i])

  query = 'INSERT INTO `alvandb`.`{0}` ({1}) VALUES ({2});'.format(
    table,
    ','.join([str(column) for column in typed_columns]),
    ','.join([str(param) for param in formatted_params]).replace('None', 'NULL')
  )
  self.cursor.execute(query)
  
  return get(self, table)

def delete(self, table, primaryKey):
  pk = 'id'
  if table == 'todo_list_device_keys':
    pk = 'device_key'
  self.cursor.execute('DELETE FROM `alvandb`.`{0}` WHERE {1}={2};'.format( table, pk, primaryKey))
  
  return get(self, table)
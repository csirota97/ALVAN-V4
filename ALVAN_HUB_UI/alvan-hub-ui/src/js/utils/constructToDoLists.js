const constructToDoLists = (listQueryResults) => {
  const listHash = {};

  listQueryResults.lists.forEach(row => {
    if (listHash[row[0]]) {
      listHash[row[0]].tasks.push({
        id: row[4],
        description: row[6],
        completed: !!row[7],
      })
    } else {
      listHash[row[0]] = {
        key: row[0],
        value: row[3],
        tasks: row.length > 4 ? [{
          id: row[4],
          description: row[6],
          completed: !!row[7],
        }] : []
      }
    }
  })

  const constructedListTasks = Object.keys(listHash)
    .map(function(key) {
        return listHash[key];
    });
  return constructedListTasks;
}

export default constructToDoLists;
const constructToDoLists = (listQueryResults) => {
  const listHash = {};

  if (listQueryResults.lists) {
    listQueryResults.lists.forEach(row => {
      if (listHash[row[0]]) {
        listHash[row[0]].tasks.push({
          id: row[4],
          description: row[6],
          completed: !!row[7],
          inProgress: !!row[8],
          repeatInterval: row[9],
          repeatUnit: row[10],
          repeatStartDate: row[11] ? new Date(row[11]) : null,
        });
      } else {
        listHash[row[0]] = {
          key: row[0],
          value: row[3],
          tasks: row.length > 4 ? [{
            id: row[4],
            description: row[6],
            completed: !!row[7],
            inProgress: !!row[8],
            repeatInterval: row[9],
            repeatUnit: row[10],
            repeatStartDate: row[11] ? new Date(row[11]) : null,
          }] : [],
        };
      }
    });
  }

  const constructedListTasks = Object.keys(listHash)
    .map((key) => listHash[key]);
  return constructedListTasks;
};

export default constructToDoLists;

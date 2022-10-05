const mockToDoLists = [
  {
    key: 1,
    value: 'first to-do list',
    tasks: [
      {
        id: 1,
        description: 'Laundry',
        completed: true,
      },
      {
        id: 2,
        description: 'Groceries',
        completed: false,
      }
    ]
  },
  {
    key: 2,
    value: 'second to-do list',
    tasks: [
      {
        id: 3,
        description: 'Homework',
        completed: false,
      },
      {
        id: 4,
        description: 'Chores',
        completed: false,
      }
    ]
  },
  {
    key: 3,
    value: 'third to-do list',
    tasks: [
      {
        id: 5,
        description: 'Take kids to daycare',
        completed: true,
      },
      {
        id: 6,
        description: 'Pick up kids from daycare',
        completed: false,
      },
      {
        id: 7,
        description: 'Buy kids toys and candy',
        completed: false,
      },
      {
        id: 8,
        description: 'Bribe kids not to tell mom I forgot them at daycare',
        completed: false,
      }
    ]
  }
];

export default mockToDoLists;
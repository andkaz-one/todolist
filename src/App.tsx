import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type TaskItemType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
  //BUSSINES
  const [taskItem, setTaskItem] = useState <Array<TaskItemType>>([
    {id: v1(), title: 'Milk', isDone: false},
    {id: v1(), title: 'Egg', isDone: false},
    {id: v1(), title: 'Bread', isDone: false},
  ])

  //added tasks
  const addTaskItem = (title: string) => {
    let newItem = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTaskItem([newItem, ...taskItem])
  }

  //deleted tasks
  const removeTaskItem = (tID: string) => {
    setTaskItem([...taskItem].filter(t => t.id !== tID))
  }

  const changeTaskStatus = (tID: string, isDone: boolean) => {
    setTaskItem([...taskItem].map(t => t.id === tID ? {...t, isDone: isDone}: t))


  }

  const [filterTask, setFilterTask] = useState <FilterValuesType>('all')

  let taskForTodolist = [...taskItem]

  if (filterTask === 'active') {
    taskForTodolist = taskForTodolist.filter(t => !t.isDone)
  }
  if (filterTask === 'completed') {
    taskForTodolist = taskForTodolist.filter(t => t.isDone)
  }


  //filter for tasks
  const sortedTasks = (value: FilterValuesType) => {
    setFilterTask(value)
  }





  //UI
  return (
    <div className="app">
      <Todolist title={'What to buy'}
                taskItem={taskForTodolist}
                addTaskItem={addTaskItem}
                removeTaskItem={removeTaskItem}
                sortedTasks={sortedTasks}
                changeTaskStatus={changeTaskStatus}
      />

    </div>
  );
}

export default App;

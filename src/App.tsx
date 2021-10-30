import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import AppBar from "./components/AppBar";
import AppHeader from "./components/AppBar";

export type TaskItemType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

/*export type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksType = {
  [key: string]: Array<TaskItemType>
}*/

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
      <>
        <AppHeader/>
        <div className="app">
          <Todolist title={'What to buy'}
                    taskItem={taskForTodolist}
                    addTaskItem={addTaskItem}
                    removeTaskItem={removeTaskItem}
                    sortedTasks={sortedTasks}
                    changeTaskStatus={changeTaskStatus}
          />

        </div>
      </>
  );
}

export default App;











/*  const todolistID_1 = v1()
  const todolistID_2 = v1()


const [todolists, setTodolists] = useState <Array<TodolistsType>>([
  {id: todolistID_1, title: 'what to buy', filter: 'all'},
  {id: todolistID_2, title: 'what to learn', filter: 'all'},
])

  const [tasks, setTasks] = useState({
    [todolistID_1] : [
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Egg', isDone: false},
      {id: v1(), title: 'Bread', isDone: false},
    ],
    [todolistID_2] : [
      {id: v1(), title: 'HTML & CSS', isDone: false},
      {id: v1(), title: 'JS', isDone: false},
      {id: v1(), title: 'REACT', isDone: false}
    ]
  })*/
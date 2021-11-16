import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import AppHeader from "./components/AppBar";
import {Grid, Paper} from "@mui/material";

export type TaskItemType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: Array<TaskItemType>
}

function App() {
    //BUSSINES

    const todolistID1 = v1()
    const todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to buy', filter: 'all'},
        {id: todolistID2, title: 'What to learn', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Egg', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ]
    })

    //added tasks
    const addTaskItem = (title: string, todolistID: string) => {
        let newItem = {
            id: v1(),
            title: title,
            isDone: false
        }
        let todolistTasks = tasks[todolistID]

        tasks[todolistID] = [newItem, ...todolistTasks]

        setTasks({...tasks})
        /*setTaskItem([newItem, ...taskItem])*/
    }

    //deleted tasks
    const removeTaskItem = (tID: string, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(t => t.id !== tID)
        setTasks({...tasks})
    }

    const changeTaskStatus = (tID: string, isDone: boolean, todolistID: string) => {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.map(t => t.id === tID ? {...t, isDone: isDone} : t)

        setTasks({...tasks})
        /*setTaskItem([...taskItem].map(t => t.id === tID ? {...t, isDone: isDone} : t))*/


    }

    /*const [filterTask, setFilterTask] = useState<FilterValuesType>('all')*/

    /*   let taskForTodolist = [...tasks]

       if (filterTask === 'active') {
           taskForTodolist = taskForTodolist.filter(t => !t.isDone)
       }
       if (filterTask === 'completed') {
           taskForTodolist = taskForTodolist.filter(t => t.isDone)
       }
   */

    //filter for tasks
    const sortedTasks = (value: FilterValuesType, todolistID: string) => {
        setTodolists([...todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl)])
    }


    //UI

    return (
        <>
            <AppHeader/>
            <Grid container spacing={3}>
                


                {todolists.map(tl => {

                    let allTodolistTasks = tasks[tl.id];
                    let taskForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        taskForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        taskForTodolist = allTodolistTasks.filter(t => t.isDone);
                    }


                    return (
                        <Grid item>
                            <Paper elevation={3}>

                                <div className={'app'}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodolist}
                                        addTaskItem={addTaskItem}
                                        removeTaskItem={removeTaskItem}
                                        sortedTasks={sortedTasks}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                    />
                                </div>
                            </Paper>
                        </Grid>


                    )

                })}
            </Grid>


        </>
    )
        ;
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
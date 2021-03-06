import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AppHeader from "./components/AppBar";
import {Button, Grid, Paper, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {AddTodoLists} from "./components/AddTodoLists";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/task-reducer";
import {
    addTodolistsAC,
    createTodolistTC,
    removeTodolistAC,
    setTodolistsAC,
    setTodolistTC,
    sortedTasksAC
} from "./redux/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {mainStateType} from "./redux/store";
import {todoAPI} from "./dal/todoAPI";


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

    useEffect(() => {
        dispatch(setTodolistTC)

    }, [])



    const todolists = useSelector<mainStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<mainStateType, TasksType>(state => state.tasks)

    const dispatch = useDispatch()

    //added tasks
    const addTaskItem = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [])

    //deleted tasks
    const removeTaskItem = useCallback((tID: string, todolistID: string) => {
        dispatch(removeTaskAC(tID,todolistID))
    }, [])

    const changeTaskStatus = useCallback((tID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(tID, isDone, todolistID))
    }, [])

    const changeTaskTitle = useCallback((tID: string,title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(tID ,title, todolistID))
    }, [])

    //filter for tasks
    const sortedTasks = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(sortedTasksAC(value,todolistID))
    }, [])

    const addTodoLists = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [])


    //UI

    return (
        <>
            <AppHeader/>
            <Grid container spacing={3}>

                <div className={'input'}><AddTodoLists callback={addTodoLists} /></div>

                {todolists.map(tl => {
                    return (
                        <Grid item>
                            <Paper elevation={3}>

                                <div className={'app'}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        addTaskItem={addTaskItem}
                                        removeTaskItem={removeTaskItem}
                                        sortedTasks={sortedTasks}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}

export default App;





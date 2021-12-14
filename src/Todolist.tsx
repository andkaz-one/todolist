import React from 'react'
import {FilterValuesType, TaskItemType, TasksType} from "./App";
import {InputForAddItems} from "./components/InputForAddItems";
import {FilterButton} from "./components/FilterButton";
import {Button, Checkbox} from "@mui/material";
import {EditableTitleTask} from "./components/EditableTitleTask";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskItemType>
    addTaskItem: (title: string, todolistID: string) => void
    removeTaskItem: (tID: string, todolistID: string) => void
    sortedTasks: (value: FilterValuesType, todolistID: string) => void
    changeTaskStatus: (tID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (tID: string, title: string, todolistID: string) => void
    filter: string
    removeTodolist: (todolistID: string) => void
}


export const Todolist = React.memo((props: PropsType) => {
    //BUSSINES
    //handler for delete task button
    const onClickRemoveTaskItem = (tID: string, todolistID: string) => {
        props.removeTaskItem(tID, todolistID)
    }


    //handler for change checkbox
    const changeStatusHandler = (tID: string, isDone: boolean) => {
        props.changeTaskStatus(tID, isDone, props.id)
    }
// handler for edit tasks
    const changeTaskTitleHandler = (tID: string, newTitle: string) => {
        props.changeTaskTitle(tID, newTitle, props.id)

    }
//handler for delete todolist
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.id)
    }

    let taskForTodolist = props.tasks;

    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.isDone);
    }

    //mapped list-element and delete button
    const mappedTask = taskForTodolist.map(t => <li style={{listStyleType: 'none'}}>
        <Checkbox checked={t.isDone}
                  onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}/>
        <EditableTitleTask callBack={changeTaskTitleHandler} title={t.title} tID={t.id}/>
        <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                variant="outlined"
                onClick={() => onClickRemoveTaskItem(t.id, props.id)}>X</Button></li>
    )


    //UI
    return (
        <div>
            <div>
                <h2>{props.title}
                    <Button variant={'outlined'} onClick={onClickRemoveTodolist}>x</Button>
                </h2>
                <InputForAddItems callBack={props.addTaskItem} id={props.id}/>
            </div>
            <div>
                <ul>
                    {mappedTask}
                </ul>
            </div>
            <div>
                <FilterButton callBack={props.sortedTasks} id={props.id}/>
            </div>
        </div>
    )
})



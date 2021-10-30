import React from 'react'
import {FilterValuesType, TaskItemType} from "./App";
import {InputForAddItems} from "./components/InputForAddItems";
import {FilterButton} from "./components/FilterButton";
import {Button, Checkbox} from "@mui/material";


type PropsType = {
    title: string
    taskItem: Array<TaskItemType>
    addTaskItem: (title: string) => void
    removeTaskItem: (tID: string) => void
    sortedTasks: (value: FilterValuesType) => void
    changeTaskStatus: (tID: string, isDone: boolean) => void
}


export const Todolist = (props: PropsType) => {
    //BUSSINES
    //handler for delete task button
    const onClickRemoveTaskItem = (tID: string) => {
        props.removeTaskItem(tID)
    }


    //handler for change checkbox
    const changeStatusHandler = (tID: string, isDone: boolean) => {
        props.changeTaskStatus(tID, isDone)
    }

    //mapped list-element and delete button
    const mappedTask = props.taskItem.map(t => <li style={{listStyleType: 'none'}}>
        <Checkbox checked={t.isDone}
                  onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}  />
        {t.title}
        <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                variant="outlined"
                onClick={() => onClickRemoveTaskItem(t.id)}>X</Button></li>
    )

    //UI
    return (
        <div>
            <div>
                <h2>{props.title}</h2>
                <InputForAddItems callBack={props.addTaskItem}/>
            </div>
            <div>
                <ul>
                    {mappedTask}
                </ul>
            </div>
            <div>
                <FilterButton callBack={props.sortedTasks}/>
            </div>
        </div>
    )
}



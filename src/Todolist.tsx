import React from 'react'
import {FilterValuesType, TaskItemType} from "./App";
import {InputForAddItems} from "./components/InputForAddItems";
import {FilterButton} from "./components/FilterButton";


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
    const changeStatusHandler = (tID: string ,isDone: boolean) => {
        props.changeTaskStatus(tID, isDone)
    }

    //mapped list-element and delete button
    const mappedTask = props.taskItem.map(t => <li><input type="checkbox"
                                                          checked={t.isDone}
                                                          onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}/>
        {t.title}
        <button onClick={() => onClickRemoveTaskItem(t.id)}>X</button></li>)

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
                <FilterButton callBack={props.sortedTasks} btnLabel={'all'}/>
                <FilterButton callBack={props.sortedTasks} btnLabel={'active'}/>
                <FilterButton callBack={props.sortedTasks} btnLabel={'completed'}/>

            </div>
        </div>
    )
}



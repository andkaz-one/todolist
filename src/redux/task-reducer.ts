import {v1} from "uuid";
import {TasksType} from "../App";
import {AddTodolistsActionType, RemoveTodolistActionType} from "./todolist-reducer";



const initialState: TasksType = {}

export const taskReducer = (state = initialState, action: TasksActionTypes): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {

            let copy = {...state}
            copy[action.todolistID].filter(t => t.id !== action.tID)
            return copy
        }
        case 'ADD-TASK': {
            let newItem = {
                id: v1(),
                title: action.title,
                isDone: false
            }

            state[action.todolistID] = [newItem, ...state[action.todolistID]]

            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            state[action.todolistID] = state[action.todolistID].map(t => t.id === action.tID ? {...t, isDone: action.isDone} : t)
            return {...state}
        }

        case 'ADD-TODOLISTS': {
            let copy = {...state}
            copy[action.todolistID] = []
            return {...copy}
        }
        case "REMOVE-TODOLIST": {
            delete state[action.todolistID]
            return {...state}
        }
        default: return state

    }
}

export type TasksActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | AddTodolistsActionType | RemoveTodolistActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (tID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        tID,
        todolistID
    } as const
}

type AddTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID
    } as const
}

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (tID: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        tID,
        isDone,
        todolistID
    } as const
}

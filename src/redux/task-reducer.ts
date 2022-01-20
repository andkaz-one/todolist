import {v1} from "uuid";
import {TasksType} from "../App";
import {AddTodolistsActionType, RemoveTodolistActionType, setTodolistsActionType} from "./todolist-reducer";


const initialState: TasksType = {}

export const taskReducer = (state = initialState, action: TasksActionTypes): TasksType => {
    switch (action.type) {
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todolosts.forEach((el)=> {
                copyState[el.id] = []
            })
            return copyState
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
        case 'REMOVE-TASK': {

            let copyState = {...state}
            copyState[action.todolistID] = state[action.todolistID].filter(t => t.id !== action.tID)
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            state[action.todolistID] = state[action.todolistID].map(t => t.id === action.tID ? {
                ...t,
                isDone: action.isDone
            } : t)
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
        case 'CHANGE-TASK-TITLE' : {
            state[action.todolistID] = state[action.todolistID].map(t => t.id === action.tID ? {
                ...t,
                title: action.title
            } : t)
            return {...state}

        }
        default:
            return state

    }
}

export type TasksActionTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | AddTodolistsActionType
    | RemoveTodolistActionType
    | ChangeTaskTitleActionType
    | setTodolistsActionType

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

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (tID: string, title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        tID,
        title,
        todolistID
    } as const
}

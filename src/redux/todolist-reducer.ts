import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";

const initialState: Array<TodolistsType> = []

export const todolistReducer = (state = initialState,action: TodolistsActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'ADD-TODOLISTS': {
            return [...state, {id: action.todolistID, title: action.title, filter: 'all'}]
        }
        case 'REMOVE-TODOLIST' : {
            return [...state.filter(tl => tl.id !== action.todolistID)]
        }
        case "SORT-TASKS": {
            return [...state.map(tl => tl.id === action.todolistID ? {...tl, filter: action.value} : tl)]
        }
        default: return  state
    }
}

export type TodolistsActionType = AddTodolistsActionType | RemoveTodolistActionType | SortedTasksActionType

export type AddTodolistsActionType = ReturnType<typeof addTodolistsAC>

export const addTodolistsAC = (title: string) => {
    return {
        type: 'ADD-TODOLISTS',
        title,
        todolistID: v1()
    } as const
}
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistID

    } as const
}

type SortedTasksActionType = ReturnType<typeof sortedTasksAC>

export const sortedTasksAC = (value: FilterValuesType, todolistID: string) => {
    return {
        type: 'SORT-TASKS',
        value,
        todolistID
    } as const
}


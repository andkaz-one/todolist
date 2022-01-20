import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {GetTodolistType, todoAPI} from "../dal/todoAPI";
import {AxiosResponse} from "axios";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {mainStateType} from "./store";

const initialState: Array<TodolistsType> = []

export type TodolistsDomainType = GetTodolistType & {filter: FilterValuesType}



export const todolistReducer = (state = initialState,action: TodolistsActionType): Array<TodolistsType> => {
    switch (action.type) {
        case "SET-TODOLIST": {
            return action.todolosts.map((tl) => {
                return {...tl, filter: 'all'}
            })
        }
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

export type TodolistsActionType = AddTodolistsActionType | RemoveTodolistActionType | SortedTasksActionType | setTodolistsActionType

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

export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>

export const setTodolistsAC = (todolosts: Array<GetTodolistType>) => {
    return {
            type: 'SET-TODOLIST',
            todolosts
        }as const

}

//THUNK

export const setTodolistTC = (dispatch: Dispatch): void => {
    todoAPI.getTodolists()
        .then((res) => {
            const todo = res.data
            dispatch(setTodolistsAC(todo))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todoAPI.createTodolist(title)
        .then((res) => {
        dispatch(addTodolistsAC(res.data.title))
    })

}

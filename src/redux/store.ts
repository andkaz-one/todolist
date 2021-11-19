import {combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";


const mainReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})




export const store = createStore(mainReducer)



export type mainStateType = ReturnType<typeof mainReducer>

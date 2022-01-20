import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./task-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunk from "redux-thunk";


const mainReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})




export const store = createStore(mainReducer, applyMiddleware(thunk))



export type mainStateType = ReturnType<typeof mainReducer>

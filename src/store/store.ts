import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../reducers/TasksReducer";
import {FilterReducer} from "../reducers/FilterReducer";

let rootReducers=combineReducers({
    tasks:TasksReducer,
    filter:FilterReducer
})

export type rootReducersType=ReturnType<typeof rootReducers>

export let store=createStore(rootReducers)
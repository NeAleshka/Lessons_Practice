import {combineReducers, createStore} from "redux";
import {TasksReducer} from "./TasksReducer";
import {TodoListReducer} from "./TodoListsReducer";


let rootReducers=combineReducers({
    Tasks:TasksReducer,
    TodoLists:TodoListReducer,
})

export type rooReducersType=ReturnType<typeof rootReducers>
export const state=createStore(rootReducers)
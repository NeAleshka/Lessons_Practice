import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {addTaskAC, removeTaskAC} from "./reducers/TasksReducer";
import {useDispatch} from "react-redux";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let dispatch=useDispatch()


    function removeTask(id: string) {
        dispatch(removeTaskAC(id))
    }
    function addTask(title: string) {
        dispatch(addTaskAC(title))
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      removeTask={removeTask}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;

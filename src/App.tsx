import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterType = 'All' | 'Active' | 'Completed'

function App() {
    const [task1, setTask] = useState([
        {id: 1, title: "Hello world11111", isDone: true},
        {id: 2, title: "I am Happy11111", isDone: false},
        {id: 3, title: "Yo11111", isDone: false}],)
    const removeTask = (mId: number) => {
        setTask(task1.filter(f => f.id !== mId))
    }
    const [filter, setMyFilter] = useState<filterType>('All')
    const setFilter = (idFilter: filterType) => {
        setMyFilter(idFilter)
    }
    let filterTask = filter === 'Active' ? task1.filter(f => f.isDone) :
        filter === 'Completed' ? task1.filter(f => !f.isDone) : task1
    console.log(filterTask)
    return (
        <div className="App">
            <Todolist
                title={"Hello world11111"}
                tasks={filterTask}
                remove={removeTask}
                setFilter={setFilter}/>
        </div>
    );
}

export default App;

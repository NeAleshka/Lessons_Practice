import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {useDispatch, useSelector} from "react-redux";
import {rootReducersType} from "./store/store";
import {changeFilterAC} from "./reducers/FilterReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let tasks = useSelector<rootReducersType, TaskType[]>(state => state.tasks)
    let filter = useSelector<rootReducersType, FilterValuesType>(state => state.filter)
    let [title, setTitle] = useState("")

    let dispatch = useDispatch()


    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }
    function changeFilter(value: FilterValuesType) {
        dispatch(changeFilterAC(value))
    }
    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");
    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}


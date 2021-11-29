import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import style from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    onChangeStatus:(CurrentId:string,value:boolean)=>void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState(false)


    const addTask = () => {
        if(title.trim()) {
            props.addTask(title.trim());
            setTitle("");
            setError(true)
        }
    else {}
    setError(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onChangeHandlerForChangeStatus = (CurrentId:string, event: ChangeEvent<HTMLInputElement>) => {
        props.onChangeStatus(CurrentId, event.currentTarget.checked)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error?style.error:''} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={style.errorMessage}>Error Name</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    /*const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.onChangeStatus(t.id, event.currentTarget.checked)
                    }*/
                    const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id}>
                        <input  type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>
                        <span className={t.isDone? style.isDone:''}>{t.title}</span>
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

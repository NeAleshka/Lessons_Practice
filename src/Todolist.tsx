import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";
import {Input} from "./components/Input";

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
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key==="Enter") {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const tsarchangeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }



return <div>
    <h3>{props.title}</h3>
    <div>
        <Input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        <Button name={'Add'} callBack={addTaskHandler}/>
    </div>
    <ul>
        {
            props.tasks.map(t => <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
               <Button name={'x'} callBack={()=>removeTaskHandler(t.id)}/>
            </li>)
        }
    </ul>
    <div>
        {/*<button onClick={()=>tsarchangeFilterHandler('all')}>All</button>
        <button onClick={()=>tsarchangeFilterHandler('active')}>Active</button>
        <button onClick={()=>tsarchangeFilterHandler('completed')}>Completed</button>*/}
        <Button name={'all'} callBack={()=>tsarchangeFilterHandler('all')}/>
        <Button name={'active'} callBack={()=>tsarchangeFilterHandler('active')}/>
        <Button name={'completed'} callBack={()=>tsarchangeFilterHandler('completed')}/>
    </div>
</div>
}


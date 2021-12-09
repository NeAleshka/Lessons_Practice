import React, {ChangeEvent} from 'react'
import {TaskType} from "./TodoList";

type propsMapTasksType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string,todoList:string) => void
    id:string
    changeTaskStatus: (todoListId:string,taskId: string, isDone: boolean) => void
}

const MapTasks = ({tasks,removeTask,id,changeTaskStatus,...props}: propsMapTasksType) => {
    return (
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id,id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                       changeTaskStatus(id, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
    )
}

export default MapTasks
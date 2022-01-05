import React from 'react'
import EditableSpan from "./EditableSpan";
import {TaskType} from "../redux/TasksReducer";

type propsTaskType = {
    task: TaskType
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
    changeStatusHandler: (taskId: string) => void
}

const Task = (props: propsTaskType) => {
    return (
        <li  style={{listStyle: 'none'}}>
            <input type={"checkbox"}
                   checked={props.task.isDone}
                   onChange={() => props.changeStatusHandler(props.task.id)}
            />
            <EditableSpan title={props.task.title} changeItem={()=> props.changeTaskTitle(props.task.id, props.task.title)}/>
            <button onClick={() => props.removeTask(props.task.id)}
                    style={{backgroundColor: 'red', color: 'white'}}>&times;</button>
        </li>
    )
}
export default Task
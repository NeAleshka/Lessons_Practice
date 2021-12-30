import {addTaskAC, changeStatusAC, removeTaskAC, TaskType} from "./redux/TasksReducer";
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import {FilterType} from "./redux/TodoListsReducer";


type TodolistType = {
    listId: string
    title: string
    filter:FilterType
    taskForTodoList: TaskType[]
    removeTodo: (listId: string) => void
    changeFilter:(listId:string,newFilter:FilterType)=>void
}


export const Todolist = ({filter,changeFilter,removeTodo, listId, title, taskForTodoList, ...props}: TodolistType) => {
    let [titleNewTask, setTitleNewTask] = useState('')
    let dispatch = useDispatch()

    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(listId, taskId))
    }
    const changeStatusHandler = (taskId: string) => {
        dispatch(changeStatusAC(listId, taskId))
    }
    const changeTitleNewTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleNewTask(e.currentTarget.value)
    }
    const addTask = () => {
        dispatch(addTaskAC(listId, titleNewTask))
        setTitleNewTask('')
    }
    if (filter==='active'as FilterType){
        debugger
        taskForTodoList=taskForTodoList.filter(f=>!f.isDone)
    }
    if (filter==='completed'as FilterType){
        debugger
        taskForTodoList=taskForTodoList.filter(f=>f.isDone)
    }

    return (
        <div style={{marginLeft: '20px'}}>
            <h3>{title}
                <button onClick={() => removeTodo(listId)}>&times;</button>
            </h3>

            <input value={titleNewTask} onChange={changeTitleNewTask}/>
            <button onClick={addTask}>+</button>
            <ul style={{padding: '0'}}>
                {taskForTodoList.map(task => {
                        return <li style={{listStyle: 'none'}}>
                            <input key={task.id} type={"checkbox"} checked={task.isDone}
                                   onChange={() => changeStatusHandler(task.id)}/>
                            <span>{task.title}</span>
                            <button onClick={() => removeTask(task.id)}
                                    style={{backgroundColor: 'red', color: 'white'}}>&times;</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={()=>changeFilter(listId,'all' as FilterType)}>all</button>
                <button onClick={()=>changeFilter(listId,'active' as FilterType)}>active</button>
                <button onClick={()=>changeFilter(listId,'completed' as FilterType)}>completed</button>
            </div>
        </div>

    )

}
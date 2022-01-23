import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./redux/TasksReducer";
import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import {changeTodoTitleAC, FilterType} from "./redux/TodoListsReducer";
import {EditableSpan} from "./components/EditableSpan";
import {Task} from "./components/Task";
import {TodoListApi} from "./todoListApi";


type TodolistType = {
    listId: string
    title: string
    filter:FilterType
    // taskForTodoList: TaskType[]
    removeTodo: (listId: string) => void
    changeFilter:(listId:string,newFilter:FilterType)=>void
}


const TodolistMemo = ({filter,changeFilter,removeTodo, listId, title,  }: TodolistType) => {
    let [titleNewTask, setTitleNewTask] = useState('')
    let dispatch = useDispatch()
    const removeTask=useCallback((taskId: string)=>{  dispatch(removeTaskAC(listId, taskId))},[dispatch,listId])

    const changeStatusHandler=useCallback((taskId: string)=>{dispatch(changeStatusAC(listId, taskId))},[dispatch,listId])
    const changeTitleNewTask=useCallback((e: ChangeEvent<HTMLInputElement>)=>{ setTitleNewTask(e.currentTarget.value)},[])
    const addTask=useCallback ( async()=>{
        await TodoListApi.postTasks(listId,titleNewTask)
        // dispatch(addTaskAC(listId, titleNewTask))
        setTitleNewTask('')},[listId, titleNewTask])



    const changeTodoTitle=useCallback((newTitle:string)=>{dispatch(changeTodoTitleAC(listId,newTitle))},[dispatch,listId])

    const changeTaskTitle=(taskId:string,newTitle:string)=>{dispatch(changeTaskTitleAC(listId,taskId,newTitle))}



   /* if (filter==='active' as FilterType){

        taskForTodoList=taskForTodoList.filter(f=>!f.isDone)
    }
    if (filter==='completed' as FilterType){
        taskForTodoList=taskForTodoList.filter(f=>f.isDone)
    }*/
    const thingToRender=useMemo(()=>{ return (
        <div style={{marginLeft: '20px'}}>
            <h3>
                <EditableSpan title={title} changeItem={changeTodoTitle}/>
                <button onClick={() => removeTodo(listId)}>&times;</button>
            </h3>
            <input value={titleNewTask} onChange={changeTitleNewTask}/>
            <button onClick={addTask}>+</button>
            {/*<ul style={{padding: '0'}}>*/}
            {/*    {taskForTodoList.map((task) => {*/}
            {/*        return <Task*/}
            {/*            key={task.id}*/}
            {/*            task={task}*/}
            {/*            changeTaskTitle={changeTaskTitle}*/}
            {/*            removeTask={removeTask}*/}
            {/*            changeStatusHandler={changeStatusHandler}*/}
            {/*        />*/}
            {/*    } )}*/}
            {/*</ul>*/}
            <div>
                {/*<button onClick={()=>changeFilter(listId,'all' as FilterType)}>all</button>*/}
                {/*<button onClick={()=>changeFilter(listId,'active' as FilterType)}>active</button>*/}
                {/*<button onClick={()=>changeFilter(listId,'completed' as FilterType)}>completed</button>*/}
            </div>
        </div>
    )},[changeFilter,removeTodo, listId, title,removeTask,changeStatusHandler,changeTitleNewTask,addTask,changeTodoTitle,titleNewTask])
return<>{thingToRender}</>


}
export const Todolist=React.memo(TodolistMemo)
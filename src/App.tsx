import {useDispatch, useSelector} from "react-redux";
import {rooReducersType} from "./redux/state";
import {
    addTodoAC, addTodoACThunk,
    changeFilterAC,
    FilterType,
    removeTodoACThunk,
    setTodoListsACThunk,
    TodoListsType
} from "./redux/TodoListsReducer";
import {Todolist} from "./Todolist";
import {addTaskForNewTodoAC, removeTodoTaskACThunk, TasksType} from "./redux/TasksReducer";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {v1} from "uuid";
import {TodoListApi} from "./todoListApi";

export const App = () => {
    const todoLists = useSelector<rooReducersType, TodoListsType[]>(state => state.TodoLists)
    const tasks = useSelector<rooReducersType, TasksType>(state => state.Tasks)
    const [titleNewTodo, setTitleNewTodo] = useState('')
    let dispatch = useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleNewTodo(e.currentTarget.value)

    }


    useEffect(() => {/*
        TodoListApi.postTasks().then((res)=>{
            console.log(res.data)
        })*/
        /*  TodoListApi.postTodoList().then((res)=>{
           console.log(res.data)
       })*/

        TodoListApi.getTodolist().then(r => {
            console.log(r.data)
        })
        dispatch(setTodoListsACThunk())
        // TodoListApi.postTodoList().then()
    }, [dispatch])


    const addNewTodo = useCallback(() => {
    dispatch(addTodoACThunk(titleNewTodo))
        setTitleNewTodo('')
    }, [dispatch, titleNewTodo])


    const removeTodo = useCallback((listId: string) => {
        dispatch(removeTodoACThunk(listId))
        dispatch(removeTodoTaskACThunk(listId))
        // dispatch(setTodoListsACThunk())
    }, [])

    const changeFilter = useCallback((listId: string, newFilter: FilterType) => {
        dispatch(changeFilterAC(listId, newFilter))
    }, [dispatch])


    return (
        <div style={{display: 'flex', alignItems: 'start'}}>
            <input type={'text'} onChange={onChangeHandler} value={titleNewTodo} style={{marginTop: '50px'}}/>
            <button onClick={addNewTodo} style={{marginTop: '50px'}}>+</button>
            {
                todoLists.map(list => {
                    return <Todolist
                        key={list.id}
                        listId={list.id}
                        title={list.title}
                        // taskForTodoList={tasks[list.id]}
                        removeTodo={removeTodo}
                        changeFilter={changeFilter}
                        filter={list.filter}
                    />
                })
            }
        </div>)
}



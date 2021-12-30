import {useDispatch, useSelector} from "react-redux";
import {rooReducersType} from "./redux/state";
import {addTodoAC, changeFilterAC, FilterType, removeTodoAC, TodoListsType} from "./redux/TodoListsReducer";
import {Todolist} from "./Todolist";
import {addTaskForNewTodoAC, removeTodoTaskAC, TasksType} from "./redux/TasksReducer";
import {ChangeEvent, useState} from "react";
import {v1} from "uuid";

export const App = () => {
    const todoLists = useSelector<rooReducersType, TodoListsType[]>(state => state.TodoLists)
    const tasks = useSelector<rooReducersType, TasksType>(state => state.Tasks)
    const [titleNewTodo, setTitleNewTodo] = useState('')
    let dispatch = useDispatch()

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitleNewTodo(e.currentTarget.value)

    }
    const addNewTodo = () => {
        let newTodo={id:v1(),title:titleNewTodo,filter:'all' as FilterType}
        dispatch(addTodoAC(titleNewTodo,newTodo.id))
        dispatch(addTaskForNewTodoAC(newTodo.id))
    }
    const removeTodo = (listId:string) => {
      dispatch(removeTodoAC(listId))
        dispatch(removeTodoTaskAC(listId))
    }
    const changeFilter = (listId:string,newFilter:FilterType) => {
        debugger
        dispatch(changeFilterAC(listId,newFilter))
    }

    return (
        <div style={{display: 'flex',alignItems:'start'}}>
            <input type={'text'} onChange={onChangeHandler} value={titleNewTodo} style={{marginTop:'50px'}}/>
            <button onClick={addNewTodo} style={{marginTop:'50px'}}>+</button>
            {
                todoLists.map(list => {
                    return <Todolist
                        key={list.id}
                        listId={list.id}
                        title={list.title}
                        taskForTodoList={tasks[list.id]}
                        removeTodo={removeTodo}
                        changeFilter={changeFilter}
                        filter={list.filter}
                    />
                })
            }
        </div>)
}
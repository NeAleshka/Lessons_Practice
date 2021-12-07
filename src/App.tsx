import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import TodoList from './TodoList';


// Create
// Read
// Update
// Delete
// CRUD
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: TaskType[]
}



function App() {
    //BLL:
    const todoList_1 = v1()
    const todoList_2 = v1()
    const [tasks, setTasks] = useState<TaskStateType>({
            [todoList_1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "REACT", isDone: false},
            ],
            [todoList_2]: [
                {id: v1(), title: "MILK", isDone: true},
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
            ]
        })
    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoList_1, title: 'What to learn', filter: 'all'},
        {id: todoList_2, title: 'What to buy', filter: 'all'},
    ])

    const removeTodoList=(todoListId: string)=>{
        setTodoList(todoList.filter(list=>list.id!==todoListId))
    }


    // const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        const filteredTodoList = todoList.map(tl => tl.id === todoListId ? {...tl, filter} : tl)
        setTodoList(filteredTodoList)
    }
    const removeTask = (taskID: string, todoListId: string) => {
        tasks[todoListId] = tasks[todoListId].filter(task => task.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (newTaskTitle: string, todoListId: string) => {

        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const copyState = {...tasks}
        copyState[todoListId] = [newTask, ...tasks[todoListId]]
        setTasks(copyState)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        const copyState = {...tasks}
        copyState[todoListId] = tasks[todoListId].map(f => f.id === taskID ? {...f, isDone} : f)
        setTasks(copyState)
    }

    //UI:
    const getTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }
    const todoLists = todoList.map(tl => {
        let tasksForRender=getTasksForRender(tl)
        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />)
    })

    return (
        <div className="App">
            {todoLists}
        </div>
    );
}

export default App;

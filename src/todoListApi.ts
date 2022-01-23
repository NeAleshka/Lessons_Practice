import axios from "axios";
import {todoListId1, TodoListsType} from "./redux/TodoListsReducer";
import {TasksType} from "./redux/TasksReducer";


let instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1',
    withCredentials:true,
    headers:{
        "API-KEY":'5c307fb1-789c-4ae7-a503-dc687e2a012c'
    }
})


export const TodoListApi={
    postTodoList:(todoTitle:string)=>{
        return instance.post<{ data:responseData}>('/todo-lists',{title:todoTitle})
    },
    postTasks:(listId :string,titleNewTask:string)=>{
        return instance.post<TasksType>(`/todo-lists/${listId}/tasks`,{ title: titleNewTask})
    },
    getTodolist:()=>{
        return instance.get<TodoListsType[]>('/todo-lists')
    },
    getTasks:()=>{
        return instance.get(`/todo-lists/${todoListId1}/tasks`)
    },
    deleteTodo:(listId:string)=>{
        return instance.delete<string>(`/todo-lists/${listId}`)
    }
}

type responseData={
    addedDate: string
    id: string
    order: number
    title: string
}

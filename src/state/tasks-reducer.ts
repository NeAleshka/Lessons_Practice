import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistsActionType} from './todolists-reducer';
import {TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task:TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    task:TaskType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
  task:TaskType
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistsActionType
|SetTasksActionType

const initialState: TasksStateType = {
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLIST":{
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;

        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.task.todoListId];
            state[action.task.todoListId] = todolistTasks
                .map(t => t.id === action.task.id ? action.task : t);
            return ({...state});
        }

        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.task.todoListId];
            // найдём нужную таску:
            state[action.task.todoListId] = todolistTasks
                .map(t => t.id === action.task.id ? action.task : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK',task}
}

export const updateTaskTitleAC = (task:TaskType): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', task}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const removeTaskTC=(id:string,todolistId:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.deleteTask(todolistId,id).then(()=>dispatch(removeTaskAC(id,todolistId)))
}

export const addTaskTC=(title:string,todolistId:string)=>(dispatch:Dispatch)=>{
    todolistsAPI.createTask(todolistId,title).then(res=>dispatch(addTaskAC(res.data.data.item)))
}

export const updateTaskTC=(todolistId:string,taskId:string,change:Partial<TaskType>)=>(dispatch:Dispatch,getState:()=>AppRootStateType)=>{
    const task=getState().tasks[todolistId].find(f=>f.id===taskId) as TaskType
    todolistsAPI.updateTask({...task,...change}).then(res=>dispatch(updateTaskTitleAC(res.data.data.item)))
}


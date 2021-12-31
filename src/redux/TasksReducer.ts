import {v1} from "uuid";
import {todoListId1, todoListId2} from "./TodoListsReducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}

export let initialState: TasksType = {
    [todoListId1]:
        [{id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'TypeScript', isDone: false}
        ],
    [todoListId2]:
        [
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
        ]
}

export const TasksReducer = (state = initialState, action: allTasksReducersType): TasksType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case "CHANGE_STATUS": {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    isDone: !m.isDone
                } : m)
            }
        }
        case "ADD_TASK": {
            let newTask = {id: v1(), title: action.payload.titleNewTask, isDone: false}
            return {...state, [action.payload.listId]: [...state[action.payload.listId], newTask]}
        }
        case "ADD_TASK_FOR_NEW_TODO": {
            return {...state, [action.payload.listId]: []}
        }
        case "REMOVE_TASK_WITH_TODO": {
            const copyState = {...state}
            delete copyState[action.payload.listId]
            return copyState
        }
        case "CHANGE_TASK_TITLE": {
            let copyState = {...state}
          copyState={...copyState,[action.payload.listId]:copyState[action.payload.listId].map(m=>m.id===action.payload.taskId?{...m,title:action.payload.newTitle}:m)}
            return copyState
        }

        default:
            return state
    }


}


type allTasksReducersType =
    removeTaskACType
    | changeStatusACType
    | addTaskACType
    | addTaskForNewTodoType
    | removeTodoTaskACType
    | changeTaskTitleACType

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (listId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            listId, taskId,
        }
    } as const
}

export type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (listId: string, taskId: string) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            listId, taskId,
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (listId: string, titleNewTask: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            listId, titleNewTask
        }
    } as const
}

export type addTaskForNewTodoType = ReturnType<typeof addTaskForNewTodoAC>
export const addTaskForNewTodoAC = (listId: string) => {
    return {
        type: 'ADD_TASK_FOR_NEW_TODO',
        payload: {
            listId
        }
    } as const
}


export type removeTodoTaskACType = ReturnType<typeof removeTodoTaskAC>
export const removeTodoTaskAC = (listId: string) => {
    return {
        type: 'REMOVE_TASK_WITH_TODO',
        payload: {
            listId
        }
    } as const
}

export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (listId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            listId, taskId, newTitle,
        }
    } as const
}



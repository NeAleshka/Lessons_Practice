import {Dispatch} from "redux";
import {v1} from "uuid";
import {TodoListApi} from "../todoListApi";


export const todoListId1 = v1()
export const todoListId2 = v1()

export type FilterType = "All" | 'Active' | "Completed"
export type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}


export let initialStateTodo: TodoListsType[] = []


export const TodoListReducer = (state = initialStateTodo, action: allType) => {

    switch (action.type) {
        case "ADD_TODO": {
            return [{id:action.payload.todoId, title: action.payload.todoTitle,filter:'All'}, ...state]
        }
        case 'REMOVE_TODO': {
            return [...state.filter(f => f.id !== action.payload.listId)]
        }
        case "CHANGE_FILTER": {
            return [...state.map(m => m.id === action.payload.listId ? {...m, filter: action.payload.newFilter} : m)]
        }
        case "CHANGE_TITLE": {
            return [...state.map(m => m.id === action.payLoad.todoId ? {...m, title: action.payLoad.newTitle} : m)]
        }

        case 'Set_TodoList': {
            return [...state, ...action.todoLists]
        }
        default:
            return state
    }
}


type allType = addTodoACType | removeTodoACType | changeFilterACType | changeTodoTitleACType | setTodoListsACType

export type addTodoACType = ReturnType<typeof addTodoAC>
export const addTodoACThunk = (newTitle:string) => (dispatch: Dispatch) => {
    TodoListApi.postTodoList(newTitle)
        .then((res) => {
            console.log('REsponse', res)
            dispatch(addTodoAC(newTitle,res.data.data.id))
    })
}
export const addTodoAC = (todoTitle: string,todoId:string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            todoTitle,todoId
        }
    } as const
}
export type removeTodoACType = ReturnType<typeof removeTodoAC>
export const removeTodoAC = (listId: string) => {
    return {
        type: 'REMOVE_TODO',
        payload: {
            listId,
        }
    } as const
}
export const removeTodoACThunk = (todoId: string) => (dispatch: Dispatch) => {
    TodoListApi.deleteTodo(todoId).then((res)=>{
        dispatch(removeTodoAC(todoId))
    })

}
export type setTodoListsACType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todoLists: TodoListsType[]) => {
    return {
        type: 'Set_TodoList',
        todoLists,
    } as const
}
export const setTodoListsACThunk = () => (dispatch: Dispatch) => {
    TodoListApi.getTodolist().then((res) => {
        dispatch(setTodoListsAC(res.data))
    })
}


export type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (listId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            listId, newFilter,
        }
    } as const
}

export type changeTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todoId: string, newTitle: string) => {
    return {
        type: 'CHANGE_TITLE',
        payLoad: {
            todoId, newTitle,
        }
    } as const
}







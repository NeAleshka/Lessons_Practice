import {v1} from "uuid";

export const todoListId1=v1()
export const todoListId2=v1()

export type FilterType="All"|'Active'|"Completed"
export type TodoListsType={
    id:string
    title:string
    filter:FilterType
}


let initialState:TodoListsType[]=[
    {id:todoListId1,title:"What to learn", filter:'All'},
    {id:todoListId2,title:"What to buy", filter:'All'},
]

export const TodoListReducer = (state=initialState,action:allType) => {

switch (action.type){
    case "ADD_TODO":{
        return [...state,{id:action.payload.newTodoId,title:action.payload.newTitle,filter:'All'}]
    }
    case 'REMOVE_TODO':{
        return [...state.filter(f=>f.id!==action.payload.listId)]
    }
    case "CHANGE_FILTER":{
        return [...state.map(m=>m.id===action.payload.listId?{...m,filter:action.payload.newFilter}:m)]
    }
    case "CHANGE_TITLE":{
        return [...state.map(m=>m.id===action.payLoad.todoId?{...m,title:action.payLoad.newTitle}:m)]
    }
    default:return state
}
}




type allType=addTodoACType|removeTodoACType|changeFilterACType|changeTodoTitleACType

export type addTodoACType=ReturnType<typeof addTodoAC>
export const addTodoAC = (newTitle:string,newTodoId:string) => {
  return{
      type:'ADD_TODO',
      payload:{
          newTitle,newTodoId
      }
  }as const
}

export type removeTodoACType=ReturnType<typeof removeTodoAC>
export const removeTodoAC = (listId:string) => {
    return{
        type:'REMOVE_TODO',
        payload:{
            listId,
        }
    }as const
}

export type changeFilterACType=ReturnType<typeof changeFilterAC>
export const changeFilterAC = (listId:string,newFilter:FilterType) => {
  return{
      type:'CHANGE_FILTER',
      payload:{
          listId,newFilter,
      }
  }as const
}

export type changeTodoTitleACType=ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todoId:string,newTitle:string) => {
  return{
      type:'CHANGE_TITLE',
      payLoad:{
          todoId,newTitle,
      }
  }as const
}
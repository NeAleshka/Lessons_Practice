import {changeStatusAC, changeTaskTitleAC, removeTaskAC, removeTodoTaskAC, TasksReducer} from "./TasksReducer";
import {changeTodoTitleAC, TodoListReducer, TodoListsType} from "./TodoListsReducer";

export {}

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TasksType = {
    [key: string]: TaskType[]
}
const todoListId1 = '1'
const todoListId2 = '2'

const taskID_1 = '1'
const taskID_2 = '2'
const taskID_3 = '3'
const taskID_4 = '4'

let initialStateTodo:TodoListsType[]=[
    {id:todoListId1,title:"What to learn", filter:'All'},
    {id:todoListId2,title:"What to buy", filter:'All'},
]

let initialState: TasksType = {
    [todoListId1]:
        [
            {id: taskID_1, title: 'HTML', isDone: false},
            {id: taskID_2, title: 'CSS', isDone: false},
            {id: taskID_3, title: 'React', isDone: false},
            {id: taskID_4, title: 'TypeScript', isDone: false}
        ],
    [todoListId2]:
        [
            {id: taskID_1, title: 'Meat', isDone: false},
            {id: taskID_2, title: 'Bread', isDone: false},
            {id: taskID_3, title: 'Beer', isDone: false},]
}


test("REMOVE_TASK", () => {

    let copyState = TasksReducer(initialState, removeTaskAC(todoListId1, taskID_1))

    expect(copyState === initialState).toBe(false)
    expect(initialState[todoListId1].length).toBe(4)
    expect(copyState[todoListId1].length).toBe(3)
    expect(copyState[todoListId1].filter(l => l.id !== taskID_1)).toBeTruthy()
    expect(copyState[todoListId1].every(l => l.id !== taskID_1)).toBe(true)

})

test("CHANGE_TASK_STATUS", () => {

    let copyState = TasksReducer(initialState, changeStatusAC(todoListId2, taskID_1))

    expect(copyState === initialState).toBe(false)
    expect(initialState[todoListId2][0].isDone).toBe(false)
    expect(copyState[todoListId2][0].isDone).toBe(true)
    expect(copyState[todoListId2][0] === initialState[todoListId2][0]).toBe(false)
})

test('remove_list_and_tasks', ()=>{
    let copyState = TasksReducer(initialState, removeTodoTaskAC(todoListId2))
    expect(copyState === initialState).toBe(false)  // не копируется объект
    expect(copyState[todoListId2]).toBe(undefined)
    expect(Object.keys(copyState).every(ev=>ev!==todoListId2)).toBe(true)
})

test('change_title_Todo', ()=>{
    let copyState =TodoListReducer(initialStateTodo, changeTodoTitleAC(todoListId1,'Привет'))
    expect(copyState === initialStateTodo).toBe(false)  // не копируется объект
    expect(copyState[0].title).toBe("Привет")
})

test('change_title_task', ()=>{
    let copyState = TasksReducer(initialState, changeTaskTitleAC( todoListId1,taskID_2,'Привет'))
    expect(copyState === initialState).toBe(false)  // не копируется объект
    expect(copyState[todoListId1][1].title==="Привет").toBe(true)

})
import React, {useState} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todoListsType={
    id: string, title: string, filter: FilterValuesType
}


function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string, todoListId:string) {
  setTasks({...tasks,[todoListId]:tasks[todoListId].filter(task=>task.id!==id)})
    }

    function addTask(todoListId:string, title: string) {
        let newTasks = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todoListId]:[newTasks,...tasks[todoListId]]})
    }

    function changeStatus(todoListId:string,taskId: string, isDone: boolean) {
   setTasks( {...tasks,[todoListId]:tasks[todoListId].map(task=>task.id===taskId?{...task,isDone}:task)})


        /*     let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);*/
    }


    function changeFilter(todoListId:string,value: FilterValuesType) {
      setTodoLists(todoLists.map(m=>m.id===todoListId?{...m,filter:value}:m))
    }


    return (
        <div className="App">
            {
                todoLists.map(list=>{
                    let tasksForTodolist=tasks[list.id]
                    if (list.filter === "active") {
                        tasksForTodolist = tasks[list.id].filter(t => !t.isDone);
                    }
                    if (list.filter === "completed") {
                        tasksForTodolist = tasks[list.id].filter(t => t.isDone);
                    }

                    return(
                        <Todolist
                            key={list.id}
                            id={list.id}
                            title={list.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={list.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;

import React from "react";
import {filterType} from "./App";

type propsType={
    title:string
    tasks:Array<inPropsType>
    remove:(id:number)=>void
    setFilter:(idFilter:filterType)=>void
}
type inPropsType={
    id:number,
    title: string,
    isDone: boolean

}
export const Todolist=(props:propsType)=>{
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(m => {
                    return (
                        <li key={m.id}>
                            <button onClick={()=>props.remove(m.id)}>x</button>
                            <input type="checkbox"
                              checked={m.isDone}/>
                            <span>{m.title}</span>
                        </li>
                        )})}
            </ul>
            <div>
                <button onClick={()=>props.setFilter('All')}>All</button>
                <button onClick={()=>props.setFilter('Active')}>Active</button>
                <button onClick={()=>props.setFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}


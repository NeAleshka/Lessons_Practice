import React, {ChangeEvent,KeyboardEvent} from 'react'

type propsInputType = {
    value:string
    onChange:(event:ChangeEvent<HTMLInputElement>)=>void
    onKeyPress:(event:KeyboardEvent<HTMLInputElement>)=>void
}

export const Input = ({value,onChange,onKeyPress}:propsInputType) => {


    return (
       <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
    )
}

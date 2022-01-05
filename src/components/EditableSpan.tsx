import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type propsEditableSpanType = {
    title: string
    changeItem:(title: string)=>void
}

const EditableSpan = (props: propsEditableSpanType) => {
    const [localTitle, setLocalTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(true)

    const changeEditModeHandler = () => {
      setEditMode(!editMode)
    }
    const changeLocalTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setLocalTitle(e.currentTarget.value)
        props.changeItem(e.currentTarget.value)
    }
    const enterPress=(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter')
        setEditMode(!editMode)
    }

    return (
       <>
           {editMode ?
               <span onClick={changeEditModeHandler} defaultValue={localTitle}>{localTitle}</span> :
               <input onKeyPress={enterPress} value={localTitle} onBlur={changeEditModeHandler} onChange={changeLocalTitleHandler} autoFocus/>
           }
       </>
    )
}

export default EditableSpan
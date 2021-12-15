import React, {ChangeEvent, useState} from 'react'

type propsEditTaskType = {
    title: string
    callBackForEditTask: (localTitle: string, id?: string ) => void
    id?: string
}

const EditTask = (props: propsEditTaskType) => {
    const [edit, setEdit] = useState(false)
    const [localTitle, setLocalTitle] = useState(props.title)

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.callBackForEditTask(localTitle,props.id)
    }

    return (
        edit ?
            <input value={localTitle} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    )
}

export default EditTask
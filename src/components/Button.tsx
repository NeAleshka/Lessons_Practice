import React from 'react'

type propsButtonType = {
    name:string
    callBack:()=>void
}

export const Button = (props: propsButtonType) => {
   const onClickHundler=()=>{
       props.callBack()
   }
   return (
        <button onClick={onClickHundler}>{props.name}</button>
    )
}

export default Button
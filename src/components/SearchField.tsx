import React, {ChangeEvent} from 'react'
import {TextField} from "@mui/material";

type SearchFieldType={
    sx?:{}
    value?:string
    onChange?:(event:ChangeEvent<HTMLInputElement>)=>void
}


export const SearchField = ({sx,value,onChange}:SearchFieldType) => {
    return (
        <TextField placeholder={'Enter TodoList Name'} sx={sx} fullWidth={true} value={value} onChange={onChange}>
        </TextField>
    )
}


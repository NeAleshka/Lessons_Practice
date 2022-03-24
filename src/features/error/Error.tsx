import React from 'react'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


export const Error = () => {
    const navigate=useNavigate()
    return (
        <div style={{textAlign: 'center'}}>
            <div style={{color:'#1976d2',fontSize:'100px',fontWeight:'bold'}}>404</div>
            <h1>Page not found</h1>
            <Button variant={'contained'} color={'primary'} onClick={()=>navigate('/')}>
                Go Home
            </Button>
        </div>
    )
}


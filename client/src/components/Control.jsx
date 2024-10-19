import React from 'react'
import DrawIcon from '@mui/icons-material/Draw';
import TitleIcon from '@mui/icons-material/Title';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import { Button } from '@mui/material';
const Control = ({setDrawingMode}) => {
  return (
    <div><Button onClick={()=>{setDrawingMode('draw')}}><DrawIcon/></Button>
    <Button onClick={()=>{setDrawingMode('text')}}><TitleIcon/></Button>
    <Button onClick={()=>{setDrawingMode('rectangle')}}><RectangleOutlinedIcon/></Button>
    </div>
  )
}

export default Control
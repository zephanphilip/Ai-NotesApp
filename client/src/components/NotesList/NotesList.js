import React from 'react'
import {Card, CardContent,  Typography} from '@mui/material'
import './notelist.css'


function NotesList({record}) {


    //function to truncate notes
    const truncateDescription = (notes) => {
        if (notes.length>55) {
            return notes.substring(0,50)+'...';
        }
        return notes
    }


  return (
    <Card  sx={{padding:{xs:0}, borderRadius:2, minwidth:{sm: 275},width:{xs:380},minheight: {sm: 275},bgcolor: '#F0ECE5'}} >
        
        <CardContent sx={{color:"white"}}>
            <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                {record.title}
            </Typography>
            <Typography sx={{ fontSize:14}} color="text.secondary" paragraph>
                {truncateDescription(record.notes)}
            </Typography>
        </CardContent>
    </Card>
  )
}

export default NotesList

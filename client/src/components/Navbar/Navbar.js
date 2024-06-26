import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import {useUser} from '@clerk/clerk-react'

function Navbar() {
  const { user } = useUser()

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h4'>Notes</Typography>
        <Typography variant='h4'>{user?.firstName}</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Box, Button } from '@mui/material';
import './auth.css';

function Auth() {
  return (
    <Box className="auth-container">
      <Box className="auth-image">
        <img src="https://cdn.pixabay.com/photo/2023/07/18/16/24/grid-8135179_1280.png" alt="Auth Image" />
      </Box>
      <Box className="auth-content" sx={{color:'whitesmoke'}}>
        <h3>Create your daily </h3>
        <h2 className='words-styling'>Notes.</h2>
        <SignedOut>
          <SignInButton  mode='modal'><Button sx={{color:'black', bgcolor:'#F0ECE5'}} variant='contained'>Get Started</Button></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </Box>
    </Box>
  );
}

export default Auth;

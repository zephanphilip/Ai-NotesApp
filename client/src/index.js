import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ClerkProvider} from '@clerk/clerk-react'

const root = ReactDOM.createRoot(document.getElementById('root'));
const publishableKey=process.env.REACT_APP_CLERK_PUBLISHABLE_KEY; 

if(!publishableKey){
  throw new Error('Please provide a publishable key')
}

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
    <App />
    </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

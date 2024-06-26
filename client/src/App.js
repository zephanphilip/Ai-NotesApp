import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Auth from './pages/auth/Auth';
import Navbar from './components/Navbar/Navbar';
import { NotesRecordProvider} from './context/notesRecordContext';
import NoteEditor from './components/NoteEditor/NoteEditor';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

function App() {
  const user = useUser();
  console.log("finding user exists", user);
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={user.user? <NotesRecordProvider><Dashboard/></NotesRecordProvider> : <Navigate to='/auth'/>}/>
        <Route path='/edit' element={user.user? <NotesRecordProvider><NoteEditor/></NotesRecordProvider> : <Navigate to='/auth'/>}/>
        <Route path='/auth' element={user.user? <Navigate to='/'/> : <Auth/>}/>
      </Routes>
    </Router>
  );
}

export default App;

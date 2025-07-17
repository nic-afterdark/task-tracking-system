import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CreateTask from './Pages/CreateTask';
import Dashboard from './Pages/Dashboard';
import EditTask from './Pages/Edit';
const App = () => {
  return (
    <div className='bg-gradient-to-r from-[#F28383] from-10% via-[#9D6CD2] via-30% to-[#481EDC] to-90% flex items-center justify-center h-screen'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/auth' element={<Auth/>}></Route>
          <Route path='/auth/login' element={<Login/>}></Route>
          <Route path='/auth/signup' element={<Signup/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/dashboard/add' element={<CreateTask/>}></Route>
          <Route path="/dashboard/edit/:taskId" element={<EditTask />} />

          

          
        </Routes>
    </div>
  )
}

export default App

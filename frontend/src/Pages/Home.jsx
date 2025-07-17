import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigateTo=useNavigate();
  return (
    <div>
        <h1 className='text-7xl font-bold text-white text-center'>Task Tracking System</h1>
        <button className='border-2 px-3 py-2 rounded-lg  bg-blue-500 space-y-6'
                onClick={()=>navigateTo('/auth')}>Get Started</button>
    </div>
  )
}

export default Home

import React from 'react'
import { Outlet } from 'react-router-dom'
import Siderbar from './components/Siderbar'

const Layout = () => {
  return (
    <div className='flex bg-gray-50'>
    <Siderbar/>
    <main className='flex-1 '>
        <Outlet/>
    </main>
    
    </div>
  )
}

export default Layout
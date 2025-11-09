import React from 'react'
import { Outlet } from 'react-router-dom'
import Siderbar from './components/Siderbar'

const Layout = () => {
  return (
    <>
    <Siderbar/>
    <main>
        <Outlet/>
    </main>
    
    </>
  )
}

export default Layout
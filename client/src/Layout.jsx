import React from 'react'
import AppNavbar from './components/AppNavbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <AppNavbar/>
    <main>
        <Outlet/>
    </main>
    
    </>
  )
}

export default Layout
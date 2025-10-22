import React from 'react'
import '../styles/Userlayout.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Userlayout = () => {
  return (
    <main className="userlayout">
<Header />
<Outlet />
<Footer />

    </main>
  )
}

export default Userlayout
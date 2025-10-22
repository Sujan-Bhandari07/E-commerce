import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Header.css'
import * as assets from '../assets/fassets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setisauth } from '../services/Userslice.jsx'
import toast from 'react-hot-toast'


const Header = () => {
  const {totalQuantity}= useSelector(state=>state.cart)
  const {isauth}= useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispacthc = useDispatch()



  return (
<main className="header">
<nav className="navbar">
    <p className="logo" onClick={() => navigate("/")}> 
<img  src={assets.assets.logo} alt="Logo" />
    </p>
    <ul>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/collection" 
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          COLLECTION
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          ABOUT
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => isActive ? "active" : undefined}
        >
          CONTACT
        </NavLink>
      </li>
    </ul>
    <p className="navright">
     <NavLink   > <img src={assets.assets.search_icon} alt="Search" /></NavLink>

     {isauth ? (

       <div style={{ cursor: 'pointer' }} onClick={() => { toast.success("Logout successfull");dispacthc(setisauth({login: false})); navigate("/login") }}>
         Logout
       </div>
     ) : (
       <NavLink to={"/login"}>
         <img src={assets.assets.profile_icon} alt="Profile" />
       </NavLink>
     )}
     <NavLink className="jjj" to={"/cart"} > <img src={assets.assets.cart_icon} alt="Search" /> <p className="number">{totalQuantity}</p></NavLink>


    </p>

  </nav>
</main>
  )
}

export default Header
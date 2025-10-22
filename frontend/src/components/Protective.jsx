import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const Protective = ({ children }) => {

  const{isauth}= useSelector(state=>state.user)
  const location = useLocation()
  const navigate= useNavigate()

  useEffect(() => {
    if(!isauth && !location.pathname.includes("/login")){
      navigate("/login")
    }
    if(isauth && location.pathname.includes("/login")){
      navigate("/")
    }
  }, [isauth, location.pathname, navigate])

  return (
<main className="protective">{children}</main>
  )
}

export default Protective
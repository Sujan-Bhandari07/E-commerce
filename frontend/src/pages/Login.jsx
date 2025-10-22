
import React, { useEffect, useState } from 'react'
import '../styles/Login.css'
import { useLoginMutation, useRegisterMutation } from '../services/Userapi'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setisauth } from '../services/Userslice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

const navigate =  useNavigate()

const dispatch =useDispatch()

  const [isSignUp, setIsSignUp] = useState(true)
  const [register, { data: registerData, isError: registerIsError, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterMutation()
  const [login, { data: loginData, isError: loginIsError, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginMutation()

  const [credentials, setCredentials] = useState({
    names: '',
    email: '',
    password: ''
  })

  // Handle register toast notifications
  useEffect(() => {
    let toastId;
    if (registerIsLoading) {
      toastId = toast.loading('Registering...')
    }
    if (registerIsError) {
      toast.error(registerError?.data?.message || 'Registration failed')
    }
    if (registerIsSuccess) {
      localStorage.setItem("token",true)
      dispatch(setisauth({login:true}))
      navigate("/")
      

      toast.success(registerData?.message || 'Registration successful')
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  }, [registerIsError, registerIsLoading, registerIsSuccess, registerData, registerError])

  // Handle login toast notifications
  useEffect(() => {
    let toastId;
    if (loginIsLoading) {
      toastId = toast.loading('Logging in...')
    }
    if (loginIsError) {
      toast.error(loginError?.data?.message || 'Login failed')
    }
    if (loginIsSuccess) {
      // Debug: Log the actual response
      console.log('Login response data:', loginData)
      console.log('Message value:', loginData?.message)
      
      localStorage.setItem("token",true)
      dispatch(setisauth({login:true}))
      toast.success('Login successful')
      
      // Check user role from the response
      if(loginData?.message === "admin"){
        console.log('Navigating to admin panel')
        navigate("/admin/add")
      }
      else{
        console.log('Navigating to home')
        navigate("/")
      }
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  }, [loginIsError, loginIsLoading, loginIsSuccess, loginData, loginError])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (isSignUp) {
        const result = await register({
          data: {
            name: credentials.names,
            email: credentials.email,
            password: credentials.password
          }
        }).unwrap()
        
        if (result?.success) {
          setCredentials({
            names: '',
            email: '',
            password: ''
          })
        }
      } else {
        const result = await login({
          data: {
            email: credentials.email,
            password: credentials.password
          }
        }).unwrap()
        
        if (result?.success) {
          setCredentials({
            names: '',
            email: '',
            password: ''
          })
        }
      }
    } catch (err) {
      // Error handling is done in useEffect hooks
      console.error('Submit error:', err)
    }
  }

  return (
    <main className="login">
      <section className="form">
        <p>{isSignUp ? "SIGN UP" : "SIGN IN"}</p>
        <form onSubmit={handleSubmit}>
          <input 
            name='names' 
            onChange={handleChange} 
            value={credentials.names} 
            className={isSignUp ? "block" : "none"} 
            type="text" 
            placeholder='Enter your name'
            required={isSignUp}
          />
          <input 
            required 
            name='email' 
            onChange={handleChange} 
            value={credentials.email} 
            type="email" 
            placeholder='Enter your email'
          />
          <input 
            required 
            name='password' 
            onChange={handleChange} 
            value={credentials.password} 
            type="password" 
            placeholder='Enter your password'
          />
          
          <section className="bottommm">
            <p>Forget your password?</p>
            <p onClick={() => setIsSignUp(prev => !prev)}>
              {isSignUp ? "Login here" : "Create account"}
            </p>
          </section>
          <p className='a'>
            <button type='submit'>
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}

export default Login

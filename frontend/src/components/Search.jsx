import React, { useState, useEffect } from 'react'
import * as assets from '../assets/fassets/assets.js'
import '../styles/Search.css'
import { useDispatch, useSelector } from 'react-redux'
import { setsearch } from '../services/Userslice.jsx'

const Search = () => {
  const search = useSelector((state) => state.user.search)
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState(search)
  // console.log(search)


  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const debouncedDispatch = debounce((value) => {

    dispatch(setsearch({value:value}))
  }, 300)

  const handleChange = (e) => {
    setInputValue(e.target.value)
    debouncedDispatch(e.target.value)
  }

  useEffect(() => {
    return () => {
      // Cleanup on unmount if needed
      // dispatch(setsearch(''))
    }
  }, [])

  return (
    <section className="searchcom">
      <section className="bor">
        <form className='searchform'>
          <input onChange={handleChange} value={inputValue} className="search" type="text" />
          <figure className="image">
            <img src={assets.assets.search_icon} alt="" />
          </figure>
        </form>
        <figure className="cross">
          <img src={assets.assets.cross_icon} alt="" />
        </figure>
      </section>
    </section>
  )
}

export default Search

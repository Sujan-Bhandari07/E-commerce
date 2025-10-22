import React from 'react'
import '../styles/Card.css'
import { useNavigate } from 'react-router-dom'

const Card = ({img,name,price,id}) => {

 const navigate = useNavigate()




  



  return (

    <figure onClick={() => {navigate(`/product/${id}`);}} className='card'>
        <img src={img}alt="" />
        <figcaption className='caption'>
<p className="name">
    {name}
</p>
    <p className="price">$ {price}</p>
        </figcaption>
    </figure>

  )
}

export default Card
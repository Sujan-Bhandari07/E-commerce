import React from 'react'
import '../styles/Cart.css'
import bin_icon from '../assets/fassets/bin_icon.png'
import img from '../assets/fassets/p_img3.png'
import { useDispatch, useSelector } from 'react-redux'
import { decreseitem, increaseitem, removeitem } from '../services/Cartslice.jsx'
import { useNavigate } from 'react-router-dom'



const Cart = () => {
const dispatch = useDispatch()

const navigate =useNavigate()
const {items:cartitem,totalQuantity,totalPrice,ship} = useSelector(state => state.cart)


  return (
<main  className="cartcon">
<p><span>YOUR</span> CART ---</p>
  <section className="boges">
    {cartitem?.map((item)=>(
      <>
       <section key={item._id} className="bogs">


<section className="left">
<figure>
  <img src= {item.image}alt="" />
</figure>
<p className="desc">
  <p className="name">{item.name}</p>
  <p className="tala">

  <p className="price">${item.price}</p>
<p className="size">{item.size}</p>
  </p>
</p>
</section>
<section className="mid">

  <p className='ttt'    onClick={()=>dispatch(decreseitem({id:item._id,size:item.size}))}>-</p>
  <p>{item.quantity}</p>
  <p className='ttt'     onClick={()=>dispatch(increaseitem({id:item._id,size:item.size}))}  >+</p>
</section>
<section className="right">
  <figure className='ttt'  >

  <img   onClick={()=>dispatch(removeitem({id:item._id,size:item.size}))}  src={bin_icon} alt="" />
  </figure>
</section>
    </section>
      </>
  ))}
    {/*  */}


   


    <section className="payments">
      <p><span>CART</span> TOTALS---</p>
      <section className="totals">
        <p className="subtotals">
          <p>Subtotal</p>
          <p>${totalPrice}</p>
        </p>
        <p className="shippings">
        <p>Shipping Fee</p>
        <p>${ship}</p>
        </p>
        <p className="total">
        <p>Total</p>
        <p>${totalPrice + ship}</p>
        </p>
      </section>
      <button onClick={()=> navigate("/placeorder")} className="payment">
        PROCEED TO CHECKOUT
      </button>
    </section>
  </section>
</main>
  )
}

export default Cart
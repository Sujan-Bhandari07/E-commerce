import React, { useState } from 'react'
import '../styles/Placeorder.css'
import stripeLogo from '../assets/fassets/stripe_logo.png';
import razorpayLogo from '../assets/fassets/razorpay_logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAddinfoMutation } from '../services/Productapi';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { removeall } from '../services/Cartslice';
const Placeorder = () => {

  const navigate = useNavigate()
const [method, setmethod] = useState("")
  const{totalPrice,ship,items,totalQuantity}=useSelector(state=>state.cart)
 const[Addinfo,{data,isLoading,error,isError,isSuccess}]= useAddinfoMutation()
 // console.log(data)
 const dispatch = useDispatch()
 

const [value, setvalue] = useState({
  firstname:"",
  lastname:"",
  country:"",
  street:"",
  city:"",
  state:"",
  email:"",
  zipcode:"",
  phone:"",
  
  
})
const handlechange = (e) => {
  const { name, value } = e.target;
  setvalue((prev) => ({ ...prev, [name]: value }));
};


// const [info, setinfo] = useState({
//   subtotal:totalPrice,
//   ship:ship,
//   total:totalPrice + ship,
//   method:method
// })


const handlesubmit = async(e)=>{
  e.preventDefault()

  if(value.firstname === "" ||
    value.lastname === "" ||
  value.country === "" ||
  value.street === "" ||
  value.city === "" ||
  value.state === "" ||
  value.email === "" ||
  value.zipcode === "" ||
  value.phone === "" ||
  method === ""
  ){
    return toast.error("pls provide all credentials")

  }

 let response = await Addinfo({data:{
    info:value,cart:{
      items,totalPrice,totalQuantity,ship,method
    },}}).unwrap()

    if(response?.success){
      toast.success("Added to Placeorder")

      dispatch(removeall())
      setvalue({
firstname:"",
  lastname:"",
  country:"",
  street:"",
  city:"",
  state:"",
  email:"",
  zipcode:"",
  phone:"",
  
      })
      setmethod("")
      navigate("/myorder")
      




    }
  }

// console.log(data)


  return (
<main className="placeorder">
    <section className='dd'>
        <h4><span>DELIVERY</span> INFORMATION---</h4>
        <form >
            <section className="n">
                <input  required value={value.firstname}  type="text" placeholder='Enter your first name' name='firstname'  onChange={handlechange}    />
                <input  required value={value.lastname} type="text" placeholder='Enter your last name' name='lastname'  onChange={handlechange}    />
            </section>
            <input   required onChange={handlechange}   value={value.email}  type="email" name="email" id=""  placeholder='Enter your email'/>
            <input  required  onChange={handlechange} name='street'  value={value.street}  type="text" placeholder='Street' />
            <section className="n">
                <input   required onChange={handlechange} name="city"  value={value.city}  type="text"  placeholder='City'/>
                <input   required onChange={handlechange} name="state" value={value.state}   type="text"  placeholder='State'/>
            </section>
            <section className="n">
                <input  required onChange={handlechange}  name="zipcode"  value={value.zipcode}  type="text"  placeholder='Zip code'/>
                <input  required  onChange={handlechange} name="country"  value={value.country}  type="text"  placeholder='Country'/>
            </section>
            <input  required onChange={handlechange}   value={value.phone}   type="text" name="phone" id="" placeholder='Phone' />
        </form>
    </section>
    <section>
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
      

      <section className="method">
        <h5><span>PAYMENT</span> METHOD---</h5>
        <section className="mt">
          <button
            className={`${method === "stripe" ? "meey" : ""}`}
            onClick={() => setmethod("stripe")}
            aria-label="Pay with Stripe"
          >
            <img className="nnn" src={stripeLogo} alt="Stripe" />
          </button>
          <button
            className={`${method === "razorpay" ? "meey" : ""}`}
            onClick={() => setmethod("razorpay")}
            aria-label="Pay with Razorpay"
          >
            <img className="nnn" src={razorpayLogo} alt="Razorpay" />
          </button>
          <button
            className={`${method === "cod" ? "meey" : ""} sss`}
            onClick={() => setmethod("cod")}
          >
            Cash on delivery
          </button>
        </section>
        <button onClick={handlesubmit} className="paymentoo">
        PLACE ORDER
      </button>
      </section>
    </section>
    </section>
</main>
  )
}

export default Placeorder
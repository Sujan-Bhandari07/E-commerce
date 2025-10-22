import React from 'react'
import '../styles/Contact.css'
import contact_img from '../assets/fassets/contact_img.png'

const Contact = () => {
  return (
<main className="contact">

  <section className="top">
  <h4> <span>Contact</span>  Us ---</h4>
  <section className="contactbox">
    <figure>

    <img src={contact_img} alt="" />
    </figure>
    <address className="adress">
      <p className='dark'>  Our Store</p>
      <p   className='light' >

      <p>54079 Willims Station</p>
      <p>Suite,350 Washington,USA</p>
      </p>
      <p className='light' >

      <p>Tel:97754..</p>
      <p>Email:admin@forever.com</p>
      </p>
      <p  className='dark' >Career At Forever</p>
      <p className='light'> Learn more about ours team and job openings.</p>
      <p className="btn">Explore Jobs</p>

    </address>
  </section>
  </section>

</main>
  )
}

export default Contact
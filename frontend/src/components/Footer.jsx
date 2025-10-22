import React from 'react'
import '../styles/Footer.css'
import * as assets from '../assets/fassets/assets.js'
const Footer = () => {
  return (


    <main>

<footer className="footer">


  <section className="left">
    <figure>
      <img src={assets.assets.logo} alt="" />
      <figcaption>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, autem? Ipsum deleniti facere similique iste illum uvoluptate, corporis fugit necessitatibus eos non neque facilis amet commodi tempore laborum beatae unde placeat itaque dignissimos.</figcaption>
    </figure>
  </section>
  <section className="mid">
    <p>COMPANY</p>
    <ul>
      <li>home
      </li>
      <li>about us</li>
      <li>delivery</li>
      <li>privacy policy</li>
    </ul>
  </section>
  <section className="right">
    <p>GET IN TOUCH</p>
    <ul>
      <li>+ 977 9999999</li>
      <li>contact@foreveryou.com</li>
    </ul>
  </section>






</footer>

<p className="copyright">
copyright 2025&copy;forever.com - All Right Reserved
</p>
    </main>
  )
}

export default Footer
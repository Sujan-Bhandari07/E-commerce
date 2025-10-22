import React from 'react'
import about_img from '../assets/fassets/about_img.png'

import '../styles/About.css'

const About = () => {
  return (
<main className="about">
  <section className="top">

<h4 >
   <span>ABOUT</span> US ---
</h4>
<section className='aboutus' >
  <figure>

  <img src={about_img} alt="" />
  </figure>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quisquam earum voluptatum laboriosam quam cumque nostrum, culpa ducimus iusto dicta ea harum maxime deleniti. Asperiores obcaecati, eius quam maxime dignissimos minima fuga iure similique dolore doloremque tempore? Aliquid incidunt recusandae culpa <br /><br /> asperiores explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod fuga inventore illo, vitae iure consequuntur libero nisi nesciunt ullam laborum, tempora exercitationem, perspiciatis consectetur porro consequatur debitis nostrum fugit deleniti.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt maxime culpa eum <br /><br /><p>Our Mission</p><br />voluptates quidem blanditiis praesentium reiciendis. Ipsam, amet, asperiores quod aliquid doloremque vero soluta quisquam neque porro hic est tempore, quis consectetur quibusdam explicabo ipsa fugit? Minus, ipsum esse necessitatibus eos voluptas, reprehenderit totam quam modi, deleniti unde nobis.
  </p>
  </section>
</section>
<section className="bottom">

<h4><span>Why</span>  CHOOSE US ---</h4>
<section className="boxes">

<section className="choose">
  <h4>quality assurance:</h4>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus blanditiis sequi enim nobis, alias neque veniam illo recusandae.</p>
</section>
<section className="choose">
  <h4>convenience</h4>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus blanditiis sequi enim nobis, alias neque veniam illo recusandae.</p>
</section>
<section className="choose">
  <h4>exceptional customer service</h4>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus blanditiis sequi enim nobis, alias neque veniam illo recusandae.</p>
</section>

</section>
</section>
</main>
  )
}

export default About
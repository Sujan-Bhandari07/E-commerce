import React from 'react'
import '../styles/Home.css'
import * as assets from '../assets/fassets/assets.js'
import Card from '../components/Card.jsx'
import { useSelector } from 'react-redux'
import { bestsellercollection, latestcollection } from '../services/Selector.jsx'
import { useGetProductQuery } from '../services/Productapi.jsx'






const Home = () => {

  const{data,isLoading,error}=useGetProductQuery(
  )
  // console.log(data)
  const latest=  useSelector(latestcollection)
  const bestseller = useSelector(bestsellercollection)

  return (
<main className="home">
  <section className="hero">


    <section className='leftttt'>
      <p> --- Our Besteller</p>
      <h2>latest arrival</h2>
      <p>shop now ---</p>
    </section>
    <section className="right">
      <figure>
        <img src={assets.assets.hero_img} alt="Logo" />
      </figure>
    </section>

  </section>

  <section className="latest">
    <div className="let">

    <h3 className='h3'> LATEST &nbsp;<span className='span'>COLLECTION ---</span></h3>
    <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, nisi.
    </p>
    </div>
    <section className="cards">

      {latest?.map((item,id)=>(
<React.Fragment key={item._id}>

<Card img={item.image[0]} name={item.name} price={item.price} id={item._id} />

</React.Fragment>
      ))}

    

    </section>

    <section className="bestseller">
    <p className="let">

<h3 className='h3'> BEST &nbsp;<span className='span'>SELLERS ---</span></h3>
<p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, nisi.
</p>
</p>
<section className="cards">

  {bestseller?.map((item,id)=> <Card key={id} img={item.image[0]} name={item.name} price={item.price} id={item._id}  /> )}
  
 
</section>
    </section>
    <section className="policies">
      <figure>
        <img src={assets.assets.exchange_icon} alt="" />
        <figcaption>
          <p>easy exchange policy</p>
          <p>we offer hassle  free exchange policy</p>
        </figcaption>
      </figure>

      <figure>
        <img src={assets.assets.quality_icon} alt="" />
        <figcaption>
          <p>7 days return policy</p>
          <p>we provide 7 days free return policy</p>
        </figcaption>
      </figure>
      <figure>
        <img src={assets.assets.quality_icon} alt="" />
        <figcaption>
          <p>best customer support</p>
          <p>we provide 24/7 customer support</p>
        </figcaption>
      </figure>
    </section>

    <section className="subscription">
      <h5>Subscribe now & get 20% off</h5>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, itaque.</p>
      <form >
        <input type="text" placeholder='Enter your email' />
        <button>Subscribe</button>
      </form>
    </section>



  </section>
</main>
  )
}

export default Home
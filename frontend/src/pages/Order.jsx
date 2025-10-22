import React from 'react'
import '../styles/Order.css'
import img from '../assets/fassets/p_img3.png'
import { useGetProductQuery, useGetinfoQuery } from '../services/Productapi'




const Ord = ({orderstatus,date,product,method})=>{
// console.log(orderstatus,product)

  return(
    product && product.items && product.items.length > 0 && product.items.map((item, idx) => (
      <React.Fragment key={idx}>
        <section className="hq">
          <section className="ord">
            <section className="l">
              <figure>
                <img src={item.image} alt={item.name} />
              </figure>

              <div className='bis'>
                <p className="naam">{item.name}</p>
                <div className='x'>
                  <p className='lll'>${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className='lll' >Size: <span>{item.size }</span></p>
                </div>
                <p className="date">
                  Date: {new Date(date).toDateString()}
                </p>

                <p className="tirni">
                  {method }
                </p>
              </div>
            </section>
            <section className="m">
              {orderstatus }
            </section>
            <section className="r">
              <button>Track order</button>
            </section>
          </section>
          <p className='line'></p>
        </section>
      </React.Fragment>
    )) || null

//     <section className="hq">

// <section className="ord">
// <section className="l">
//   <figure>
//     <img src={img} alt="" />
//   </figure>

//   <p className='bis'>
//     <p className="naam">men tshirt cotton soft</p>
//     <p className='x'>
//       <p className='lll'>$54</p>
//       <p>Quantity:1</p>
//       <p>Size:XL</p>
//     </p>
//     <p className="date">
//       Date: fri aug 13 2024
//     </p>

//     <p className="tirni">
//       COD
//     </p>

//   </p>
// </section>
// <section className="m">
//   Order placed
// </section>
// <section className="r">
//   <button>Track order</button>
// </section>


// </section>
// <p className='line'></p>
//     </section>
  )
}





const Order = () => {
  const{data,error,isLoading}=useGetinfoQuery()
  // console.log(data)

  return (
<main className="order">
  <h4><span>MY</span> ORDERS---</h4>
  <section className="orders">
{data && data.message && data.message.length > 0 && data.message.map((item) => (
  <Ord key={item._id} orderstatus={item.orderstatus}  product={item.product}  date={item.createdAt} method={item.method}/>
))}

  </section>
</main>
  )
}

export default Order
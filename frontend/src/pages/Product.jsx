import { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import dull from '../assets/fassets/star_dull_icon.png'
import star from '../assets/fassets/star_icon.png'
import { useGetProductQuery } from '../services/Productapi.jsx'
import { setrelated } from '../services/Userslice.jsx'
import '../styles/Product.css'
import { addItem } from '../services/Cartslice.jsx'
import toast from 'react-hot-toast'



const Product = () => {
const { data: prod } = useGetProductQuery();
const [size, setSize] = useState(null);
const [prodss, setprodbyid] = useState(null);
const[imgs,setimgs]=useState(null)
const dispatch=useDispatch()

const { id } = useParams();

const navigate = useNavigate()
const findbyid = (prod, id) => {
  if (!prod?.message) return null;
  return prod.message.find(item => item._id === id) || null;
};

useEffect(() => {
  const response = findbyid(prod, id);
  setprodbyid(response);

  setimgs(response?.image?.[0])
 


}, [id, prod]);



useEffect(() => {
  if (prodss) {
    dispatch(setrelated({
      subcat: prodss.subcategory,
      cat: prodss.category
    }));
  }
}, [dispatch, prodss]);

const { subcat, cat } = useSelector(state => state.user.related);
// console.log(subcat, cat);



const makeRelatedProduct = (subcat, cat) => {
  // Filter products by matching subcategory or category
  if (!prod?.message) return [];
  return prod.message.filter(item =>
    item.subcategory === subcat && item.category === cat
  ).slice(0, 5); // limit to 5 related items
};

const relatedProducts = useMemo(() =>
   makeRelatedProduct(subcat, cat)





, [subcat, cat, prod]);




// console.log(prodss?.image?.[0]);
// console.log(size)


const handleclick = ()=>{
  if(size === null || size === undefined){
    return  toast.error("pls provide the size")
  }
  dispatch(addItem({data:{
    _id:prodss?._id,
    name:prodss?.name,
    price:prodss?.price,
    size:size,
    quantity:1,
    image:prodss?.image?.[0]

  }}))
toast.success("Added to cart")
  setSize("")
}

  return (
    
    <main className="product">

  <section className="top">
    <section className="left">
      <section className="sideimage">

      <figure>
        <img onClick={()=>setimgs(prodss?.image?.[0])}  src={prodss?.image?.[0]} alt="" />
      </figure><figure>
        <img onClick={()=>setimgs(prodss?.image?.[1])} src={prodss?.image?.[1] || null} alt="" />
      </figure>
      <figure>
        <img  onClick={()=>setimgs(prodss?.image?.[2])} src={prodss?.image?.[2] || null} alt="" />
      </figure>
      <figure>
        <img onClick={()=>setimgs(prodss?.image?.[3])}  src={prodss?.image?.[3] || null} alt="" />
      </figure>
      </section>

      <section className="mainimg">

      <figure>
  <img src={imgs} alt="" />
</figure>

      </section>
    </section>
    <section className="right">
<p className='pname'>{prodss?.name || 'Product Name'}</p>
<section className="rating">
  <section className="rate">

  <img src={star} alt="" />
  <img src={star} alt="" />
  <img src={star} alt="" />
  <img src={star} alt="" />
  <img src={dull} alt="" />
  </section>
  <p className="review">
    (122)
  </p>
</section>
<p className="pprice">${prodss?.price || '0'}</p>
<p className="descrip">{prodss?.description || 'Product description not available.'}</p>
<p className="sizes">
<p>Select size</p>
<section className='ss'>

<button className={size === "s" ? "size" : ""} onClick={() => setSize("s")}>S</button>
<button className={size === "m" ? "size" : ""} onClick={() => setSize("m")}>M</button>
<button className={size === "l" ? "size" : ""} onClick={() => setSize("l")}>L</button>
<button className={size === "xl" ? "size" : ""} onClick={() => setSize("xl")}>XL</button>
<button className={size === "xxl" ? "size" : ""} onClick={() => setSize("xxl")}>XXL</button>
</section>
</p>
<button className="add" onClick={handleclick}>ADD TO CART</button>

<p className="bot">
  <p>100% original product</p>
  <p>Cash on delivery is available on the product</p>
  <p>East return and exchange policy whithin 7 days</p>
</p>

    </section>
  </section>

  <section className="mid">
    <p>
      <p>Description</p>
      <p>Reviews(122)</p>
    </p>
    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aperiam nobis rerum aliquid provident, veritatis, suscipit esse temporibus odit, laborum commodi itaque rem. Sit laboriosam eum, corporis velit aliquam qui. Maxime doloribus exercitationem repellat, totam officiis minima culpa ex repudiandae! <br /><br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corrupti, exercitationem nihil rerum maiores nulla autem at porro culpa! Adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam a sint laudantium incidunt sed sapiente sunt repellat atque cum aliquam.
    </p>
  </section>
  <section className="botttom">
    <h4><span>RELATED</span> PRODUCTS---</h4>
    <section className="related">
      {relatedProducts?.map((item) => (
        <section
          key={item._id}
          className="rel"
          onClick={() => navigate(`/product/${item._id}`)}
          style={{ cursor: 'pointer' }}
        >
          <img src={item.image[0]} alt={item.name} />
          <div className="reld">
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        </section>
      ))}
    </section>
  </section>
</main>
  )
}

export default Product
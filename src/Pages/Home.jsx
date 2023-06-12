import React, { useContext} from 'react'
import Offers from '../components/Offers'
import "../styles/home.css";
// import RecentlyAdded from '../components/recentlyAdded';
import { Swiper, SwiperSlide } from "swiper/react";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { userContext } from '../App';
import { Link } from 'react-router-dom';

import { add } from '../store/cartSlice'
import { useDispatch } from 'react-redux'


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


const Home = () => {
  const Data=useContext(userContext);
  const dispatch =useDispatch();
  const handleAdd=(product)=>{
    dispatch(add(product))
    }
  

  return (
    <>
      <div className="offers">
        <Offers />
      </div>
      <div className="brands">
        <h2>Shop by Brands</h2>

       <div className="brand-wrapper">
        {
          Data.brandData.map((elem)=>{
            return(
            <Link className="brand" to={`products/brand/${elem._id}`}key={elem._id}  >
              <img src={`${process.env.REACT_APP_API_URL}/uploads/${elem.brandImg}`} className='brandImage' alt="" />
              <span>{elem.brand}</span>
              <svg width="15" height="25" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H14V26L7 15L0 26V0Z" fill={elem.brandColor}/>
</svg>
            </Link>
           ) })

        }
       </div>
      </div>

 <div className="sliderWrapper">

  
 <h2>Featured Product</h2>
 <div className="underline" style={{width:"100px",height:"4px",borderRadius:"5px",overflow:"hidden",display:"flex"}}>
  <div className="one" style={{height:"100%",width:"25%",background:"#0A2342"}}></div>
  <div className="two" style={{height:"100%",width:"25%",background:"#E8EC67"}}></div> 
  <div className="three" style={{height:"100%",width:"25%",background:"#3423A6"}}></div>
  <div className="four" style={{height:"100%",width:"25%",background:"#2E86AB"}}></div>
 </div>
  
 <Swiper
        slidesPerView={3}
        spaceBetween={30}
      
        loop={true}
        
        className="mySwiper"
      >
{
Data.productList.filter((elem,index)=>{
  return index<12
}).map((elem,index)=>{

    return(
      <SwiperSlide className="card-slider" key={index}>
        <Link to={`/product/${elem._id}`} className="card">
   
  <img src={`${process.env.REACT_APP_API_URL}/uploads/${elem.ProductImg}`} alt={elem.Ttitle} className="card-image" />
  <h3 className="card-title">{elem.Title}</h3>
  <p className="card-price">Price: Rs. {elem.Price}</p>
  </Link>
  <button className='button' id="elem._id" ><Link to={`#`} style={{textDecoration:"none",color:"white"}} className='button' onClick={()=>handleAdd(elem)}>Add to Cart</Link></button>

</SwiperSlide>
    
    )
  
 })
}
      
     
    </Swiper>
 
 </div>
  
    </>
  )
}

export default Home
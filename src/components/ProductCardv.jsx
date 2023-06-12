import React from 'react'
import '../styles/productCardv.css'
const ProductCard = ({elem}) => {

  return (
    <>
    <div className="cardContainer">
      <img src={`${process.env.REACT_APP_API_URL}/uploads/${elem.ProductImg}`} alt="" />
  <div className="info">
   <div className="title">{elem.Title}</div>
   <div className="price">Rs.{elem.Price} /-</div>
   <button>Add To cart</button>
  </div>
    </div>
    </>
  )
}

export default ProductCard
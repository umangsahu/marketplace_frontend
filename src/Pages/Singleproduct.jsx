import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { userContext } from '../App';
import '../styles/singleProduct.css'
import { useDispatch } from 'react-redux'
import { add } from '../store/cartSlice'

const Singleproduct = () => {
  const { ProductId } = useParams();
  const Data = useContext(userContext);
  const [isclick,setisClick]=useState(true)
  const Product = Data.productList.filter((elem) => {
    return elem._id === ProductId
  })

  const dispatch =useDispatch();
  const handleAdd=(product)=>{
    dispatch(add(product))
    }
  return (

    <>
      <div className="productContainer">
        <div className="img">
          <img src={`${process.env.REACT_APP_API_URL}/uploads/${Product[0].ProductImg}`} alt="" className={isclick?"productimg":"productimage productfullimage"} onClick={()=>{setisClick(state=>{return !state})}} />
        </div>
        <div className="ProductDetails">
          <div className="title">
            {
              Product[0].Title
            }
          </div>
          <div className="price-tegory">
            <span >{`RS.${Product[0].Price}`}/-</span>
            <span className='category' >{Data.category.filter((elem)=>{return elem._id===Product[0].Category})[0].category}</span>
          </div>
            
            <div className="Details">
              {
                Product[0].Description
              }
            </div>
        </div>
        <div className="productSidebar">
            <button onClick={()=>handleAdd(Product[0])}><Link to='/cart' className='payNow'>Pay Now</Link> </button>
            <button onClick={()=>handleAdd(Product[0])}>Add To Cart</button>
              </div>

      </div>
    </>
  )
}

export default Singleproduct
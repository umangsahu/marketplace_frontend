import React, { useContext } from 'react'
import "../styles/products.css"
import { Link, useParams } from "react-router-dom"
import {Button} from "@material-ui/core"
import { add } from '../store/cartSlice'
import { useDispatch } from 'react-redux'
import { userContext } from '../App'



const Products = () => {
  const {key,value} = useParams();
  const newkey=key[0].toUpperCase()+key.slice(1);
  const Data=useContext(userContext);
 

  const dispatch =useDispatch();
 

   const handleAdd=(product)=>{
   dispatch(add(product))
   }
 


  return (
    <>
  
    <div className="productsWrapper">
    <div className="productContainer">
       {

        Data.productList.filter(elem=>{
        
          return elem[newkey]===value} ).map((elem,ind)=>{
          return(
          <div className="hor-card" key={ind}>
  <div className="left-box">
    <img src={`${process.env.REACT_APP_API_URL}/uploads/${elem.ProductImg}`} alt="" />
  </div>
  <div className="right-box">
    <h2>{elem.Title}</h2>
    <span className="subtext">Buy Now And get offers</span>
    <div className="price"><span className='rupeesSign'>Rs.</span><span className='number'>{elem.Price}</span> </div>
    <span className="deal">29</span>
    <hr/>
    <div className="category">
      
      {
        
       Data.category.filter((category)=>{
        return category._id===elem.Category
               })[0].category
     
        }</div>
<div className="btn">
    <Button variant="contained" id="elem._id" ><Link to={`/product/${elem._id}`} style={{textDecoration:"none",color:"white"}}>Know more</Link></Button>
    <Button variant="contained" id="elem._id" ><Link to={`#`} style={{textDecoration:"none",color:"white"}} onClick={()=>handleAdd(elem)}>Add to Cart</Link></Button>
  </div></div>
 
</div>)
        })

       }
    </div>
    </div>
    </>
  )
}

export default Products
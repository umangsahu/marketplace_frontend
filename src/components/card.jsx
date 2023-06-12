import React from 'react'
import '../styles/card.css'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
// import { useDispatch } from 'react-redux';
// import {add} from '../'

const Cardq = (props) => {


  // const  dispatch=useDispatch();

 
  
  return (
    <div className="card"  >
<div className="image">
    <img src={props.img} alt="error" />
</div>
<div className="info">
   <p className='title'>{props.title}</p> 
   
   <p className='price'> Price:{props.price}Rs</p>
   
  

</div>

{
  props.Quantity>0&&<Button variant="contained" id='buttoncart'  ><AddShoppingCartIcon id='addcart'/> </Button>
}

{
 props.Quantity===0 && <div>Not in stock</div>
}

<div className="label">

</div>
    </div>
  )
}

export default Cardq
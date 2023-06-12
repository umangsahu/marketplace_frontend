import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../styles/cart.css'
import Button from '@mui/material/Button'
import { remove } from '../store/cartSlice'
import { useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';

const Cart = () => {
    const data = useSelector(state => state.cart);
  
    const [total,setTotal]=useState(0);
    // const [order,setOrder]=useState({})

useEffect(()=>{
    let price=0;
      for( let i=0;i< data.length;i++){
      price+=data[i].Price;

      }
      
      setTotal(price)
},[data])

const dispatch=useDispatch();
const handleremove=(product)=>{
  dispatch(remove(product))
  }
 
  const handlereq = async (amount) => {
    const amountInpaise=amount*100;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount:amountInpaise }),
      });
  
      if (response.ok) {
        const data = await response.json();

        acceptpayment(data.order);
      
         
      } else {
        
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("An error occurred:", error);
    }
    
     
  };


 
const acceptpayment=(order)=>{
  
const options = {
  key: "rzp_test_OVC4Xo42A3s3Mn", // Enter the Key ID generated from the Dashboard
    amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "test",
    description: "Test Transaction",
    image: "https://m.media-amazon.com/images/I/61kqkYoeysL._AC_SY135_.jpg",
    order_id:order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: "http://localhost:27713/order/api/paymentverification",
    prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
    },
    notes: {
        address: "Razorpay Corporate Office"
    },
    theme: {
        color: "#3399cc"
    }
};


  const rzp1 = new window.Razorpay(options);
        rzp1.open();
}



    return (

        <div className="container" style={{height:`${(data.length+1)*200}px`,minHeight:'100vh'}}>
            <div className="itemWrapper">
               {
                data.map((elem,index)=>{
                   
                    return(
                  <div className="card" key={index}>
                    <div className="img"> <img src={`${process.env.REACT_APP_API_URL}/uploads/${elem.ProductImg}`} alt={elem.Title} />  </div>
                    <div className="infocard">
                        <div className="title">{elem.Title.slice(0,80)+'...'}</div>
                        <div className="price">Price: Rs.{elem.Price}/-</div>
                        <div className="quantity">{elem.Quntity}</div>
                        <hr />
                        <div className="btnContainer">
                        <Button onClick={()=>handleremove(index)} variant="contained" color='error'>Remove</Button>
                        </div> </div>


                  </div>)
                })
               }
            </div>
        
            <div className="sidebar">
            <table >
  {/* <thead>
    <tr>
      <th >Column 1</th>
      <th >Column 2</th>
    </tr>
  </thead> */}

  <tbody>
    <tr className='tablerow'>
      <td className='box1'>total</td>
      <td className='box2'>Rs.{total} /-</td>
    </tr>
    <tr className='tablerow'>
      <td className='box1'>Cgst@9%</td>
      <td className='box2'>Rs.{Math.round(total*0.09)} /-</td>
    </tr>
    <tr className='tablerow'>
      <td className='box1'>Sgst@9%</td>
      <td className='box2'>Rs.{Math.round(total*0.09)} /-</td>
    </tr>
    <tr>
      <td className='box1'>Delivery</td>
      <td className='box2'>Rs.{Math.round(total*0.20)} /-</td>
    </tr>
    
  </tbody>
 
</table>
<hr />
<div className="amount">
    <span className="tag">Total Payable Amount: </span> <span className="price">Rs.{Math.round(total+(total*0.18)+(total*0.20))}/-</span>

</div>

<Button variant='contained'  onClick={()=>handlereq((total+(total*0.18)+(total*0.20)))}>execute orders</Button>
            </div>

        </div>
  
   
    )
}

export default Cart
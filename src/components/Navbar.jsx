import React, { useContext, useState} from 'react'
// importing CSS
import '../styles/Navbar.css'
import { Link,NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { userContext } from '../App';
import Badge from '@mui/material/Badge';
import Cookies from 'js-cookie';
// import cartSlice from '../store/cartSlice';
import { useSelector } from 'react-redux';
import Sidebar from './sidebar';


const Navbar = ({token}) => {
  const data = useContext(userContext);
  const [isTooltip,setTooltip]=useState(false);
 const store=useSelector(state=>state.cart)
 const size=store.length;

const [burgerClass,setburgerclass]=useState(false)

const addburgerclass=()=>{
  setburgerclass(state=>{
return !state
  })
}
 if(window.innerWidth>500){

  return (
    <div className="Navbar-main">
      <div className="upper">
        {/* <div className="left-side-logo">

        </div> */}
        <div className="right-side-others">
          <div className="searchContainer">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <input type="text" name="" id="" />
            </div>
            <Button variant="primary">Search</Button>
          </div>

          <div className="upper-right"> 
         { !token&&<Link to='/auth'>Login/signup</Link>}
         {token&& <Link to='#' onClick={()=>Cookies.remove("token")}>Logout</Link>}
            < Link to='/addproduct'>Add Product</Link> 
          <Badge badgeContent={size} color="primary" >
            {/* <ShoppingCartIcon color="action" sx={{ color: "White" }} /> */}
            <Link to='/cart'>
            <span className="material-symbols-outlined" style={{color:"white"}}>
           shopping_cart
             </span>
</Link>
          </Badge>
          

          </div>

        </div>
      </div>
      <hr style={{margin:"10px 0px"}}/>
      <div className="lower">
        <ul>
          <li> <NavLink to="/">Home</NavLink></li>
          <div className="categoryContainer">
            <li> <span to='/' id='category' onClick={()=>setTooltip(!isTooltip)} disable={true}>Categories</span></li>
           {
              isTooltip&&<div className="tooltip">
              {
                data.category.map((elem) => {
                  return (
                    <NavLink  to={`/products/category/${elem._id}`}key={elem._id}>{elem.category}</NavLink>
                  )
                })
              }
            </div>
           } 
          </div>
          <li> <NavLink to="/contact">contact</NavLink></li>
          <li> <NavLink to="/about">About</NavLink></li>

        </ul>
        <ul>
          <li></li>
        </ul>
      </div>



    </div>
  )}

  else{
return(
  <div className="blank">
   <Sidebar show={burgerClass}/>
  
    <div className="mobilecontainer">

<div className="searchbar">
<div className="searchContainer">
            <div className="search">
              <span className="material-symbols-outlined">search</span>
              <label htmlFor="search ">
              <input hidden type="text" name="" id="search"  />
              </label>
            </div>
            <Button variant="primary">Search</Button>
          </div>

</div>
<Badge badgeContent={size} color="primary" >
            {/* <ShoppingCartIcon color="action" sx={{ color: "White" }} /> */}
            <Link to='/cart'>
           
            <span className="material-symbols-outlined" style={{color:"white"}}>
           shopping_cart
             </span>
</Link>
          </Badge>
<div onClick={addburgerclass} className={!burgerClass?"burger":"burger burgerActive"}>
  <div className="line line1"></div>
  <div className="line line2"></div>
  <div className="line line3"></div>
  
</div>
    </div>
  </div>
)

  }

}

export default Navbar
import React, { useContext, useState } from 'react'
import '../styles/sidebar.css'
import { NavLink,Link} from 'react-router-dom'
import { userContext } from '../App'
import Cookies from 'js-cookie'


const token =Cookies.get("token")
const Sidebar = ({show}) => {
    const Data=useContext(userContext);
const [isTooltip,setTooltip]=useState()


  return (
   <div className={show?`sidenavbar`:`hidden`}>

   <div className="sidemenu">
        <ul>
          <li> <NavLink to="/">Home</NavLink></li>
          <div className="categoryContainer">
            <li> <Link onClick={()=>setTooltip(!isTooltip)} disable={true}>Categories</Link></li>
           {
              isTooltip&&<div className="tooltip">
              {
                Data.category.map((elem) => {
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

<hr />
<div className="afterbox">
{ !token&&<Link to='/auth' className='sidebarLink'>Login/signup</Link>}
 {token&& <Link to='#' className='sidebarLink' onClick={()=>Cookies.remove("token")}>Logout</Link>}

 <div className='sidebarLink'>Help center</div>
 <div className='sidebarLink'>privacy olicy</div>
 </div>
   </div>
  )
}

export default Sidebar
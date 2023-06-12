import React from 'react'
import "../styles/error.css"
const Error = () => {
  return (
    <div className='error'>
         <div className="bg">
          <img src="./media/error.jpg" alt="" />
         </div>

         <div className="text">
        <strong>404 Error</strong>
            <h1>Nothing is here</h1>
            <p>please go back</p>
         </div>
    </div>
  )
}

export default Error
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const styles={
    width:"100%"

}

const offerData=[{image:"./media/11.jpg"},{image:"./media/12.jpg"}]
const Offers = () => {
    const settings={
        
      infinite: true,
    
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 5000,
      
    }
  return (
    <Slider {...settings} style={{position:"relative",zIndex:"-1"}}>
        {
            offerData.map((elem,index)=>{
return(
      <div className="imag" style={styles} key={index}>
    <img src={elem.image} alt="error" style={{width:"100%",height:"200px"}} />
  </div>
  
)
            })
        }

  </Slider>
  )
}

export default Offers
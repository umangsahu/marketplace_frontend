import React, { useContext, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import '../styles/productsPage.css'
import AddBrand from '../components/AddBrand';
import Cookies from 'js-cookies'
import { userContext } from '../App';
// import { Link } from 'react-router-dom';



const token =Cookies.getItem('token');


function AddProductPage() {
const Data=useContext(userContext);



 
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);

  }


  const handleSubmit=(event)=>{
    event.preventDefault();

    const formdata=new FormData();
    formdata.append("productImage",imageFile)
    formdata.append("title",title)
    formdata.append("price",price)
    formdata.append("quantity",quantity)
    formdata.append("brand",brand)
    formdata.append("description",description)
    formdata.append("category",category)


    sendProductData(formdata);
    event.target.reset();

  }

  const sendProductData=async(formdata)=>{
    const res= await fetch(`${process.env.REACT_APP_API_URL}/product`,{
      method:"POST",
      body:formdata,
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

  
    if(res.ok){
      window.alert("Product add successfull!");
      
      Data.setupdate((state)=>{
        return state+1;
      })
  }
  else if (res.status === 400) {
    window.alert("Your image type is not supported(only jpeg,jpg,png,webp image supported)");
  }
  }

if(window.innerWidth<552){
  return(
    <>
    
    <div className='mobilerest'>This page is only for desktop</div>
    </>
    
    )
}
  return (
    <>
   
  
    <form onSubmit={(e)=>handleSubmit(e)}>
  
        <div className='left'>
          <FormControl fullWidth>
            
            <label className="imagecontainer" htmlFor='image'> 
            <span> {
              imageFile? <small style={{textOverflow:"ellipsis" ,width:"80%",overflow:"hidden",display:"block"}} >{imageFile.name}</small>:"Add Product Image"
            }</span>
           
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            </label>
          </FormControl>
        </div>
        <div className='right' >
          <TextField
            required
            id="outlined-required-title"
            label="Product Title"
            name='title'
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          
          <TextField
            required
            id="outlined-required-price"
            label="Price"
            name='price'
            fullWidth
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <TextField
            required
            id="outlined-required-quantity"
            label="Quantity"
            name='quantity'
            fullWidth
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />

<FormControl fullWidth>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              id="category"
              value={category}
              name='category'
              onChange={(event) => setCategory(event.target.value)}
              style={{textTransform:"capitalize"}}
            >

              {
                Data.category.map((elem,index)=>{
                   return(<MenuItem value={elem._id} key={index} style={{textTransform:"capitalize"}}>{elem.category}</MenuItem>)
                })
              }
              
             
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="brand">Brand</InputLabel>
            <Select
              id="brand"
              value={brand}
              name='brand'
              onChange={handleBrandChange}
            >
              
              { Data.brandData.filter((element)=>{
                  return element.category_id===category//category  contain id
                }).map((elem,index)=>{
                  return(
                  <MenuItem value={`${elem._id}`} key={index} style={{textTransform:"capitalize"}}>{elem.brand}</MenuItem>)
                })

            }
              
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {brand === 'other' &&  <AddBrand   />}
          <TextField
            required
            id="outlined-required-description"
            label="Description"
            fullWidth
            multiline
           minRows={6}
            maxRows={6}
            value={description}
            name='description'
            onChange={(event) => setDescription(event.target.value)}
          />
         
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
    
    </form>
    </>
  );
}

export default AddProductPage;

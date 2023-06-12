import React, { useContext,  useState } from 'react'
import TextField from '@mui/material/TextField';
import "../styles/modal.css";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MenuItem,FormControl,InputLabel,Select } from '@material-ui/core';

import { userContext } from '../App';

// import dotEnv from "dotenv";

// dotEnv.config();





const AddBrand = () => {
 const Data=useContext(userContext)




    const [open ,setOpen]=useState(true);
 
    const [formdata,setformdata]=useState({
        image:null,
        brandName:'',
        brandColor:""
    })
  const [formimage,setformimage]=useState(null)
  const [category,setCategory]=useState("")

    const handlechangeimage=(e)=>{
      setformimage(e.target.files[0]);
      
    }

  // console.log(process.env.Main_url);
    
    const sendBrandInfo=async(data)=>{
        const res=await fetch(`${process.env.REACT_APP_API_URL}/brand`,{
            method:"POST",
            body:data,
        })
        if(res.ok){
            window.alert("brand Details add successfull!")
            Data.setupdate((state)=>{
              return state+1;
            })
            setOpen(false)
        }
        else if (res.status === 400) {
          window.alert("Your file type is not supported");
        }
    }




    const handleSubmit=(event)=>{
        event.preventDefault(); // Prevents the form from submitting and refreshing the page

        // Access the form data
        const formData = new FormData();

      formData.append('image',formimage);
      formData.append('brandName',event.target.brandName.value);
      formData.append('brandColor',event.target.brandColor.value)
      formData.append("category",event.target.category.value)
       
  // Reset the form fields (if needed)
 
  event.target.reset();

   sendBrandInfo(formData);
setOpen(true)


    }

    const handleClose=()=>{return false;}

  return (
    <>
   
  <Modal
        open={open}
        onClose={handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          
<form id="modal-form" onSubmit={(e)=>handleSubmit(e)} >
    <h3>Enter the Brand Details</h3>

<TextField id="outlined-basic-image" name='file'  variant="outlined" InputProps={{type: 'file', accept: 'image/*',}}  onChange={e => handlechangeimage(e)} required />
<TextField id="outlined-basic-brand-name" name='brandName' value={formdata.brandName} onChange={(e)=>setformdata({...formdata,brandName:e.target.value})} label="Brand Name" variant="standard" required/>
<TextField id="outlined-basic-brand-color" name="brandColor" value={formdata.brandColor} onChange={(e)=>setformdata({...formdata,brandColor:e.target.value})}label="Brand Logo Color" variant="standard" required />
<FormControl fullWidth>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              id="category"
              value={category}
              name='category'
              onChange={(event) => setCategory(event.target.value)}
              style={{textTransform:"capitalize"}}
              required
            >
              {
                Data.category.map((elem,index)=>{
                   return(<MenuItem value={elem._id} key={index} style={{textTransform:"capitalize"}}>{elem.category}</MenuItem>)
                })
              }
              
             
            </Select>
          </FormControl>
<Button variant="contained" type="submit">Button</Button>

</form>

</Modal>

    </>
      )
}

export default AddBrand
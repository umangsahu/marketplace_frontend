
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState,useEffect } from "react";
import { createContext } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./components/footer";
import Cookies from "js-cookie";
const  userContext=createContext();

const Token=Cookies.get("token");

function App() {

const [token,setToken]=useState('')
  const [productList,setProductList]=useState([]);
  const [brandData,setBrandData]=useState([]);
  const [category,setCategory]=useState([]);
  const [isupdate,setupdate]=useState(0)
 
useEffect(()=>{
if(Token){
  setToken(Token)
}
},[])


useEffect(()=>{
  fetchCategory();
  fetchBrandData();
  fetchProductList();
  
},[])

const fetchCategory=async()=>{
  const res=await fetch(`${process.env.REACT_APP_API_URL}/category`);
  const response= await res.json();

  setCategory(response.categories);
}

const  fetchBrandData=async()=>{
  const res=await fetch(`${process.env.REACT_APP_API_URL}/brand`);
  const response= await res.json();

  setBrandData(response.data);
}
const fetchProductList=async()=>{
  const res=await fetch(`${process.env.REACT_APP_API_URL}/product`);
  const response= await res.json();

  setProductList(response.data);
}
if(productList&&brandData&&category){
  return (

    <div className="App">
    <Provider store={store}>
      <userContext.Provider value={{productList,brandData,category,setupdate}} >
      <Navbar token={token}/>
      <Outlet></Outlet>
      <Footer/>
      </userContext.Provider>
      </Provider>
    </div>
  );}
  else{
    return(
      <>
      Loading....
      </>
    )
  }
}

export {App,userContext};

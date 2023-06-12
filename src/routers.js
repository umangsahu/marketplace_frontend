import {
    createBrowserRouter,
   
  } from "react-router-dom";

import Home from "./Pages/Home"
import AddProductPage from "./Pages/addProduct";
import Authentication from './Pages/login-signup'
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Singleproduct from "./Pages/Singleproduct";

import {App} from "./App";
import About from "./Pages/About";


 const router = createBrowserRouter([
    {
      element: <App/>,
      children: [
        {
          path: "/",
          element: <Home />,
          
        },
        {
          path: "/addproduct",
          element: <AddProductPage/>,
        },
        {
          path:"/products/:key/:value",
          element: <Products/>,
        },
        {
          path: "/product/:ProductId" ,
          element: <Singleproduct/>,
         },
        {
          path: "/auth",
          element:<Authentication />,
        },
        {
          path: "/cart",
          element: <Cart  />,
        
      },
      {
        path: "/contact",
        element: <Contact/>,
      
    },
    {
      path: "/about",
      element: <About  />,
    
  }
      ],
    },
  ]);



  export default  router
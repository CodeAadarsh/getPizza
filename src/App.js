import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navigation from "./components/Navigation";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Singleproduct from "./pages/Singleproduct";
import {CartContext} from "./CartContext"
import { useEffect, useState } from "react";
const App = () => {
    const [cart,setCart]=useState({});
    useEffect(()=>{
        const cart = window.localStorage.getItem('cart')
        setCart(JSON.parse(cart))
    },[])
    useEffect(()=>{
        window.localStorage.setItem('cart',JSON.stringify(cart))

    },[cart])
    return (
        <Router>
            <CartContext.Provider value={{cart,setCart}}>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products-item/:id" element={<Singleproduct />} />
                <Route path="/Cart" element={<Cart />} />
            </Routes>
            </CartContext.Provider>
        </Router>
    )
}

export default App; 
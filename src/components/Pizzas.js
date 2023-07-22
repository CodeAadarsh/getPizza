import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../CartContext';
const Pizzas = (props) => {
  const [isAdding,setIsAdding] = useState(false)
  const {cart,setCart} = useContext(CartContext)
  const {product} = props;
  const spinAnimation = `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;
  
  const spinStyle = {
    animation: 'spin 10s linear infinite', // Replace '2s' with the desired duration
  };
  const addToCart =(event,product)=>{
    event.preventDefault();
    let _cart = {...cart};
    if(!_cart.item){
      _cart.item ={}
    }    
    if(_cart.item[product.id]){
      _cart.item[product.id]+=1
    }else{
      _cart.item[product.id]=1
    }
    if(!_cart.totalCart){
    _cart.totalCart=0;
      
    }
    setIsAdding(true);
    _cart.totalCart+=1;
    setCart(_cart)
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  }
    return (
      <Link to ={`/products-item/${product.id}`}>
           <style>{spinAnimation}</style>
        <div>{ parseInt(product.id)%2==0?(
          <div className=" justify-center flex "><img className='rounded-full' style={spinStyle} src='/images/peproni.png' /></div>):
            ( <div className=" justify-center flex "><img className='rounded-full w-72 md:w-100 align-center' style={spinStyle} src='/images/pizza.png' /></div>)
          }
            <div className='text-center container'>
                <span className='flex justify-center align-center font-bold py-2'>
                    {(product.title)} pizza
                </span>
                <span className='bg-gray-200 rounded-full text-sm px-4 py-1 justify-self-center'>
                    small
                </span>
            </div>
            <div className='flex justify-evenly py-4'>
                <div className='font-bold'>
                    ₹{product.id}00
                </div>
                <button disabled={isAdding} onClick={(event )=>{addToCart(event,product)}} className={`${isAdding?'bg-green-500':'bg-amber-500'} rounded-2xl px-2 font-bold `}>
                    {isAdding?'ADDED':'ADD'}
                </button>
            </div>
        </div>
        </Link>
    )
}

export default Pizzas
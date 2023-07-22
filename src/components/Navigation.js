import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {CartContext} from '../CartContext'
const Navigation = () => {
    const cartBackground ={
        background: '#ffb51e',
        display: 'flex',
        borderRadius:'50px',
        padding:'6px 10px',
        margin :'0px 10px'
        
    }
    const {cart} = useContext(CartContext);

    return (
        <>

            <nav className='container mx-auto flex items-center justify-between py-4  '>
                <Link to="/">
                    <img style={{ height: 45 }} src='/images/logo.png' alt='pizzaLOGO' />
                </Link>
                <ul className='flex items-center '>
                    <li className='ml-6 hover:bg-blue-400 rounded  hover:text-white '><Link to="/">Home</Link></li>
                    <li className='ml-6 hover:bg-blue-400 rounded  hover:text-white '><Link to="/products ">Products</Link></li>
                    <li className='ml-6 hover:bg-blue-400 rounded  hover:text-white '>
                        <Link to="/cart">
                            <div style={cartBackground}>
                                <span className='mr-2 text-white'>{cart?.totalCart===undefined?'0':cart?.totalCart}</span>
                                <img  src='/images/cart.png' alt='cart-icon' />
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation
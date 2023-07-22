import {React,useEffect,useState} from 'react'
import Pizzas from './Pizzas'
import { useContext } from 'react'
import { CartContext } from '../CartContext'
const ProductsC = () => {
  const {name} = useContext(CartContext)
  const [products,setproducts] = useState([])
  useEffect(()=>{
    fetch("https://fakestoreapi.com/products?limit=20")
    .then(Response=>Response.json()).then(
      products=>{
        setproducts(products)
      }
    )

  },[])

  return (
    <div className='container  mx-auto pb-24'>
        <h1 className='font-bold text-xl' >Products {name}</h1>
        <div className='grid justify-center md:grid-cols-5 my-8 gap-24'>
           {
           products.map(product=><Pizzas key={products.id} product={product}/>)}
            
        </div>
    </div>

  )
}

export default ProductsC
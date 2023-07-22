import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const Singleproduct = () => {
  const [products,setproducts] = useState([])
  const navigate = useNavigate();
  const params = useParams();
  useEffect(()=>{
    fetch(`https://fakestoreapi.com/products/${params.id}`).then(Response=>Response.json()).then(
      products=>{
        setproducts(products)
      }
    )
  },[params])
  const handleGoBack = () => {
    // Go back to the previous page
    navigate(-1);
  };

  return (
     <div className="container mx-auto mt-12">
        <button className="mb-12 font-bold pl-12 md:pl-0" onClick={()=>{handleGoBack()}}>Back</button> 
        <div className='flex justify-center md:justify-start'>
        { parseInt(products.id)%2==0?(
          <div className=" justify-center flex "><img className='rounded-full'  src='/images/peproni.png' /></div>):
            ( <div className=" justify-center flex "><img className='rounded-full w-72 md:w-100 align-center'  src='/images/pizza.png' /></div>)
          }
          <div className="md:ml-16">
                <h1 className=' font-bold py-2'>
                {/* {(props.product.title)} */}
                     {products.title} pizza
                </h1>
            <div className='text-center justify-between py-4'>
                <div className='font-bold mb-5'>
                ₹{products.id}00
                </div>
                <span  onClick={()=>{handleGoBack()}} className=' hover:cursor-pointer text-center bg-amber-500 rounded-2xl px-2 py-2 font-bold '>
                    Go back and add to cart
                </span>
                
            </div>
            </div>

        </div>
        
    </div>
  )
}

export default Singleproduct
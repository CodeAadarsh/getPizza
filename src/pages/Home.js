import { useNavigate } from "react-router-dom";
import ProductsC from "../components/ProductsC"
import { useEffect } from "react";

const Home = () => {
const navigation = useNavigate(null)
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
  return (
   <>
    <div className="hero py-16">
      <div className="container mx-auto items-center justify-between md:flex">
        <div className=" text-center md:text-left md:pl-5	 md:w-1/2">
          <h6 className="text-lg font-bold px-2"><em>Do want pizza ?</em></h6>
          <h1 className="text-8xl md:text-6xl  md:text-black font-bold  ">Don't wait!</h1>
          <button onClick={()=>navigation('/products')} className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-400 hover:bg-yellow-500">Order now!</button>
        </div>
        <div className="md:w-1/2 justify-center flex ">
        <style>{spinAnimation}</style>
        <img className="py-4 md:w-3/4" style={spinStyle} src="/images/pizza.png"/>

        </div>
      </div>
      
    </div>
    <div>
      <ProductsC/>
    </div>
   </>
  )
}

export default Home
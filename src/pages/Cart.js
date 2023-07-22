import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  let total = 0;
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [priceFetched, togglePriceFetched] = useState(false);
  const [isAdding,setIsAdding] = useState(false)
  const navigate = useNavigate(null)

  useEffect(() => {
    if (!cart?.items) {
      return;
    }

    if (priceFetched) {
      return;
    }

    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) })
    }).then(res => res.json())
      .then(products => {
        setProducts(products);
        togglePriceFetched(true);
      })
  }, [cart, priceFetched]);

  const getQty = (productId) => {
    return cart.items[productId];
  }

  const increment = (productId) => {
    const existingQty = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = existingQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  }

  const decrement = (productId) => {
    const existingQty = cart.items[productId];
    if (existingQty === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = existingQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  }

  const getSum = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
  }

  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;
    setCart(_cart);
    const updatedProductsList = products.filter((product) => product._id !== productId);
    setProducts(updatedProductsList);
  }

  const handleOrderNow = () => {
    window.alert('Order placed succesfully!');
    setProducts([]);
    setCart({});
  }
  const handleIssueButton =()=>{
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false)
    }, 8000);
  }

const emptyCart=()=>{
  window.localStorage.removeItem('cart')
  window.location.reload()
  navigate('/')
}
  return (
    !products.length
      ? <div className='text-center'>

        <img className="mx-auto md:w-1/3 mt-12" src="/images/empty-cart.png" alt="" />
        <button onClick={handleIssueButton} className='px-4 mr-4 py-4 text-white font-bold bg-red-700 hover:bg-red-950 rounded-2xl my-4'>Click to check<br></br> Whats Wrong ?</button>
        <button onClick={emptyCart} className='px-4 py-4 text-white font-bold bg-yellow-500 hover:bg-red-950 rounded-2xl my-4'>Click to empty<br></br> your cart</button>
        {isAdding?
          (<div className='container bg-yellow-200 md:bg-red-200 rounded mx-auto px-5 py-5'>
          <h1 className='font-bold'>Sorry for Inconvinience!</h1>
          <h1 className='font-bold'>This Project is built on FakeAPIs</h1>
          <h1 className='font-bold'>Therefore we are unable to display the pizza's you've added</h1>
          <h1 className='font-bold'>Soon we'll build this App in MERN which will be fully Functional, can also deliver pizza's at your place, I'm just kidding i am a developer not baker😅</h1>

        </div>):
        (
          <div>
          <h1 className='font-bold'>Sorry! but we are out of toppings. can't take your order rn!</h1>

        </div>
        )
        }

      </div>

      :
      <div className="container mx-auto lg:w-1/2 w-full pb-24">
        <h1 className="my-12 font-bold">Cart items</h1>
        <ul>
          {
            products.map(product => {
              return (
                <li className="mb-12" key={product._id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img className="h-16" src={product.image} alt="" />
                      <span className="font-bold ml-4 w-48">{product.name}</span>
                    </div>
                    <div>
                      <button onClick={() => { decrement(product._id) }} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                      <b className="px-4">{getQty(product._id)}</b>
                      <button onClick={() => { increment(product._id) }} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                    </div>
                    <span>₹ {getSum(product._id, product.price)}</span>
                    <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <hr className="my-6" />
        <div className="text-right">
          <b>Grand Total:</b> ₹ {total}
        </div>
        <div className="text-right mt-6">
          <button onClick={handleOrderNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
        </div>
      </div>
  )
}

export default Cart
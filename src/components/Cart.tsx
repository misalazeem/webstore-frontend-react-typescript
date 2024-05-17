import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/Cart/CartActions";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch: AppDispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    let totalQuantity = 0;
    let totalamount = 0;
    cartItems.forEach((cart) => {
      totalQuantity += cart.quantity;
      if(cart.quantity > 0) {
        totalamount += cart.quantity * cart.price;
      }
    });
    setQuantity(totalQuantity);
    setTotalAmount(totalamount);
  }, [cartItems]);

  return (
    <>
        <div className="navbar-end mr-4">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {quantity && (
                  <span className="badge badge-sm indicator-item">{quantity}</span>
                )}
                </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content min-w-[300px] o-4 bg-base-100 shadow">
                <div className="card-body">
                {quantity && cartItems.map((cartItem) => (
                  <div className="flex flex-row mb-8" key={cartItem._id}>
                    <img src={cartItem.image} className="h-[100px] w-[100px]" alt={cartItem.name} />
                    <div className="flex flex-col justify-between">
                        <p>Quantity: {cartItem.quantity}</p>
                        <p>{cartItem.name}</p>
                      <div className='flex flex-row gap-2'>
                        <button disabled={cartItem.quantity===1} 
                          onClick={
                            () => dispatch(decreaseQuantity(cartItem._id))
                          } 
                          className="p-2 hover:bg-[#d3d3d3] disabled:bg-[#d3d3d3] disabled:cursor-not-allowed"><FaMinus className="text-[10px]"/>
                        </button>
                        <button disabled={cartItem.quantity===5} onClick={() => dispatch(increaseQuantity(cartItem._id))} className="p-2 hover:bg-[#d3d3d3] disabled:bg-[#d3d3d3] disabled:cursor-not-allowed"><FaPlus className="text-[10px]"/></button>
                        <button onClick={() => dispatch(removeFromCart(cartItem._id))} className="p-2 hover:bg-red-100"><FaTrash className="text-[10px]" /></button>
                      </div>

                    </div>
                  </div>
              ))}
                {quantity ? (
                  <>
                    <span className="font-bold text-lg">{quantity} Items</span>
                    <span className="text-info">Subtotal: ${totalAmount}</span>
                  </>
                ):(
                  <span className="font-bold text-lg">Cart is Empty</span>
                )}

                <div className="card-actions">
                    <Link to='/cart' className="btn btn-primary btn-block">View cart</Link>
                </div>
                </div>
            </div>
            
            </div>
        </div>
    </>
  );
}

export default Cart;
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/Cart/CartActions';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [quantity, setQuantity] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    let totalQuantity = 0;
    let totalamount = 0;
    cartItems.forEach((cart) => {
      totalQuantity += cart.quantity;
      if (cart.quantity > 0) {
        totalamount += cart.quantity * cart.price;
      }
    });
    setQuantity(totalQuantity);
    setTotalAmount(totalamount);
  }, [cartItems]);

  return (
    <>
      <div className="min-h-[50vh] flex flex-col justify-between items-center gap-8 p-16">
        {quantity === 0 ? (
          <h2 className="text-3xl font-bold">Cart is empty</h2>
        ) : (
          <>
            <div className="flex flex-row justify-center items-center py-16 text-3xl font-bold">
              Your Cart
            </div>
            {quantity &&
              cartItems.map((cartItem) => (
                <div
                  className="flex flex-col mb-8 p-8 justify-between gap-8 w-[100%] bg-base-100 shadow-xl lg:flex-row lg:w-[50%] xl:flex-row 2xl:flex-row"
                  key={cartItem._id}
                >
                  <img src={cartItem.image} className="w-[200px]" alt={cartItem.name} />
                  <div className="flex flex-col gap-4">
                    <p>Quantity: {cartItem.quantity}</p>
                    <p>{cartItem.name}</p>
                    <p>{cartItem.description}</p>
                    <div className="flex flex-row">
                      <button
                        disabled={cartItem.quantity === 1}
                        onClick={() => dispatch(decreaseQuantity(cartItem._id))}
                        className="p-2 hover:bg-[#d3d3d3] disabled:bg-[#d3d3d3] disabled:cursor-not-allowed"
                      >
                        <FaMinus className="text-[16px]" />
                      </button>
                      <button
                        disabled={cartItem.quantity === 5}
                        onClick={() => dispatch(increaseQuantity(cartItem._id))}
                        className="p-2 hover:bg-[#d3d3d3] disabled:bg-[#d3d3d3] disabled:cursor-not-allowed"
                      >
                        <FaPlus className="text-[16px]" />
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(cartItem._id))}
                        className="p-2 hover:bg-red-100"
                      >
                        <FaTrash className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex flex-row w-[100%] justify-between items-center lg:w-[50%] xl:w-[50%] 2xl:w-[50%] ">
              <p>
                Total Amount: <b>${totalAmount}</b>
              </p>
              <Link to="/checkout" className="btn btn-outline btn-accent">
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;

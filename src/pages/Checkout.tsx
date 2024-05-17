import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { clearCart } from "../redux/Cart/CartActions";

interface FormData {
  address: string;
  phoneNumber: string;
  name: string;
  email: string;
  paymentMethod: string;
}

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    address: "",
    phoneNumber: "",
    name: "",
    email: "",
    paymentMethod: "Cash On Delivery",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    address: "",
    phoneNumber: "",
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  useEffect(() => {
    if(cartItems.length < 1) {
        navigate('/');
      }
  }, [cartItems]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.phoneNumber.trim() || !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Valid phone number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccessMessage("Order Successfully placed!");
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/');
    }, 4000)
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center py-4 text-3xl font-bold">CheckOut</div>
      <div className="w-full flex flex-row justify-center items-center">
        <form className="flex flex-col p-16 items-center w-full md:w-[70%] lg:w-[70%]" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-8">
            <label className="input input-bordered max-w-[50%] flex items-center gap-2">
              <input
                type="text"
                name="name"
                className="grow"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
              />
            </label>
            {errors.name && <div className="text-red-500">{errors.name}</div>}

            <label className="input input-bordered max-w-[50%] flex items-center gap-2">
              <input
                type="text"
                name="email"
                className="grow"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
              />
            </label>
            {errors.email && <div className="text-red-500">{errors.email}</div>}

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="address"
                className="grow"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
              />
            </label>
            {errors.address && <div className="text-red-500">{errors.address}</div>}

            <label className="input input-bordered max-w-[50%] flex items-center gap-2">
              <input
                type="text"
                name="phoneNumber"
                className="grow"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                minLength={11}
                maxLength={11}
              />
            </label>
            {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}

            <label className="cursor-pointer w-[40%] label">
              <span className="label-text">Cash on Delivery</span>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash On Delivery"
                checked={formData.paymentMethod === "Cash On Delivery"}
                onChange={handleChange}
                className="radio radio-info"
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-8">Submit</button>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Checkout;

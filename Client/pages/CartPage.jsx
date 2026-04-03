import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import { Navigate, useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  // cart loading state
  if (!cart) {
    return <p>Loading...</p>;
  }

  //  empty cart redirect
  if (cart.items.length === 0) {
    return <Navigate to="/empty-cart" />;
  }

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      alert("Order Placed Successfully");
      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Error placing order");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.items.map((items) => (
        <div key={items._id}>
          <h3>{items.food.name}</h3>
          <p>Price: ₹{items.food.price}</p>
          <p>Quantity: {items.quantity}</p>
          <p>Total: ₹{items.food.price * items.quantity}</p>
        </div>
      ))}

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={cart.items.length === 0}
      >
        Place Order
      </button>
    </div>
  );
}

export default CartPage;
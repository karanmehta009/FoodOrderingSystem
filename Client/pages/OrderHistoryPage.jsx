import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

function OrderHistoryPage() {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      console.log("orderapi response", res.data)
      setOrder(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  return (
  <div >
    <h2>My Orders</h2>
    {orders.length === 0 ? (
      <p>No Order Yet</p>
    ) : (
      orders.map((order) => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Total:₹{order.totalPrice}</p>
          <p>Status: {order.status}</p>

          <h4>Foods:</h4>
          {(order.foods || order.food || []).map((food) => (
            <div key={food._id}>
              <p>
                {food.name} - ₹{food.price}
              </p>
            </div>
          ))}
        </div>
      ))
    )}
  </div>);
}
export default OrderHistoryPage;

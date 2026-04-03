import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/orderService";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      alert("Status Updated");
      fetchOrders();  // refresh
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Admin Orders</h2>

      {orders.length === 0 && <p>No Orders Found</p>}

      {orders.map((order) => (
        <div key={order._id}>
          <h3>User: {order.user?.name}</h3>
          <p>Email: {order.user?.email}</p>
          <p>Total: ₹{order.totalPrice}</p>
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="delivered">Delivered</option>
          </select>

          <h4>Foods:</h4>

          {Array.isArray(order.foods) && order.foods.length > 0 ? (
            order.foods.map((foodItem) => {
              const food = foodItem.food || foodItem; // support both formats
              return (
                <p key={food._id}>
                  {food.name} - ₹{food.price}
                </p>
              );
            })
          ) : (
            <p>No food Items</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ManageOrders;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//attach token

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

//create order from cart 

export const placeOrder = () => API.post ("order/create-from-cart");

export const getMyOrders = () => API.get("/order/my-orders");

// admin service

export const getAllOrders = () => API.get ("/order/all");

export const updateOrderStatus = (id, status) => API.put (`/order/status/${id}`, { status });
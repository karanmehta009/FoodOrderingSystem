import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach the token

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

//add

export const addToCart = (data) => API.post("/cart/add", data);

//get cart
export const getCart = () =>
  API.get("/cart/", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
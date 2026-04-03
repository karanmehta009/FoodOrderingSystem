import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000/api",
});

//register 

export const registerUser = (data) => API.post("/user/register", data);

//Login 

export const loginUser = (data) => API.post("/user/login", data);

//it will add token automatically 
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;

    }
    return req;
})
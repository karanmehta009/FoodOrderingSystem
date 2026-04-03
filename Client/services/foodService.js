import axios from "axios";

const API = axios.create ({
    baseURL: "http://localhost:5000/api",
});

//attach Token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});
//disbale cache bcz react not rerender properly with cached response


export const getFoods = () => 
    API.get("/food/", {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
//get all foods
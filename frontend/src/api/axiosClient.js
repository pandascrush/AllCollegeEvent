import axios from "axios";

const axiosClient = axios.create({
    baseURL:  "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        throw error.response?.data || { message: "Server error" };
    }
);

export default axiosClient;

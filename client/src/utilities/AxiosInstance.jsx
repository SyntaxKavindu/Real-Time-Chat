import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://chat.kavinduchamath.com/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
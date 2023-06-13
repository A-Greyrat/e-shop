import axios from "axios";

export const ajax = axios.create({
    baseURL: "http://10.133.37.64:8082",
    timeout: 1000,
});

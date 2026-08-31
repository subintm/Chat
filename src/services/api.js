import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = () => api.get("/posts");
export const getPhotos = () => api.get("/photos");

export default api;
import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

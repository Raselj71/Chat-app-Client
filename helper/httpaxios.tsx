import axios from "axios";

export const httpAxios = axios.create({
  baseURL: "https://chatappserver.codewithrasel.com/",
  withCredentials: true,
});

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://localhost:7005/api/categories/";

export const getPublicContent = () => {
  return axios.get(API_URL + "");
};

export const getPrivateContent = () => {
  return axios.get(API_URL + "securetest", { headers: authHeader() });
};

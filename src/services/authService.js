import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/auth";
const tokenCode = "token";

export const login = async (email, password) => {
  const { data } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenCode, data);
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenCode, jwt);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenCode);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem(tokenCode);
};

export const getToken = () => {
  return localStorage.getItem(tokenCode);
};

http.setJWT(getToken());

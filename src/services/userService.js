import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";

export const register = (user) => {
  return http.post(apiEndPoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

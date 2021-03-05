import axios from "axios";
import logger from "./logService";
// import auth from "./authService";
import { toast } from "react-toastify";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occured.");
  }

  return Promise.reject(error);
});

// export function setJWT(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = auth.getJWT(jwt);
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  //setJWT
};

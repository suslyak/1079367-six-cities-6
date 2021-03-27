import axios from "axios";

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401
};

export const createAPI = (onUnauthorized, onNotFound) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.NOT_FOUND) {
      onNotFound();
    }

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};


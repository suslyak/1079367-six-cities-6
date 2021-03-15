import axios from "axios";

const BACKEND_URL = `https://6.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  NOT_FOUND: 404
};

export const createAPI = (handleNotFound) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.NOT_FOUND) {
      handleNotFound();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};


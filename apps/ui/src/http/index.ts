import axiosGlobal, { AxiosError, type CreateAxiosDefaults } from "axios";
import { ToastMessage } from "../toast";
import toasts from "../toast";
import { FoodApiFactory, HSRApiFactory } from "./gateway";

const baseURL = "http://192.168.5.100:5005/api/v1";

const conf: CreateAxiosDefaults = {
  baseURL,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axios = axiosGlobal.create(conf);

const createAxiosResponseInterceptor = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { toastify } = toasts;
      const id = crypto.randomUUID();
      const type: ToastMessage["type"] = "error";
      let description = "Internet error";

      if (error.response?.data?.message) {
        description = error.response?.data?.message;
      }

      if (
        error instanceof AxiosError &&
        (error.response?.status !== 401 || !error.response.headers)
      ) {
        toastify({ description, id, type });
        return Promise.reject(error);
      }

      axios.interceptors.response.eject(interceptor);

      try {
        const { data } = await axios({
          baseURL: "/api/auth",
          method: "POST",
        });
        if (!data) {
          throw Error("Unknown error from refreshtoken");
        }

        error.config.headers = JSON.parse(JSON.stringify(error.config.headers));
        error.response.config.headers["Authorization"] = `Bearer ${data.token}`;

        return axios(error.response.config);
      } catch (e) {
        toastify({
          description: "Session timeout, please login!",
          id,
          type,
        });
        return Promise.reject("");
      } finally {
        createAxiosResponseInterceptor();
      }
    },
  );
};

createAxiosResponseInterceptor();

export default axios;
export const FoodApi = FoodApiFactory(undefined, undefined, axios);
export const HSRApi = HSRApiFactory(undefined, undefined, axios);

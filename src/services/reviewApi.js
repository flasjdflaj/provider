import axios from "axios";
import toast from "react-hot-toast";
import { getProviderToken } from "../utils/providerCookieUtils";

const BASE_URL = "http://localhost:4000/api";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const providerToken = getProviderToken();
  if (providerToken) {
    config.headers.Authorization = `Bearer ${providerToken}`;
  }
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Review API Error:", error.response || error.message);
    if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else if (error.message) {
      toast.error("Network error. Please try again.");
    }
    return Promise.reject(error);
  }
);

// Review APIs
export const getReviewsByMandapId = async (mandapId) => {
  const response = await api.get(`/get-review/${mandapId}`);
  return response.data.data.reviews;
};

export const getReviewById = async (reviewId) => {
  const response = await api.get(`/review/get-review-by-id/${reviewId}`);
  return response.data.data;
};

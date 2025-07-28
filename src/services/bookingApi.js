import axios from "axios";
import toast from "react-hot-toast";
import { getProviderToken } from "./providerCookieUtils";

const BASE_URL = "http://localhost:4000/api";

const providerApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

providerApi.interceptors.request.use((config) => {
  const providerToken = getProviderToken();
  if (providerToken) {
    config.headers.Authorization = `Bearer ${providerToken}`;
  }
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

providerApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Caterer API Error:", error.response || error.message);
    if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else if (error.message) {
      toast.error("Network error. Please try again.");
    }
    return Promise.reject(error);
  }
);
// Booking APIs
export const getBookingsByProvider = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

export const getBookingById = async (bookingId) => {
  const response = await api.get(`/booking/get-booking/${bookingId}`);
  return response.data;
};

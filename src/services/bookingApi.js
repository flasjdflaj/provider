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
    console.error("Booking API Error:", error.response || error.message);
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
  return response.data.data.bookings;
};

export const getBookingById = async (bookingId) => {
  const response = await api.get(`/booking/get-booking/${bookingId}`);
  return response.data.data;
};

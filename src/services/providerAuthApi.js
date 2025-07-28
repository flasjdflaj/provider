import axios from "axios";
import toast from "react-hot-toast";
import { getProviderToken } from "../utils/providerCookieUtils";

const BASE_URL = "http://localhost:4000/api/provider";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add appropriate token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    if (error.response?.data) {
      const errorMessage =
        error.response.data.error ||
        error.response.data.message ||
        "An error occurred";
      if (!errorMessage.includes("already logged in")) {
        toast.error(errorMessage);
      }
    } else if (error.message) {
      toast.error("Network error. Please try again.");
    }
    return Promise.reject(error);
  }
);

// Provider APIs
export const providerRegister = async ({
  name,
  email,
  password,
  phoneNumber,
}) => {
  const response = await api.post("/signup", {
    name,
    email,
    password,
    phoneNumber,
  });
  return response.data;
};

export const providerLogin = async ({ email, password }) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const providerLogout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const getProviderProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const updateProviderProfile = async (
  { name, email, password, phoneNumber, address },
  providerLogo
) => {
  const formData = new FormData();
  if (name) formData.append("name", name);
  if (email) formData.append("email", email);
  if (password) formData.append("password", password);
  if (phoneNumber) formData.append("phoneNumber", phoneNumber);
  if (address) formData.append("address", JSON.stringify(address));
  if (providerLogo) formData.append("providerLogo", providerLogo);
  const response = await api.put("/update-profile", formData);
  return response.data;
};

export const deleteProvider = async () => {
  const response = await api.delete("/delete-provider");
  return response.data;
};

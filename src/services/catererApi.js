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

// Caterer APIs
export const addCaterer = async (
  {
    mandapId,
    catererName,
    menuCategory,
    foodType,
    isCustomizable,
    customizableItems,
    hasTastingSession,
  },
  categoryImage
) => {
  const formData = new FormData();
  formData.append("mandapId", mandapId);
  formData.append("catererName", catererName);
  formData.append("menuCategory", JSON.stringify(menuCategory));
  formData.append("foodType", foodType);
  formData.append("isCustomizable", isCustomizable);
  if (customizableItems)
    formData.append("customizableItems", JSON.stringify(customizableItems));
  formData.append("hasTastingSession", hasTastingSession);
  if (categoryImage) formData.append("categoryImage", categoryImage);
  const response = await api.post("/add-caterer", formData);
  return response.data;
};

export const updateCaterer = async (catererId, catererData, categoryImage) => {
  const formData = new FormData();
  Object.keys(catererData).forEach((key) => {
    if (
      Array.isArray(catererData[key]) ||
      typeof catererData[key] === "object"
    ) {
      formData.append(key, JSON.stringify(catererData[key]));
    } else {
      formData.append(key, catererData[key]);
    }
  });
  if (categoryImage) formData.append("categoryImage", categoryImage);
  const response = await api.put(`/update-caterer/${catererId}`, formData);
  return response.data;
};

export const deleteCaterer = async (catererId) => {
  const response = await api.delete(`/delete-caterer/${catererId}`);
  return response.data;
};

export const getCatererById = async (catererId) => {
  const response = await api.get(`/get-caterer/${catererId}`);
  return response.data;
};

export const getCaterersByMandapId = async (mandapId) => {
  const response = await api.get(`/get-all-caterers/${mandapId}`);
  return response.data;
};

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
    console.error("Photographer API Error:", error.response || error.message);
    if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else if (error.message) {
      toast.error("Network error. Please try again.");
    }
    return Promise.reject(error);
  }
);

// Photographer APIs
export const addPhotographer = async (
  { mandapId, photographerName, photographyTypes, printOption },
  sampleWork
) => {
  const formData = new FormData();
  formData.append("mandapId", mandapId);
  formData.append("photographerName", photographerName);
  formData.append("photographyTypes", JSON.stringify(photographyTypes));
  if (printOption) formData.append("printOption", JSON.stringify(printOption));
  if (sampleWork && Array.isArray(sampleWork)) {
    sampleWork.forEach((file) => formData.append("sampleWork", file));
  }
  const response = await api.post("/add-photographer", formData);
  return response.data;
};

export const getPhotographers = async (mandapId) => {
  const response = await api.get(`/get-all-photographers/${mandapId}`);
  return response.data;
};

export const getPhotographerById = async (photographerId) => {
  const response = await api.get(`/get-photographer/${photographerId}`);
  return response.data;
};

export const updatePhotographer = async (
  photographerId,
  { photographerName, photographyTypes, printOption },
  sampleWork
) => {
  const formData = new FormData();
  if (photographerName) formData.append("photographerName", photographerName);
  if (photographyTypes)
    formData.append("photographyTypes", JSON.stringify(photographyTypes));
  if (printOption) formData.append("printOption", JSON.stringify(printOption));
  if (sampleWork && Array.isArray(sampleWork)) {
    sampleWork.forEach((file) => formData.append("sampleWork", file));
  }
  const response = await api.put(
    `/update-photographer/${photographerId}`,
    formData
  );
  return response.data;
};

export const deletePhotographer = async (photographerId) => {
  const response = await api.delete(`/delete-photographer/${photographerId}`);
  return response.data;
};

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
    console.error("Room API Error:", error.response || error.message);
    if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else if (error.message) {
      toast.error("Network error. Please try again.");
    }
    return Promise.reject(error);
  }
);

// Room APIs
export const addRoom = async (
  { mandapId, AcRoom, NonAcRoom },
  acRoomImages,
  nonAcRoomImages
) => {
  const formData = new FormData();
  formData.append("mandapId", mandapId);
  if (AcRoom) formData.append("AcRoom", JSON.stringify(AcRoom));
  if (NonAcRoom) formData.append("NonAcRoom", JSON.stringify(NonAcRoom));
  if (acRoomImages && Array.isArray(acRoomImages)) {
    acRoomImages.forEach((image) => formData.append("acRoomImages", image));
  }
  if (nonAcRoomImages && Array.isArray(nonAcRoomImages)) {
    nonAcRoomImages.forEach((image) =>
      formData.append("nonAcRoomImages", image)
    );
  }
  const response = await api.post("/add-room", formData);
  return response.data.data;
};

export const getAllRooms = async () => {
  const response = await api.get("/get-all-rooms");
  return response.data.data.rooms;
};

export const updateRoom = async (
  roomId,
  { AcRoom, NonAcRoom },
  acRoomImages,
  nonAcRoomImages
) => {
  const formData = new FormData();
  if (AcRoom) formData.append("AcRoom", JSON.stringify(AcRoom));
  if (NonAcRoom) formData.append("NonAcRoom", JSON.stringify(NonAcRoom));
  if (acRoomImages && Array.isArray(acRoomImages)) {
    acRoomImages.forEach((image) => formData.append("acRoomImages", image));
  }
  if (nonAcRoomImages && Array.isArray(nonAcRoomImages)) {
    nonAcRoomImages.forEach((image) =>
      formData.append("nonAcRoomImages", image)
    );
  }
  const response = await api.put(`/update-room/${roomId}`, formData);
  return response.data.data;
};

export const deleteRoom = async (roomId) => {
  const response = await api.delete(`/delete-room/${roomId}`);
  return response.data.data;
};

export const getRoomById = async (roomId) => {
  const response = await api.get(`/get-room/${roomId}`);
  return response.data.data.room;
};

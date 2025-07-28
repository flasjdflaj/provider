import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { getProviderToken } from "../utils/providerCookieUtils";

const SOCKET_URL = "http://localhost:4000";

// Provider Socket Service for BookMyMandap
export const providerSocketService = {
  socket: null,

  // Initialize Socket.IO connection
  connect: (providerId) => {
    if (!providerId) {
      toast.error("Provider ID is required for socket connection");
      return;
    }

    const token = getProviderToken();
    if (!token) {
      // toast.error("Authentication token not found");
      return;
    }

    // Create socket connection with authentication token
    providerSocketService.socket = io(SOCKET_URL, {
      withCredentials: true,
      auth: { token },
    });

    // Handle connection
    providerSocketService.socket.on("connect", () => {
      console.log(
        "Connected to Socket.IO server:",
        providerSocketService.socket.id
      );
      // Join provider room
      providerSocketService.socket.emit("joinProviderRoom", providerId);
      toast.success("Connected to real-time updates");
    });

    // Handle new provider registration event
    providerSocketService.socket.on("newProviderRegistration", (data) => {
      console.log("New provider registered:", data);
      toast.success(
        `Welcome, ${data.provider.name}! Your account is pending approval.`
      );
    });

    // Handle login success event
    providerSocketService.socket.on("loginSuccess", (data) => {
      console.log("Login successful:", data);
      toast.success("Logged in successfully!");
    });

    // Handle approval status update
    providerSocketService.socket.on("approvalStatusUpdate", (data) => {
      console.log("Approval status updated:", data);
      if (data.status === "approved") {
        toast.success("Your provider account has been approved!");
      } else if (data.status === "rejected") {
        toast.error("Your provider account was rejected.");
      }
    });

    // Handle connection error
    providerSocketService.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      toast.error("Failed to connect to real-time updates");
    });

    // Handle disconnection
    providerSocketService.socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      toast.error("Disconnected from real-time updates");
    });
  },

  // Disconnect from Socket.IO
  disconnect: () => {
    if (providerSocketService.socket) {
      providerSocketService.socket.disconnect();
      providerSocketService.socket = null;
      console.log("Provider socket disconnected");
    }
  },

  // Check if socket is connected
  isConnected: () => {
    return providerSocketService.socket?.connected || false;
  },
};

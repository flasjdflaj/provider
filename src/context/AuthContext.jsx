import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getProviderProfile,
  providerLogin,
  providerLogout,
  providerRegister,
  updateProviderProfile,
} from "../services/providerAuthApi";
import { providerSocketService } from "../services/providerSocketService";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authorizationStatus, setAuthorizationStatus] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const provider = await getProviderProfile();
        setUser(provider);
        setAuthorizationStatus(provider.authorizationStatus || "pending");
        localStorage.setItem("mandap_user", JSON.stringify(provider));
        providerSocketService.connect(provider._id);
      } catch (error) {
        localStorage.removeItem("mandap_user");
        providerSocketService.disconnect();
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("mandap_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setAuthorizationStatus(parsedUser.authorizationStatus || "pending");
        providerSocketService.connect(parsedUser._id);
      } catch (error) {
        localStorage.removeItem("mandap_user");
      }
    }
    fetchProfile();

    // Listen for authorization status updates via socket
    providerSocketService.socket?.on("approvalStatusUpdate", (data) => {
      setAuthorizationStatus(data.authorizationStatus);
      if (data.authorizationStatus === "approved") {
        toast.success("Your provider account has been approved!");
      } else if (data.authorizationStatus === "rejected") {
        toast.error("Admin rejected your approval request.");
        setUser(null);
        localStorage.removeItem("mandap_user");
        providerSocketService.disconnect();
      } else if (data.authorizationStatus === "pending") {
        toast.error("Please wait for admin approval.");
      }
    });

    return () => {
      providerSocketService.disconnect();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const data = await providerLogin({ email, password });
      console.log("Login response:", data); // Debug log
      if (data.provider.authorizationStatus !== "approved") {
        console.log("Login blocked: authorizationStatus is not approved"); // Debug log
        toast.error(
          data.provider.authorizationStatus === "rejected"
            ? "Admin rejected your approval request."
            : "Please wait for admin approval."
        );
        return false;
      }
      setUser(data.provider);
      setAuthorizationStatus(data.provider.authorizationStatus || "pending");
      localStorage.setItem("mandap_user", JSON.stringify(data.provider));
      providerSocketService.connect(data.provider._id);
      toast.success("Login successful.");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Login failed. Please try again."
      );
      return false;
    }
  };

  const register = async (name, email, password, phoneNumber) => {
    try {
      const data = await providerRegister({
        name,
        email,
        password,
        phoneNumber,
      });

      setUser(data.provider);
      setAuthorizationStatus(data.provider.authorizationStatus || "pending");
      localStorage.setItem("mandap_user", JSON.stringify(data.provider));
      providerSocketService.connect(data.provider._id);
      return data.provider;
    } catch (error) {
      return false;
    }
  };

  const updateProfile = async (data, providerLogo) => {
    try {
      const updatedProvider = await updateProviderProfile(data, providerLogo);
      setUser(updatedProvider.provider);
      setAuthorizationStatus(
        updatedProvider.provider.authorizationStatus || "pending"
      );
      localStorage.setItem(
        "mandap_user",
        JSON.stringify(updatedProvider.provider)
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await providerLogout();
      setUser(null);
      setAuthorizationStatus("pending");
      localStorage.removeItem("mandap_user");
      providerSocketService.disconnect();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Logout failed. Please try again."
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authorizationStatus,
        login,
        register,
        updateProfile,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

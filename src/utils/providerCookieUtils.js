import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: true,
  sameSite: "none",
};

// Provider Cookie Utilities for BookMyMandap
export const setProviderToken = (token) => {
  Cookies.set("providerToken", token, COOKIE_OPTIONS);
};

export const getProviderToken = () => {
  return Cookies.get("providerToken");
};

export const removeProviderToken = () => {
  Cookies.remove("providerToken");
};

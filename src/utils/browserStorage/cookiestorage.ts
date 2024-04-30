import Cookies from "js-cookie";

export const setToCookie = (key: string, value: string, options?: Cookies.CookieAttributes) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return Cookies.set(key, value, {
    secure: true,
    ...options,
  });
};

export const getFromCookie = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return Cookies.get(key);
};

export const removeFromCookie = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return Cookies.remove(key);
};

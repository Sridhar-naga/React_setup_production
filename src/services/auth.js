export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || "Auth_Token";
export const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || "Auth_User";

export const getAuthToken = () => {
  return (
    localStorage.getItem(TOKEN_KEY) ||
    localStorage.getItem("Auth_Token") ||
    localStorage.getItem("undefined")
  );
};

export const getAuthUser = () => {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem("Auth_User");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAuthToken = (token = "demo-token", user = null) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("Auth_Token", token);
  if (user) {
    const serialized = JSON.stringify(user);
    localStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem("Auth_User", serialized);
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("Auth_Token");
  localStorage.removeItem("Auth_User");
  localStorage.removeItem("undefined");
  localStorage.removeItem("token");
};


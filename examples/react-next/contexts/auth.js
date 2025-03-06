"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getToken,
  setToken as setTokenCookie,
  removeToken as removeTokenCookie,
  setMapList as setMapListCookie,
  getMapList as getMapListCookie,
  removeMapList as removeMapListCookie,
} from "@/shared/cookies";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState(
    process.env.NEXT_PUBLIC_APIURL ? process.env.NEXT_PUBLIC_APIURL : ""
  );
  const [logged, setLogged] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  const resetAuthState = () => {
    setLogged(false);
    setToken(null);
    setUserId(null);
    setProjects([]);
    removeTokenCookie();
    removeMapListCookie();
  };

  useEffect(() => {
    (async () => {
      if (!getToken()) {
        console.log("No token found");

        return;
      }
      console.log("token cookie found, authenticating...");
      try {
        const response = await fetch(`${apiUrl}me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          resetAuthState();
          return;
        }
        setToken(getToken());
        setUserId(data.message.id);
        setLogged(true);
        const listMaps = getMapListCookie();
        if (listMaps) {
          setProjects(JSON.parse(listMaps));
        }

        console.log("authenticated through cookie", data);
      } catch (error) {
        console.error("Login error:", error);
        return { error: true, message: "An unexpected error occurred" };
      }
    })();
  }, []);
  const login = async (email, password) => {
    try {
      const response = await fetch(`${apiUrl}letsgo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: email, pwd: password }),
      });

      const data = await response.json();
      console.log("login", data);

      if (!response.ok) {
        return { error: true, message: data.message || "Login failed" };
      }

      setToken(data.message.token);
      setUserId(data.message.id);
      setLogged(true);
      setProjects(data.message.maps);
      setTokenCookie(data.message.token);
      setMapListCookie(JSON.stringify(data.message.maps));
    } catch (error) {
      console.error("Login error:", error);
      return { error: true, message: "An unexpected error occurred" };
    }

    return { error: false };
  };

  const logout = async () => {
    console.log("logout", token);
    try {
      const response = await fetch(`${apiUrl}logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("logout", data);

      if (!response.ok) {
        return { error: true, message: data.message || "Logout failed" };
      }

      // Reset auth state and remove token cookie
      resetAuthState();
      router.push("/");

      return { error: false };
    } catch (error) {
      console.error("Logout error:", error);
      return { error: true, message: "An unexpected error occurred" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logged,
        token,
        login,
        logout,
        userId,
        projects,
        apiUrl,
        setApiUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

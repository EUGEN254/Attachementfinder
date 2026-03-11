import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import authService from "../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const AppContext = createContext();

// custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currency = "KES";

  // load user on mount(check if already logged in)
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const result = await authService.getCurrentUser();
      console.log("Auth check result:", result);
      if (result.data) {
        setUser(result.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      if (result.data) {
        setUser(result.data.user);
        return { data: result.data };
      } else {
        return { error: result.error };
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      if (result.data) {
        setUser(result.data.user);
        return { data: result.data };
      } else {
        return { error: result.error };
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      const result = await authService.logout();
      if (result.data) {
        setUser(null);
        navigate("/");
        toast.success(result.data.message);
      } else {
        return { error: result.error };
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  const value = {
    currency,
    register,
    login,
    logout,
    loading,
    user,
    isAuthenticated: !!user, //user ? true : false
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

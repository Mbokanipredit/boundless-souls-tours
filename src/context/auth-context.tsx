"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  status?: "Active" | "Blocked";
}

interface AuthContextType {
  user: UserAccount | null;
  isAdminLoggedIn: boolean;
  registeredUsers: UserAccount[];
  loginUser: (email: string, pass: string) => { success: boolean; message?: string };
  registerUser: (name: string, email: string, phone: string, pass: string) => { success: boolean; message?: string };
  logoutUser: () => void;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  // Admin user management functions
  addUser: (name: string, email: string, phone: string) => void;
  updateUser: (id: string, updatedData: Partial<UserAccount>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>([
    {
      id: "usr-demo",
      name: "Demo Traveler",
      email: "traveler@example.com",
      phone: "+250 788 123 456",
      createdAt: "2026-10-02T10:00:00Z",
      status: "Active",
    },
    {
      id: "usr-102",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1 555 234 5678",
      createdAt: "2026-10-01T14:20:00Z",
      status: "Active",
    },
    {
      id: "usr-103",
      name: "Jean-Paul Nshuti",
      email: "jeanpaul@rwanda-tours.rw",
      phone: "+250 789 999 111",
      createdAt: "2026-09-28T08:15:00Z",
      status: "Active",
    },
  ]);

  const isInitialized = React.useRef(false);

  const loadAuthFromStorage = () => {
    if (typeof window === "undefined") return;
    try {
      const savedUser = localStorage.getItem("bst_current_user");
      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("AuthContext user parse error:", e);
      localStorage.removeItem("bst_current_user");
    }

    try {
      const savedAdmin = localStorage.getItem("bst_admin_authed");
      if (savedAdmin === "true") {
        setIsAdminLoggedIn(true);
      }
    } catch (e) {
      console.error("AuthContext admin parse error:", e);
    }

    try {
      const savedReg = localStorage.getItem("bst_registered_users");
      if (savedReg && savedReg !== "undefined" && savedReg !== "null") {
        const parsed = JSON.parse(savedReg);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRegisteredUsers(parsed);
        }
      }
    } catch (e) {
      console.error("AuthContext registered users parse error:", e);
    }
  };

  useEffect(() => {
    loadAuthFromStorage();
    isInitialized.current = true;

    const handleStorageChange = () => {
      loadAuthFromStorage();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (isInitialized.current && typeof window !== "undefined") {
      localStorage.setItem("bst_registered_users", JSON.stringify(registeredUsers));
    }
  }, [registeredUsers]);

  const registerUser = (name: string, email: string, phone: string, pass: string) => {
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser: UserAccount = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
      status: "Active",
    };
    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("bst_registered_users", JSON.stringify(updated));
      localStorage.setItem("bst_current_user", JSON.stringify(newUser));
    }
    return { success: true };
  };

  const loginUser = (email: string, pass: string) => {
    const found = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found && found.status === "Blocked") {
      return { success: false, message: "Your account has been suspended by the administrator." };
    }
    if (!found) {
      const newUser: UserAccount = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: email.split("@")[0],
        email,
        phone: "",
        createdAt: new Date().toISOString(),
        status: "Active",
      };
      const updated = [...registeredUsers, newUser];
      setRegisteredUsers(updated);
      setUser(newUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("bst_registered_users", JSON.stringify(updated));
        localStorage.setItem("bst_current_user", JSON.stringify(newUser));
      }
      return { success: true };
    }
    setUser(found);
    if (typeof window !== "undefined") {
      localStorage.setItem("bst_current_user", JSON.stringify(found));
    }
    return { success: true };
  };

  const logoutUser = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bst_current_user");
    }
  };

  const loginAdmin = (email: string, pass: string) => {
    if (email.toLowerCase() === "admin@boundlesssouls.com" && pass === "admin") {
      setIsAdminLoggedIn(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("bst_admin_authed", "true");
      }
      return true;
    }
    if (email === "admin" && pass === "admin") {
      setIsAdminLoggedIn(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("bst_admin_authed", "true");
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bst_admin_authed");
    }
  };

  // Admin control operations
  const addUser = (name: string, email: string, phone: string) => {
    const newUser: UserAccount = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
      status: "Active",
    };
    setRegisteredUsers((prev) => [newUser, ...prev]);
  };

  const updateUser = (id: string, updatedData: Partial<UserAccount>) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedData } : u))
    );
    if (user && user.id === id) {
      const updatedCurrentUser = { ...user, ...updatedData };
      setUser(updatedCurrentUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("bst_current_user", JSON.stringify(updatedCurrentUser));
      }
    }
  };

  const deleteUser = (id: string) => {
    setRegisteredUsers((prev) => prev.filter((u) => u.id !== id));
    if (user && user.id === id) {
      logoutUser();
    }
  };

  const toggleUserStatus = (id: string) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === "Blocked" ? "Active" : "Blocked";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdminLoggedIn,
        registeredUsers,
        loginUser,
        registerUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
        addUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


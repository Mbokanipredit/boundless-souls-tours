"use client";

import React, { useState } from "react";
import { X, User, Mail, Phone, Lock, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const { loginUser, registerUser } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [error, setError] = useState<string>("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", password: "" });

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginForm.email) {
      setError("Please enter your email.");
      return;
    }
    const res = loginUser(loginForm.email, loginForm.password);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || "Invalid credentials.");
    }
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!regForm.name || !regForm.email) {
      setError("Please fill in your name and email.");
      return;
    }
    const res = registerUser(regForm.name, regForm.email, regForm.phone, regForm.password);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || "Registration failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black">
            {tab === "login" ? "Welcome Back" : "Create Traveler Account"}
          </h2>
          <p className="text-xs text-slate-400">
            {tab === "login"
              ? "Log in to view your trip plans, approvals, & admin messages."
              : "Register to track your custom bookings & receive updates."}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => {
              setTab("login");
              setError("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              tab === "login" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab("register");
              setError("");
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              tab === "register" ? "bg-emerald-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {tab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="traveler@example.com"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-5 rounded-full text-xs shadow-lg shadow-emerald-600/30 gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  required
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="email"
                  required
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Phone Number (WhatsApp)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  placeholder="+250 788 000 000"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="password"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="bg-slate-950 border-slate-800 text-white pl-9"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-5 rounded-full text-xs shadow-lg shadow-emerald-600/30 gap-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Create Account</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, ArrowRight, PhoneCall, User, Bell, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Brand from "./brand";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import AuthModal from "@/components/auth/auth-modal";

function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const { notifications } = useData();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const userNotifications = mounted && user ? notifications.filter((n) => n.userId === user.id && !n.read) : [];

  const navLinks = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/about" },
    { label: "Experiences", link: "/experiences" },
    { label: "Services", link: "/services" },
    { label: "Why Choose Us", link: "/#why-us" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <>
      <nav className="w-full bg-white/95 text-slate-900 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 shadow-sm transition-all">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-20 items-center justify-between gap-6">
            {/* Logo Brand */}
            <Link href="/" className="flex items-center">
              <Brand variant="dark" showText={true} />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((nav) => {
                const isActive = pathname === nav.link || (nav.link === "/" && pathname === "/home");
                return (
                  <Link
                    key={nav.label}
                    href={nav.link}
                    className={cn(
                      "px-4 py-2 text-sm font-bold rounded-full transition-all",
                      isActive
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-slate-700 hover:text-emerald-600 hover:bg-slate-100/80"
                    )}
                  >
                    {nav.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {mounted && user ? (
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="relative bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200 font-bold text-xs rounded-full px-4 py-5 gap-2"
                  >
                    <User className="h-4 w-4 text-emerald-600" />
                    <span>My Dashboard</span>
                    {userNotifications.length > 0 && (
                      <span className="h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center -mr-1">
                        {userNotifications.length}
                      </span>
                    )}
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  variant="outline"
                  className="bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200 font-bold text-xs rounded-full px-4 py-5 gap-1.5"
                >
                  <User className="h-4 w-4 text-emerald-600" />
                  <span>Sign In</span>
                </Button>
              )}

              <Link href="/plan-trip">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-full px-6 py-5 shadow-md shadow-emerald-600/20 gap-2">
                  <Compass className="h-4 w-4" />
                  <span>Plan Your Trip</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-900 hover:bg-slate-100 rounded-full"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-5">
            <div className="flex flex-col space-y-1">
              {navLinks.map((nav) => {
                const isActive = pathname === nav.link;
                return (
                  <Link
                    key={nav.label}
                    href={nav.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-base font-bold rounded-xl transition-all",
                      isActive
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-slate-800 hover:bg-slate-100"
                    )}
                  >
                    {nav.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              {user ? (
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl py-5 gap-2">
                    <User className="h-4 w-4 text-emerald-400" />
                    <span>My Dashboard ({userNotifications.length} alerts)</span>
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl py-5 gap-2"
                >
                  <User className="h-4 w-4 text-emerald-400" />
                  <span>Sign In / Register</span>
                </Button>
              )}

              <Link href="/plan-trip" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-6 gap-2">
                  <Compass className="h-5 w-5" />
                  <span>Plan Your Trip</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

export default Navigation;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  User,
  Home,
  QrCode,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navLinks = [
    { href: "/", label: "Home", icon: Home, public: true },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
    { href: "/checkin", label: "Check-In", icon: QrCode, public: true },
    { href: "/admin", label: "Admin", icon: User, admin: true },
  ];

  const isActive = (href: string) => pathname === href;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
              <span className="text-black font-bold text-xl font-playfair">
                E
              </span>
            </div>
            <span className="font-playfair text-xl font-bold gold-text hidden sm:block">
              Elit Gym
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              // Show link based on auth state
              if (link.protected && !user) return null;
              if (link.admin && !user) return null; // Add role check here if needed

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                    isActive(link.href)
                      ? "bg-gold text-black"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {user ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link href="/login" className="px-6 py-2 rounded-lg btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-slide-in">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              if (link.protected && !user) return null;
              if (link.admin && !user) return null;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(link.href)
                      ? "bg-gold text-black"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-3 rounded-lg btn-primary text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

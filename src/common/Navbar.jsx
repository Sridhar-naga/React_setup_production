import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearAuthStorage } from "../services/auth";
import {
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    clearAuthStorage();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-900/10 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* LEFT: menu + greeting */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl border border-emerald-900/15 p-2 text-[#1F2937] transition hover:bg-[#F0FDF4] hover:text-[#166534]"
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold tracking-tight text-[#1F2937] sm:text-xl">
              Welcome back, <span className="font-extrabold text-[#166534]">Dr. Sarah</span> 👋
            </h2>
            <p className="hidden truncate text-xs text-slate-500 sm:block">
              CarePulse Central Hospital • Clinical Command Center
            </p>
          </div>
        </div>

        {/* RIGHT: search, notifications, profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop search */}
          <div className="hidden h-10 w-48 items-center rounded-xl border border-emerald-900/15 bg-[#F0FDF4]/60 px-3 transition focus-within:border-[#166534] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#84CC16]/30 md:flex lg:w-72">
            <Search size={17} className="shrink-0 text-emerald-800/60" />
            <input
              type="text"
              placeholder="Search patients, MRN, doctors..."
              className="ml-2 w-full bg-transparent text-xs text-[#1F2937] outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="rounded-xl border border-emerald-900/15 p-2.5 text-slate-600 transition hover:bg-[#F0FDF4] hover:text-[#166534] md:hidden"
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-xl border border-emerald-900/15 p-2.5 text-slate-600 transition hover:bg-[#F0FDF4] hover:text-[#166534]"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#84CC16] ring-2 ring-white" />
          </button>

          {/* Profile */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl border border-emerald-900/15 p-1.5 transition hover:bg-[#F0FDF4] sm:pr-2.5"
              aria-label="Open profile menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#166534] to-[#15803d] text-xs font-bold text-white shadow-sm ring-1 ring-[#84CC16]/40">
                Dr
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold leading-tight text-[#1F2937]">
                  Dr. Sarah Jenkins
                </p>
                <p className="text-[10px] font-medium text-slate-500">
                  Chief Medical Officer
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`hidden text-slate-400 transition-transform sm:block ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-emerald-900/10 bg-white p-2 shadow-xl">
                <div className="border-b border-emerald-900/10 px-3 py-3">
                  <p className="text-xs font-bold text-[#1F2937]">Dr. Sarah Jenkins</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    s.jenkins@carepulse-hospital.org
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-[#84CC16]/20 px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
                    Chief Medical Director
                  </span>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium text-[#1F2937] transition hover:bg-[#F0FDF4] hover:text-[#166534]"
                  >
                    <User size={15} className="text-emerald-800/60" />
                    <span>Doctor Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium text-[#1F2937] transition hover:bg-[#F0FDF4] hover:text-[#166534]"
                  >
                    <Settings size={15} className="text-emerald-800/60" />
                    <span>Hospital Settings</span>
                  </button>
                </div>

                <div className="border-t border-emerald-900/10 pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="border-t border-emerald-900/10 px-4 py-3 md:hidden">
          <div className="flex h-10 items-center rounded-xl border border-emerald-900/15 bg-[#F0FDF4]/60 px-3 focus-within:border-[#166534] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#84CC16]/30">
            <Search size={17} className="shrink-0 text-emerald-800/60" />
            <input
              type="text"
              autoFocus
              placeholder="Search patients, MRN, doctors..."
              className="ml-2 w-full bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
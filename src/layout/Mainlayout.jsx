import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

const Mainlayout = ({ Element }) => {
  // Desktop: sidebar open (w-64) or collapsed to an icon rail (w-20)
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Mobile: slide-in drawer
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // The Navbar menu button toggles the sidebar on desktop, opens the drawer on mobile
  const handleMenuClick = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsCollapsed((prev) => !prev);
    } else {
      setIsMobileOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] font-sans text-[#1F2937] antialiased">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
      />

      {/* The content always starts where the sidebar ends, so it is never covered */}
      <div
        className={`flex min-h-screen min-w-0 flex-col transition-[margin] duration-300 ease-in-out ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Navbar onMenuClick={handleMenuClick} />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {Element ? Element : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mainlayout;
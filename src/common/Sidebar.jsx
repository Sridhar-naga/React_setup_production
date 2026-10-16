import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Stethoscope,
  Users,
  CalendarCheck,
  Bed,
  Activity,
  Receipt,
  Sliders,
  X,
  HeartPulse,
} from "lucide-react";

// Clinical hospital navigation
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "doctors", label: "Doctors & Staff", icon: Stethoscope, path: "/doctors" },
  { id: "patients", label: "Patients & EHR", icon: Users, path: "/patients" },
  { id: "appointments", label: "Appointments", icon: CalendarCheck, path: "/appointments" },
  { id: "wards", label: "Wards & Beds", icon: Bed, path: "/wards" },
  { id: "emergency", label: "Emergency & ICU", icon: Activity, path: "/emergency" },
  { id: "billing", label: "Billing & Claims", icon: Receipt, path: "/billing" },
  { id: "settings", label: "Hospital Settings", icon: Sliders, path: "/settings" },
];

import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearAuthStorage } from "../services/auth";

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [openSubmenus, setOpenSubmenus] = useState({});

  // The mobile drawer always shows labels; desktop follows the collapsed state
  const expanded = isMobileOpen || !isCollapsed;

  // Open the submenu that matches the current route
  useEffect(() => {
    const match = navItems.find((item) =>
      item.children?.some((c) => location.pathname.startsWith(c.path))
    );
    if (match) setOpenSubmenus((p) => ({ ...p, [match.id]: true }));
  }, [location.pathname]);

  // Close the mobile drawer after navigating
  useEffect(() => {
    setIsMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const isItemActive = (item) =>
    item.children
      ? item.children.some((c) => location.pathname.startsWith(c.path))
      : location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`);

  const handleLogout = () => {
    clearAuthStorage();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const itemClass = (active) =>
    `group flex w-full items-center gap-3 rounded-lg border-l-4 px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
      active
        ? "border-[#84CC16] bg-[#84CC16]/15 text-white font-semibold"
        : "border-transparent text-emerald-100/75 hover:bg-white/10 hover:text-white"
    } ${expanded ? "" : "justify-center"}`;

  const iconClass = (active) =>
    `shrink-0 transition-colors ${
      active ? "text-[#84CC16]" : "text-emerald-300/70 group-hover:text-emerald-100"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen max-w-[85vw] flex-col border-r border-emerald-900/40 bg-[#0f3d20] shadow-xl transition-all duration-300 ease-in-out ${
          expanded ? "w-64" : "w-20"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* HEADER */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-emerald-900/50 px-4 sm:h-20">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#84CC16] text-[#0f3d20] shadow-lg shadow-[#84CC16]/20">
              <HeartPulse size={24} className="stroke-[2.5]" />
            </div>

            {expanded && (
              <div className="min-w-0 overflow-hidden">
                <h1 className="whitespace-nowrap text-lg font-black tracking-tight text-white">
                  CARE<span className="text-[#84CC16]">PULSE</span>
                </h1>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#84CC16]">
                  <Activity size={11} />
                  Hospital Command
                </div>
              </div>
            )}
          </div>

          {isMobileOpen && (
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg p-2 text-emerald-300 transition hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="sidebar-scroll flex-1 overflow-y-auto px-3 py-5">
          {expanded && (
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/60">
              Clinical Operations
            </p>
          )}

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openSubmenus[item.id];

              return (
                <div key={item.id}>
                  {hasChildren ? (
                    <button
                      type="button"
                      title={!expanded ? item.label : undefined}
                      onClick={() =>
                        setOpenSubmenus((p) => ({ ...p, [item.id]: !p[item.id] }))
                      }
                      className={itemClass(active)}
                    >
                      <Icon size={19} className={iconClass(active)} />
                      {expanded && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronDown
                            size={16}
                            className={`text-emerald-300/60 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      title={!expanded ? item.label : undefined}
                      className={itemClass(active)}
                    >
                      <Icon size={19} className={iconClass(active)} />
                      {expanded && <span className="flex-1">{item.label}</span>}
                    </NavLink>
                  )}

                  {hasChildren && isOpen && expanded && (
                    <div className="ml-5 mt-1 space-y-1 border-l border-emerald-800/60 pl-3">
                      {item.children.map((child) => {
                        const childActive =
                          location.pathname === child.path ||
                          location.pathname.startsWith(`${child.path}/`);

                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                              childActive
                                ? "bg-[#84CC16]/20 font-semibold text-white"
                                : "text-emerald-200/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <span>{child.label}</span>
                            {child.badge && (
                              <span className="rounded bg-[#84CC16]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#84CC16]">
                                {child.badge}
                              </span>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* USER SECTION */}
        <div className="shrink-0 border-t border-emerald-900/50 p-3">
          {expanded ? (
            <div className="mb-2 flex items-center gap-3 rounded-xl border border-emerald-800/40 bg-black/20 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#84CC16] text-xs font-black text-[#0f3d20] shadow-sm">
                Dr
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">Dr. Sarah Jenkins</p>
                <p className="truncate text-xs text-emerald-200/70">Chief Medical Officer</p>
              </div>
            </div>
          ) : (
            <div className="mb-2 flex justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#84CC16] text-xs font-black text-[#0f3d20] shadow-sm">
                Dr
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title={!expanded ? "Sign Out" : undefined}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition-colors duration-200 hover:bg-red-500/15 hover:text-red-200 ${
              expanded ? "" : "justify-center"
            }`}
          >
            <LogOut size={18} />
            {expanded && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
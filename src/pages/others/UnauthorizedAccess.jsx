import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";

const UnauthorizedAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-red-100 bg-red-50 shadow-inner sm:h-24 sm:w-24">
          <ShieldAlert className="h-10 w-10 text-red-500 sm:h-12 sm:w-12" />
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#166534] text-white shadow ring-2 ring-[#84CC16]/40">
          <Lock size={16} />
        </div>
      </div>

      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
        Clinical Clearance Required
      </span>

      <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2937] sm:text-4xl">
        Restricted Medical Ward
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
        You do not possess the required medical credential clearance or clinical role permissions to view this patient EHR or administrative partition. If this is an urgent patient care situation, please contact the Chief Medical Officer or Hospital IT Support.
      </p>

      <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-900/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#1F2937] shadow-sm transition hover:bg-[#F0FDF4] hover:text-[#166534]"
        >
          <ArrowLeft size={16} />
          <span>Return to Previous Ward</span>
        </button>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#166534]/20 transition hover:bg-[#14532d]"
        >
          <Home size={16} />
          <span>Return to Clinical Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
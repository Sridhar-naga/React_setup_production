import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  LockKeyhole,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { setAuthToken } from "../../services/auth";
import { HeartPulse } from "lucide-react";

const features = [
  "Secure Electronic Health Records (EHR) & History",
  "Real-time Inpatient Bed Allocation & Ward Matrix",
  "Automated OPD Scheduling & Doctor Queue",
  "NABH & HIPAA Compliant Clinical Protection",
];

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("superadmin@gmail.com");
  const [password, setPassword] = useState("superadmin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearErrors = () => {
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Staff email address is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    // UI-only sign-in: placeholder token
    setLoading(true);
    setAuthToken("demo-token", { email: email.trim(), role: "doctor" });

    const from = location.state?.from?.pathname;
    navigate(from && !from.includes("/login") ? from : "/dashboard", {
      replace: true,
    });
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#14161a] py-2.5 pl-9 text-base text-white placeholder-gray-600 outline-none transition focus:border-[#84CC16] focus:ring-1 focus:ring-[#84CC16]/40 sm:text-sm";

  return (
    <div className="flex min-h-screen flex-col justify-between bg-black p-4 sm:p-6 lg:p-8">
      <div className="saas-grid-overlay" />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#84CC16] text-[#0f3d20] shadow-lg shadow-[#84CC16]/20">
            <HeartPulse size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base font-extrabold tracking-tight text-white">CARE</span>
              <span className="text-base font-extrabold tracking-tight text-[#84CC16]">PULSE</span>
            </div>
            <p className="text-[11px] font-medium tracking-wide text-gray-400">
              Hospital Information & Clinical Management
            </p>
          </div>
        </div>

        <div className="saas-badge-glow hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-gray-300 backdrop-blur-md sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#84CC16]" />
          <span className="font-medium">All clinical systems operational</span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 my-auto py-8">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left: value proposition (desktop only) */}
          <div className="hidden flex-col justify-center space-y-6 lg:col-span-5 lg:flex">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#84CC16]/30 bg-[#84CC16]/10 px-3.5 py-1 text-xs font-semibold text-[#84CC16]">
              <Sparkles size={13} />
              <span>Clinical Command Portal</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white">
              Empowering clinicians.
              <br />
              <span className="bg-gradient-to-r from-[#84CC16] via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                Elevating patient care.
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-gray-400">
              Access electronic health records, live ward telemetry, outpatient scheduling, and pharmacy dispatches.
            </p>

            <div className="space-y-3 pt-2">
              {features.map((text) => (
                <div key={text} className="flex items-center gap-3 text-xs text-gray-300">
                  <CheckCircle2 size={16} className="shrink-0 text-[#84CC16]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-gray-400">
              <LockKeyhole size={16} className="shrink-0 text-[#84CC16]" />
              <span>HIPAA & NABH 256-bit encrypted connection</span>
            </div>
          </div>

          {/* Right: login card */}
          <div className="lg:col-span-7">
            <div className="saas-glass-card rounded-2xl p-5 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Hospital Staff Portal
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Sign in with your medical credentials or staff ID.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1 block text-xs font-medium text-gray-300">
                    Staff / Clinical Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Mail size={16} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearErrors();
                      }}
                      placeholder=""
                      className={`${inputClass} pr-3`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-1 block text-xs font-medium text-gray-300">
                    Staff Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <Lock size={16} />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearErrors();
                      }}
                      placeholder="••••••••"
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition hover:text-gray-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#84CC16] py-3 text-sm font-bold text-[#0f3d20] shadow-lg shadow-[#84CC16]/20 transition hover:bg-[#a3e635] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin text-[#0f3d20]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        />
                      </svg>
                      <span>Authenticating…</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Clinical Portal</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 border-t border-white/5 pt-4 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
        <p>© 2026 CarePulse Health Systems. NABH & HIPAA Certified.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="cursor-pointer transition hover:text-gray-400">Clinical Protocol</span>
          <span className="cursor-pointer transition hover:text-gray-400">Emergency Helpline</span>
          <span className="cursor-pointer transition hover:text-gray-400">IT Support Desk</span>
        </div>
      </footer>
    </div>
  );
}

export default Login;
import React from "react";
import {
  Users,
  Bed,
  CalendarCheck,
  Activity,
  ArrowUpRight,
  Eye,
  UserPlus,
  CalendarPlus,
  Stethoscope,
  HeartPulse,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { title: "Total Registered Patients", value: "4,820", change: "+14.2%", icon: Users },
  { title: "Inpatient Bed Occupancy", value: "186 / 220", change: "84.5% Cap", icon: Bed },
  { title: "Today's Appointments", value: "72 Patients", change: "18 Completed", icon: CalendarCheck },
  { title: "Critical Care & ICU", value: "24 Admitted", change: "100% Staffed", icon: Activity },
];

const recentPatients = [
  {
    id: "MRN-90482",
    patient: "Eleanor Vance",
    ageGender: "36y · Female",
    department: "Cardiology",
    doctor: "Dr. Arvind Rao",
    room: "ICU - Bay 04",
    status: "Critical",
  },
  {
    id: "MRN-90481",
    patient: "Robert Chen",
    ageGender: "52y · Male",
    department: "Neurology",
    doctor: "Dr. Maya Sharma",
    room: "OPD Room 2B",
    status: "In Consultation",
  },
  {
    id: "MRN-90480",
    patient: "Ananya Iyer",
    ageGender: "29y · Female",
    department: "Maternity",
    doctor: "Dr. Sarah Jenkins",
    room: "Maternity Ward 102",
    status: "Admitted",
  },
  {
    id: "MRN-90479",
    patient: "David Miller",
    ageGender: "44y · Male",
    department: "Orthopedics",
    doctor: "Dr. Kevin Patel",
    room: "Ward 3 - Bed 14",
    status: "Discharged",
  },
];

const pendingClearances = [
  {
    id: "ADM-7041",
    name: "Ramesh Verma",
    ageGender: "48y · Male",
    department: "General Surgery",
    condition: "Post-Op Monitoring",
    bedReq: "Surgical Ward 204",
    priority: "Urgent",
  },
  {
    id: "ADM-7042",
    name: "Kavita Patel",
    ageGender: "32y · Female",
    department: "Obstetrics & Gynae",
    condition: "Labor Suite Transfer",
    bedReq: "Maternity Ward 102",
    priority: "Routine",
  },
  {
    id: "ADM-7043",
    name: "David Henderson",
    ageGender: "61y · Male",
    department: "Cardiology",
    condition: "Cardiac Observation",
    bedReq: "Telemetry Bed 08",
    priority: "Critical",
  },
];

const statusStyles = {
  Admitted: "bg-[#84CC16]/20 text-[#166534] border border-[#84CC16]/30",
  "In Consultation": "bg-sky-50 text-sky-800 border border-sky-200",
  Discharged: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  Critical: "bg-red-50 text-red-700 border border-red-200",
  Pending: "bg-amber-50 text-amber-800 border border-amber-200",
};

const priorityStyles = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  Urgent: "bg-amber-50 text-amber-800 border-amber-200",
  Routine: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
      statusStyles[status] || statusStyles.Pending
    }`}
  >
    {status}
  </span>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Admit Inpatient",
      desc: "Assign ward & bed number",
      icon: UserPlus,
      path: "/patients",
      iconClass: "bg-[#166534]/10 text-[#166534]",
      hoverClass: "hover:border-[#84CC16] hover:bg-[#F0FDF4]",
    },
    {
      label: "Book Appointment",
      desc: "Schedule outpatient visit",
      icon: CalendarPlus,
      path: "/appointments",
      iconClass: "bg-[#166534]/10 text-[#166534]",
      hoverClass: "hover:border-[#84CC16] hover:bg-[#F0FDF4]",
    },
    {
      label: "Doctor Duty Roster",
      desc: "Specialists on-duty & shifts",
      icon: Stethoscope,
      path: "/doctors",
      iconClass: "bg-[#84CC16]/20 text-[#166534]",
      hoverClass: "hover:border-[#84CC16] hover:bg-[#F0FDF4]",
    },
    {
      label: "Emergency & Triage",
      desc: "Emergency admissions & ICU",
      icon: HeartPulse,
      path: "/emergency",
      iconClass: "bg-[#166534]/10 text-[#166534]",
      hoverClass: "hover:border-[#84CC16] hover:bg-[#F0FDF4]",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#166534]">
          Clinical Command & Patient Care
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#1F2937] sm:text-3xl">
          Hospital Central Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, Dr. Sarah! Live overview of patient census, bed allocation, and outpatient clinics.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#84CC16]/60 hover:shadow-md sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold text-[#1F2937] sm:text-2xl">
                    {stat.value}
                  </h2>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#166534]/10 text-[#166534] ring-1 ring-[#84CC16]/30 sm:h-11 sm:w-11">
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-[#84CC16]/20 px-1.5 py-0.5 text-xs font-bold text-[#166534]">
                  <ArrowUpRight size={13} className="text-[#166534]" />
                  {stat.change}
                </span>
                <span className="ml-1 text-xs text-slate-400">vs yesterday</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT PATIENT ADMISSIONS & APPOINTMENTS */}
      <div className="rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-emerald-900/10 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#1F2937]">
              Recent Patient Admissions & OPD Appointments
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Live status of inpatient bed admissions and active outpatient consultations
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="shrink-0 text-sm font-semibold text-[#166534] hover:text-[#14532d] hover:underline"
          >
            View All Patients
          </button>
        </div>

        {/* Mobile: card list */}
        <div className="divide-y divide-emerald-900/10 md:hidden">
          {recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-start justify-between gap-3 px-4 py-4">
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1F2937]">
                  {patient.patient}{" "}
                  <span className="text-xs font-normal text-slate-500">
                    ({patient.ageGender})
                  </span>
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-600">
                  {patient.department} · {patient.doctor}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#166534]">
                  {patient.room}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <StatusBadge status={patient.status} />
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-[#F0FDF4] hover:text-[#166534]"
                  aria-label="View patient records"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet and up: table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-900/10 bg-[#F0FDF4]/70">
                {["Patient / MRN", "Demographics", "Department & Doctor", "Room / Ward", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-[#166534]"
                  >
                    {h}
                  </th>
                ))}
                <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-[#166534]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-emerald-900/5 last:border-0 hover:bg-[#F0FDF4]/40 transition"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <p className="text-sm font-bold text-[#1F2937]">{patient.patient}</p>
                    <p className="text-[11px] font-medium text-slate-400">{patient.id}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {patient.ageGender}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-[#1F2937]">{patient.department}</p>
                    <p className="text-xs text-slate-500">{patient.doctor}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-emerald-900">
                    {patient.room}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-[#F0FDF4] hover:text-[#166534]"
                      aria-label="View patient records"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK CLINICAL ACTIONS */}
      <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-base font-bold text-[#1F2937]">Quick Clinical Actions</h2>
        <p className="mt-1 text-xs text-slate-500">
          Frequently used hospital management workflows
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => navigate(action.path)}
                className={`flex items-center gap-3 rounded-xl border border-emerald-900/10 p-3 text-left transition ${action.hoverClass}`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.iconClass}`}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1F2937]">
                    {action.label}
                  </p>
                  <p className="truncate text-xs text-slate-500">{action.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PENDING ADMISSION & BED CLEARANCES */}
      <div className="rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-emerald-900/10 px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#1F2937]">
              Pending Admission & Bed Transfer Authorizations
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Patients awaiting doctor clearance and ward bed allocation
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-[#84CC16]/40 bg-[#84CC16]/20 px-3 py-1 text-xs font-bold text-[#166534]">
            {pendingClearances.length} Clearances Required
          </span>
        </div>

        <div className="divide-y divide-emerald-900/10">
          {pendingClearances.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#166534] text-xs font-black text-white shadow-sm ring-2 ring-[#84CC16]/30">
                  {item.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-bold text-[#1F2937]">
                      {item.name}
                    </p>
                    <span
                      className={`inline-flex rounded border px-1.5 py-0.2 text-[10px] font-semibold ${
                        priorityStyles[item.priority] || priorityStyles.Routine
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-500">
                    {item.department} · {item.condition}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold text-emerald-800/80">
                    Target: {item.bedReq} • ID: {item.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#1F2937] transition hover:bg-[#F0FDF4] hover:text-[#166534]"
                >
                  <Eye size={14} />
                  View Chart
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#166534] px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-[#166534]/20 transition hover:bg-[#14532d]"
                >
                  <CheckCircle2 size={14} className="text-[#84CC16]" />
                  Authorize
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <XCircle size={14} />
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
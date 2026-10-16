import { createSlice } from "@reduxjs/toolkit";

// ─── Static Clinical Director permission document (same shape as DB record) ─
const FULL = ["view", "create", "edit", "delete"];

export const CLINICAL_DIRECTOR_PERMISSION_DOC = {
  _id: "cmo-7041-carepulse-permissions",
  userId: "DOC-704",
  role: "ChiefMedicalDirector",
  permissions: {
    dashboard: ["view"],
    doctors: [...FULL],
    patients: [...FULL],
    appointments: [...FULL],
    wards: [...FULL],
    emergency: [...FULL],
    billing: [...FULL],
    pharmacy: [...FULL],
    laboratory: [...FULL],
    ehr: [...FULL],
    triage: [...FULL],
    radiology: [...FULL],
    settings: ["view", "edit"],
    staff: [...FULL],
    analytics: ["view"],
  },
  active: true,
  archive: false,
  updatedBy: null,
  // Dates are ISO strings so Redux state stays serializable
  createdAt: "2026-10-12T12:17:54.056Z",
  updatedAt: "2026-10-12T12:17:54.056Z",
  __v: 0,
};

// Backwards-compatibility alias
export const SUPERADMIN_PERMISSION_DOC = CLINICAL_DIRECTOR_PERMISSION_DOC;

// ─── State ────────────────────────────────────────────────────────────────────
// permission : the module -> actions map   { patients: ['view', ...], ... }
// profile    : the full permission document (role, userId, active, ...)
const initialState = {
  permission: CLINICAL_DIRECTOR_PERMISSION_DOC.permissions,
  profile: CLINICAL_DIRECTOR_PERMISSION_DOC,
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    // Accepts { permissions, profile } or a full permission document
    setAllValues: (state, action) => {
      const payload = action.payload || {};
      const doc = payload.permissions && payload.role ? payload : null;

      state.permission = doc
        ? doc.permissions
        : payload.permissions?.permissions || payload.permissions || {};
      state.profile = doc || payload.profile || null;
    },

    // Replace only the permission map
    setPermission: (state, action) => {
      state.permission = action.payload || {};
    },

    // Replace only the profile / document
    setProfile: (state, action) => {
      state.profile = action.payload || null;
    },

    resetPermission: (state) => {
      state.permission = {};
      state.profile = null;
    },
  },
});

export const { setAllValues, setPermission, setProfile, resetPermission } =
  permissionSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectPermissionMap = (state) => state.permission?.permission || {};
export const selectPermissionProfile = (state) => state.permission?.profile || null;
export const selectPermissionRole = (state) => state.permission?.profile?.role || null;

// Usage: useSelector(selectCanAccess("products", "create"))
export const selectCanAccess =
  (moduleKey, action = "view") =>
  (state) => {
    const role = String(state.permission?.profile?.role || "")
      .toLowerCase()
      .replace(/[\s_-]/g, "");
    if (
      role === "superadmin" ||
      role === "chiefmedicaldirector" ||
      role === "doctor" ||
      role === "medicaldirector"
    ) {
      return true;
    }

    const actions = state.permission?.permission?.[moduleKey];
    return Array.isArray(actions) ? actions.includes(action) : Boolean(actions);
  };

export default permissionSlice.reducer;
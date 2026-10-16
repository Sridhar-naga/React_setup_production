import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  TOKEN_KEY,
  STORAGE_KEY,
  getAuthToken,
  getAuthUser,
  clearAuthStorage,
} from "../../services/auth";

// ─── Static credentials (UI-only, no backend) ─────────────────────────────────
const STATIC_EMAIL = "superadmin@gmail.com";
const STATIC_PASSWORD = "superadmin@123";

const STATIC_ACCOUNT = {
  id: "DOC-704",
  fullName: "Dr. Sarah Jenkins",
  email: STATIC_EMAIL,
  role: "doctor",
  department: "Chief Medical Officer",
  permissions: {},
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Thunk ────────────────────────────────────────────────────────────────────
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    await delay(500); // simulate network latency

    if (
      email.trim().toLowerCase() !== STATIC_EMAIL ||
      password !== STATIC_PASSWORD
    ) {
      return rejectWithValue("Invalid email or password.");
    }

    const token = "carepulse-clinical-session-token";

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATIC_ACCOUNT));

    return { token, account: STATIC_ACCOUNT };
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const storedUser = getAuthUser();

const initialState = {
  user: storedUser,
  role: storedUser?.role || null,
  permissions: storedUser?.permissions || {},
  token: getAuthToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.permissions = {};
      state.token = null;
      state.error = null;
      clearAuthStorage();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.account;
        state.role = action.payload.account.role;
        state.permissions = action.payload.account.permissions;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectPermissions = (state) => state.auth.permissions;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
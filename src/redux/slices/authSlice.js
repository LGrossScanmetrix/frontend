import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import socket from '../../socket';

// Thunk für Login-Logik
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ name, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      if (!response.ok) throw new Error(`Login fehlgeschlagen: ${response.status}`);

      const data = await response.json();
      socket.emit("authenticate", { token: data.token });
      return { userId: data.user.id, token: data.token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk für Registrierung
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) throw new Error("Registrierung fehlgeschlagen");

      const data = await response.json();
      socket.emit("authenticate", { token: data.token });
      return { userId: data.user.id, token: data.token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated') || 'false'),
    userData: JSON.parse(localStorage.getItem('userData') || 'null'),
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userData');
    },
    loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
        localStorage.setItem('userData', JSON.stringify(action.payload));
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.error = null;
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
        localStorage.setItem('userData', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.error = null;
        localStorage.setItem('isAuthenticated', JSON.stringify(true));
        localStorage.setItem('userData', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

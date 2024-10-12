import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  password: string;
  token: string;
  library: any[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const checkRateLimit = (): boolean => {
  const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
  const now = Date.now();
  const recentAttempts = loginAttempts.filter((time: number) => now - time < RATE_LIMIT_WINDOW);

  if (recentAttempts.length >= MAX_ATTEMPTS) {
    return false; // Block login
  }

  localStorage.setItem('loginAttempts', JSON.stringify([...recentAttempts, now]));
  return true;
};

// Thunk for login
export const loginThunk = createAsyncThunk<boolean, { username: string; password: string }>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    if (!checkRateLimit()) {
      return rejectWithValue(false); // Too many login attempts
    }

    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);

      // Compare the provided password with the hashed password
      const passwordMatch = bcrypt.compareSync(password, userData.password);
      if (passwordMatch) {
        localStorage.setItem('user', JSON.stringify(userData)); // Save current logged-in user
        localStorage.setItem('token', userData.token); // Save token
        return true;
      }
    }
    return rejectWithValue(false);
  }
);

// Thunk for signup
export const signUpThunk = createAsyncThunk<boolean, { username: string; password: string }>(
  'auth/signUp',
  async ({ username, password }, { rejectWithValue }) => {
    const storedUser = localStorage.getItem(username);
    if (!storedUser) {
      // Hash the password before storing
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser: User = {
        username,
        password: hashedPassword, // Store hashed password
        token: 'dummy-token', // Replace with a real token
        library: [],
      };

      localStorage.setItem('user', JSON.stringify(newUser)); // Save user to localStorage
      localStorage.setItem(username, JSON.stringify(newUser)); // Save user under username key
      localStorage.setItem('token', newUser.token); // Save token
      return true;
    } else {
      return rejectWithValue(false); // Username already exists
    }
  }
);

// Create a slice for auth state management
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        state.user = JSON.parse(storedUser);
        state.token = storedToken;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      const router = useRouter();
      router.push('/');
    },
    updateUser: (
      state,
      action: PayloadAction<{ newUsername?: string; newPassword?: string }>
    ) => {
      if (state.user) {
        const oldUsername = state.user.username;

        // Update password with hashing if a new password is provided
        const updatedUser = {
          ...state.user,
          username: action.payload.newUsername || state.user.username,
          password: action.payload.newPassword
            ? bcrypt.hashSync(action.payload.newPassword, bcrypt.genSaltSync(10))
            : state.user.password, // Rehash password if it's updated
        };

        state.user = updatedUser;

        localStorage.removeItem(oldUsername);
        localStorage.setItem(updatedUser.username, JSON.stringify(updatedUser)); // Save updated user
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update currently logged-in user
      }
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder.addCase(loginThunk.fulfilled, (state) => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        state.user = JSON.parse(storedUser);
        state.token = storedToken;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isAuthenticated = false;
    });

    // Handle signup
    builder.addCase(signUpThunk.fulfilled, (state) => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        state.user = JSON.parse(storedUser);
        state.token = storedToken;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(signUpThunk.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const { initializeAuth, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;

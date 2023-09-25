import { createSlice, createAsyncThunk, createSelector, } from '@reduxjs/toolkit';
import apiRequest from '../apiRequest';

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, thunkApi) => {
      try {
        const {
          user: { token, ...user },
        } = await apiRequest.Auth.register(username, email, password);

        return { token, user };
      } catch (error) {
        if (isApiError(error)) {
          return thunkApi.rejectWithValue(error);
        }

        throw error;
      }
    },
    {
      condition: (_, { getState }) => !selectIsLoading(getState()),
    }
);

/**
 * Send a login request
 *
 * @param {object} argument
 * @param {string} argument.email
 * @param {string} argument.password
 */
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkApi) => {
      try {
        const {
          user: { token, ...user },
        } = await apiRequest.Auth.login(email, password);

        return { token, user };
      } catch (error) {
        if (isApiError(error)) {
          return thunkApi.rejectWithValue(error);
        }

        throw error;
      }
    },
    {
      condition: (_, { getState }) => !selectIsLoading(getState()),
    }
);

/**
 * Send a get current user request
 */
export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
      const {
        user: { token, ...user },
      } = await apiRequest.Auth.current();

      return { token, user };
    },
    {
      condition: (_, { getState }) => Boolean(selectAuthSlice(getState()).token),
    }
);

/**
 * Send a update user request
 *
 * @param {object} argument
 * @param {string} argument.email
 * @param {string} argument.username
 * @param {string} argument.bio
 * @param {string} argument.image
 * @param {string} argument.password
 */
export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async ({ email, username, bio, image, password }, thunkApi) => {
      try {
        const {
          user: { token, ...user },
        } = await apiRequest.Auth.save({ email, username, bio, image, password });

        return { token, user };
      } catch (error) {
        if (isApiError(error)) {
          return thunkApi.rejectWithValue(error);
        }

        throw error;
      }
    },
    {
      condition: (_, { getState }) =>
          selectIsAuthenticated(getState()) && !selectIsLoading(getState()),
    }
);

/**
 * @type {AuthState}
 */
const initialState = {
  status: Status.IDLE,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Log out the user
     */
    logout: () => initialState,
    /**
     * Update token
     *
     * @param {import('@reduxjs/toolkit').Draft<AuthState>} state
     * @param {import('@reduxjs/toolkit').PayloadAction<string>} action
     */
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder
        .addCase(login.fulfilled, successReducer)
        .addCase(register.fulfilled, successReducer)

    builder
        .addCase(login.rejected, failureReducer)
        .addCase(register.rejected, failureReducer)

    builder.addMatcher(
        (action) => /auth\/.*\/pending/.test(action.type),
        loadingReducer
    );
  },
});

export const { addUser, updateUsers, fetchUsers } = userSlice.actions;

export default userSlice.reducer;

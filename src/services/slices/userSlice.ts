import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TRegisterData, loginUserApi } from '../../utils/burger-api'; 
import { TUser } from '../../utils/types'; 

type UserState = {
  data: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loginUserRequest: boolean;
  loginUserError: string | null;
};

const initialState: UserState = {
  data: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loginUserRequest: false,
  loginUserError: null,
};

// Создание асинхронного действия для входа пользователя
export const loginUser = createAsyncThunk<
  { user: TUser }, // Тип успешного результата
  Omit<TRegisterData, 'name'>, // Тип аргументов
  { rejectValue: string } // Тип ошибки
>(
  'user/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginUserApi({ email, password });
      return response; // Предполагается, что ответ содержит user данные
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при входе');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.data = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload || 'Неизвестная ошибка';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: TUser }>) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  },
});

// Экспорт действий и редюсера
export const { logoutUser } = userSlice.actions;
export const authReducer = userSlice.reducer;


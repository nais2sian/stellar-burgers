import { userSlice, registerUser, loginUser, updateUser, getUser, logout, initialState } from './userSlice';
import { TUser } from '../../utils/types';

describe('userSlice reducer', () => {
  test('должен установить loginUserError в null при registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBeNull();
  });

  test('должен установить пользователя и isAuthChecked в true при registerUser.fulfilled', () => {
    const mockUser: TUser = { email: 'test@example.com', name: 'Test User' };
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  test('должен установить loginUserError при registerUser.rejected', () => {
    const action = { type: registerUser.rejected.type, error: { message: 'Registration error' } };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBe('Registration error');
  });

  test('должен установить loginUserError в null при loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBeNull();
    expect(state.isAuthChecked).toBe(false);
  });

  test('должен установить пользователя и isAuthChecked в true при loginUser.fulfilled', () => {
    const mockUser: TUser = { email: 'test@example.com', name: 'Test User' };
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  test('должен установить loginUserError при loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type, error: { message: 'Login error' } };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBe('Login error');
    expect(state.isAuthChecked).toBe(false);
  });

  test('должен установить isAuthChecked в true и обновить пользователя при updateUser.fulfilled', () => {
    const mockUser: TUser = { email: 'updated@example.com', name: 'Updated User' };
    const action = { type: updateUser.fulfilled.type, payload: { user: mockUser } };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('должен установить loginUserError при updateUser.rejected', () => {
    const action = { type: updateUser.rejected.type, error: { message: 'Update error' } };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBe('Update error');
    expect(state.isAuthChecked).toBe(false);
  });

  test('должен сбросить пользователя при logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual({ email: '', name: '' });
    expect(state.isAuthChecked).toBe(false);
  });
});

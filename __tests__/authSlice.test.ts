import authReducer, {
  loginUser,
  logoutUser,
} from '../src/redux/slices/authSlice';

describe('authSlice reducer & actions', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  const sampleUser = {
    name: 'Jane Doe',
    email: 'jane@example.com',
  };

  it('handles initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('sets user and isAuthenticated to true on loginUser', () => {
    const state = authReducer(initialState, loginUser(sampleUser));

    expect(state.user).toEqual(sampleUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('clears user and sets isAuthenticated to false on logoutUser', () => {
    const loggedInState = {
      user: sampleUser,
      isAuthenticated: true,
    };

    const state = authReducer(loggedInState, logoutUser());

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});

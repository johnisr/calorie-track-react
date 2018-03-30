import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should set uid to state at login', () => {
  const uid = 'ASDFANVASDRVC123';
  const action = { type: 'LOGIN', uid };
  const state = authReducer(undefined, action);
  expect(state).toEqual({ uid });
});

test('should clear state at logout', () => {
  const uid = 'ASDFANVASDRVC123';
  const action = { type: 'LOGOUT' };
  const state = authReducer({ uid }, action);
  expect(state).toEqual({ });
});
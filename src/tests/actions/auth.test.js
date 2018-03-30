import { login, logout } from '../../actions/auth';

test('shold setup login action object', () => {
  const uid = 'sasdfASDFJAVIANSDA13d';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid,
  });
});

test('shold setup logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT',
  });
});
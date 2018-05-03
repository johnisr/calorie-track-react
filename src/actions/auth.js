import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid,
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startDemo = () => {
  return () => {
    console.log('hello');
    let answer;
    try {
      answer = firebase.auth().signInWithEmailAndPassword('demo@example.com', 'demopass');
    } catch(e) {
      console.log(e);
    }
    return answer;
  };
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
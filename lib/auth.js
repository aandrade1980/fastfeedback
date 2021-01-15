import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

import firebase from './firebase';

import { createUser } from './firestore';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatUser = ({
    uid,
    email,
    displayName,
    photoURL,
    providerData,
    ya
  }) => ({
    uid: uid,
    email: email,
    name: displayName,
    photoUrl: photoURL,
    provider: providerData[0].providerId,
    token: ya
  });

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);

      setUser(user);

      Cookies.set('fast-feedback-auth', true, { expires: 1 });

      return user;
    } else {
      setUser(false);

      Cookies.remove('fast-feedback-auth');
      return false;
    }
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push('/sites');
      });
  };

  const signinWithGitHub = (redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(({ user }) => {
        handleUser(user);
        return user;
      });
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signout = () => {
    Router.push('/');

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGitHub,
    signinWithGoogle,
    signout
  };
}

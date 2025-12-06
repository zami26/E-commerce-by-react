import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, googleProvider, githubProvider } from '../firebase/firebase.config'; // Import providers
import "../style/auth.css";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification // Optional: for email verification
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Enhanced signup with optional username
  const signup = async (email, password, username = '') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with username if provided
    if (username) {
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      // Update current user state
      setCurrentUser({
        ...userCredential.user,
        displayName: username
      });
    }
    
    // Optional: Send email verification
    // await sendEmailVerification(userCredential.user);
    
    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Fixed: Pass the provider directly
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Fixed: Pass the provider directly
  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  // Optional: Reset password function
  const resetPassword = (email) => {
    // You'll need to import sendPasswordResetEmail from firebase/auth
    // return sendPasswordResetEmail(auth, email);
  };

  // Optional: Update user profile
  const updateUserProfile = (profileData) => {
    return updateProfile(currentUser, profileData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signInWithGoogle,    // Renamed for clarity
    signInWithGithub,    // Renamed for clarity
    logout,
    resetPassword,       // Optional
    updateUserProfile    // Optional
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
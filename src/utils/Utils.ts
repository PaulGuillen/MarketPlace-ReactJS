import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const validateEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()); 
};

export const validatePassword = (password: string | null | undefined): boolean => {
  return password ? password.trim().length > 0 : false;
};

export const truncateText = (text, charLimit) => {
  if (text.length > charLimit) {
    return text.slice(0, charLimit) + '...'; 
  }
  return text;
};

export const getDocumentType = (document: string): string => {
  return document.length === 8 ? "dni" : "cex";
};

export const observeAuthState = (callback: (user: User | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user);
  });
  return unsubscribe;
};
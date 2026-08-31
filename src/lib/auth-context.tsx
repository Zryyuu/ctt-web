"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthCtx {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  enterGuestMode: () => void;
  logout: () => Promise<void>;
  displayName: string;
  email: string;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if guest mode was previously active
    const wasGuest = localStorage.getItem("zyto_guest_mode") === "true";
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // Logged in -> clear guest flag
        setIsGuest(false);
        localStorage.removeItem("zyto_guest_mode");
      } else if (wasGuest) {
        setIsGuest(true);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const enterGuestMode = useCallback(() => {
    setIsGuest(true);
    localStorage.setItem("zyto_guest_mode", "true");
  }, []);

  const login = async (email: string, password: string) => {
    setIsGuest(false);
    localStorage.removeItem("zyto_guest_mode");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsGuest(false);
    localStorage.removeItem("zyto_guest_mode");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const db = getFirestore();
    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      name,
      email,
      createdAt: new Date().toISOString(),
    });
  };

  const loginWithGoogle = async () => {
    setIsGuest(false);
    localStorage.removeItem("zyto_guest_mode");
    const cred = await signInWithPopup(auth, googleProvider);
    if (cred.additionalUserInfo?.isNewUser) {
      const db = getFirestore();
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name: cred.user.displayName,
        email: cred.user.email,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setIsGuest(false);
    localStorage.removeItem("zyto_guest_mode");
  };

  const effectiveUser = user;
  const displayName = isGuest
    ? "Mode Tamu"
    : effectiveUser?.displayName || effectiveUser?.email?.split("@")[0] || "User";
  const email = isGuest ? "" : effectiveUser?.email || "";

  return (
    <AuthContext.Provider
      value={{
        user: effectiveUser,
        isGuest,
        loading,
        login,
        register,
        loginWithGoogle,
        enterGuestMode,
        logout,
        displayName,
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  signOut as fbSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isVerified: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isVerified = !!user?.emailVerified;

  const signInWithGoogle = useCallback(async () => {
    if (!auth) {
      toast.show("Auth is not configured.");
      return;
    }
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      await res.user.reload();
      const updated = auth.currentUser;
      if (updated && !updated.emailVerified) {
        toast.show("Подтвердите email для доступа к приватным разделам.");
        router.push("/verify-email");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Ошибка входа через Google";
      toast.show(msg.includes("auth/") ? "Не удалось войти через Google." : msg);
    }
  }, [toast, router]);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!auth) {
        toast.show("Auth is not configured.");
        return;
      }
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        await res.user.reload();
        const updated = auth.currentUser;
        if (updated && !updated.emailVerified) {
          toast.show("Подтвердите email — иначе доступ к разделам будет закрыт.");
          router.push("/verify-email");
          return;
        }
        toast.show("Вы вошли в аккаунт.");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("auth/user-not-found") || msg.includes("auth/invalid-credential")) {
          toast.show("Неверный email или пароль.");
        } else if (msg.includes("auth/too-many-requests")) {
          toast.show("Слишком много попыток. Попробуйте позже.");
        } else {
          toast.show("Ошибка входа. Проверьте данные.");
        }
      }
    },
    [toast, router]
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!auth) {
        toast.show("Auth is not configured.");
        return;
      }
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(res.user);
        toast.show("Мы отправили письмо для подтверждения. Проверьте почту.");
        router.push("/verify-email");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("auth/email-already-in-use")) {
          toast.show("Этот email уже зарегистрирован. Войдите или восстановите пароль.");
        } else if (msg.includes("auth/weak-password")) {
          toast.show("Пароль слишком короткий. Используйте минимум 6 символов.");
        } else {
          toast.show("Ошибка регистрации. Проверьте данные.");
        }
      }
    },
    [toast, router]
  );

  const resendVerificationEmail = useCallback(async () => {
    if (!auth?.currentUser) {
      toast.show("Сначала войдите в аккаунт.");
      return;
    }
    try {
      await sendEmailVerification(auth.currentUser);
      toast.show("Письмо отправлено повторно. Проверьте почту.");
    } catch (e: unknown) {
      toast.show("Не удалось отправить письмо. Попробуйте позже.");
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    if (!auth) return;
    try {
      await fbSignOut(auth);
      toast.show("Вы вышли из аккаунта.");
      router.push("/");
    } catch {
      toast.show("Ошибка выхода.");
    }
  }, [toast, router]);

  const value: AuthContextValue = {
    user,
    loading,
    isVerified,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    resendVerificationEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      loading: false,
      isVerified: false,
      signInWithGoogle: async () => {},
      signInWithEmail: async () => {},
      signUpWithEmail: async () => {},
      resendVerificationEmail: async () => {},
      signOut: async () => {},
    };
  }
  return ctx;
}

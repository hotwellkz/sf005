/**
 * Firebase client SDK — Auth (and optional Firestore). Only uses public config from env.
 * Do not put service account keys here; they are for server-side Admin SDK only.
 */

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initFirebase() {
  if (getApps().length > 0) return getApp();
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    if (typeof window !== "undefined") {
      console.warn("[Firebase] Missing env: NEXT_PUBLIC_FIREBASE_*");
    }
    return null;
  }
  return initializeApp(firebaseConfig);
}

const app = typeof window !== "undefined" ? initFirebase() : null;
export const auth = app ? getAuth(app) : null;

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZdtmJR2LhV_JilJLgv7DvYUBbfbsZy4Y",
  authDomain: "report-tracker-e3d77.firebaseapp.com",
  projectId: "report-tracker-e3d77",
  storageBucket: "report-tracker-e3d77.firebasestorage.app",
  messagingSenderId: "178337156258",
  appId: "1:178337156258:web:676c2bf0a583e2f71d5bfb",
  measurementId: "G-TDR2SLHCVV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, RecaptchaVerifier, signInWithPhoneNumber };
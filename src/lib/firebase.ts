import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtSkO4n1D4ZOFUGVKDJnoqmayvvCdEg2k",
  authDomain: "astroniax.firebaseapp.com",
  projectId: "astroniax",
  storageBucket: "astroniax.firebasestorage.app",
  messagingSenderId: "472587313749",
  appId: "1:472587313749:web:80a02c9d01a971b05a6adc",
  measurementId: "G-006K8VTW9T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

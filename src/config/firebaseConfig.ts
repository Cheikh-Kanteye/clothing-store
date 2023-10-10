// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import * as firebaseAuth from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyDFJ9mqiA2Gv3u0ro8P-ykiuL6nO6N7z2M",
  authDomain: "clothing-storeapp.firebaseapp.com",
  projectId: "clothing-storeapp",
  storageBucket: "clothing-storeapp.appspot.com",
  messagingSenderId: "208676759313",
  appId: "1:208676759313:web:8b1b02801a0cff1e8b0eb0",
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});

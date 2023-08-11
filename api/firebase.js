import { initializeApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhL0X62Orn88BwQgtjlV_DH2nv4eCBEow",
  authDomain: "stream-1ff49.firebaseapp.com",
  projectId: "stream-1ff49",
  storageBucket: "stream-1ff49.appspot.com",
  messagingSenderId: "309533048065",
  appId: "1:309533048065:web:12407d3c9fa3a9ad712f00",
  measurementId: "G-J84RS2957H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(app);

export default FIREBASE_AUTH;





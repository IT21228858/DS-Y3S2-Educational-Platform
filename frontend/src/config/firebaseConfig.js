// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHg4DUxOMpnEXLmhbeZrkDLZbQkyx5TJM",
  authDomain: "educational-platform-972ac.firebaseapp.com",
  projectId: "educational-platform-972ac",
  storageBucket: "educational-platform-972ac.appspot.com",
  messagingSenderId: "964180434940",
  appId: "1:964180434940:web:a285a36029999dd4e35c79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

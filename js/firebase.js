
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBf2OcawaDSIVkYnbtCrcusv5iOxWcsHY",
  authDomain: "project-3c72ea75-f1b5-40c3-b52.firebaseapp.com",
  projectId: "project-3c72ea75-f1b5-40c3-b52",
  storageBucket: "project-3c72ea75-f1b5-40c3-b52.firebasestorage.app",
  messagingSenderId: "371184229038",
  appId: "1:371184229038:web:b58e2508bd9270f308eb3f",
  measurementId: "G-VK0FC7ES6W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

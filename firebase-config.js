/* ═══════════════════════════════════════
   ANALYST DEN — Firebase Configuration
   Shared by all public pages + admin
═══════════════════════════════════════ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzlCB74rpbd6o2vx7RbsfuIrkfOyhBUTQ",
  authDomain: "analyst-den-3f9c9.firebaseapp.com",
  projectId: "analyst-den-3f9c9",
  storageBucket: "analyst-den-3f9c9.firebasestorage.app",
  messagingSenderId: "438646500281",
  appId: "1:438646500281:web:8a7c48d0ca882e2b5a6468"
};

const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmrnxnGwJSl3XHe_A2NjOqPLhcJACxbrE",
    authDomain: "realmarchive-ef464.firebaseapp.com",
    projectId: "realmarchive-ef464",
    storageBucket: "realmarchive-ef464.firebasestorage.app",
    messagingSenderId: "504407159306",
    appId: "1:504407159306:web:0a0e1a9a880f18d1e1e5f3",
    measurementId: "G-CD595R1W83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // 🔥 Firestore 초기화 추가

// 전역에서 접근 가능하도록
window.db = db;

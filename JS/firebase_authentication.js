// Firebase에서 제공하는 인증 서비스 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { 
  getAuth, // 권한받기
  onAuthStateChanged, // 로그인 상태 확인
  GoogleAuthProvider, // 구글 로그인 - 회원가입 필요 X
  signInWithPopup // 팝업
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { // 계정 저장
  collection,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const db = getFirestore(app);  // Firestore 초기화 추가
const auth = getAuth(app);

// 전역에서 접근 가능하도록
window.db = db;
window.auth = auth;

const provider = new GoogleAuthProvider();

export { db, auth, provider, collection, doc, setDoc, getDoc, onAuthStateChanged, GoogleAuthProvider, signInWithPopup};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { 
  getAuth, // 권한받기
  onAuthStateChanged, // 로그인 상태 확인
  GoogleAuthProvider, // 구글 로그인 - 회원가입 필요 X
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { // 계정 저장
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

// 전역에서 접근 가능하도록
window.db = db;

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
  const googleLoginBtn = document.getElementById("googleLoginBtn");
  const message = document.getElementById("message");

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        message.textContent = `구글 로그인 성공: ${user.email}`;
        
        // Firestore에 사용자 정보 저장
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            createdAt: new Date(),
          });
        }
        window.location.href = "/index.html"; // 로그인 성공 후 이동
      } catch (error) {
        message.textContent = `구글 로그인 실패: ${error.message}`;
      }
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("현재 로그인 중:", user.email);
    } else {
      console.log("로그아웃 상태");
    }
  });
});

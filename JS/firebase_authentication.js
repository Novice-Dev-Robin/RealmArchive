
// Firebase SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAmrnxnGwJSl3XHe_A2NjOqPLhcJACxbrE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 회원가입
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("회원가입 성공", user);
  })
  .catch((error) => {
    console.error("회원가입 에러", error.message);
  });

// 로그인
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log("로그인 성공", user);
    })
    .catch((error) => {
    console.error("로그인 에러", error.message);
    });

// 로그아웃
signOut(auth).then(() => {
    console.log("로그아웃 완료");
});

// 로그인 상태 확인
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("로그인 중:", user.email);
  } else {
    console.log("로그아웃 상태");
  }
});
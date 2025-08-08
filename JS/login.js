import { db, auth, provider, doc, setDoc, getDoc, onAuthStateChanged, signInWithPopup} from "./firebase_authentication.js";
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
        window.location.href = "../index.html"; // 로그인 성공 후 이동 - 절대경로
      } catch (error) {
        message.textContent = `구글 로그인 실패: ${error.message}`;
        console.log(error.message);
      }
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) { // 로그인 상태이면?
      console.log(`현재 로그인 중: ${user.email}`);
    } 
    else {
      console.log("로그아웃 상태");
    }
  });
});
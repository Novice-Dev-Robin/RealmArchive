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
          const nickname = prompt("처음 로그인하셨네요! 사용할 이름을 입력해주세요.", user.displayName || "");
          if (!nickname) { // 만약 이름 작성 안하면
            alert("이름이 입력되지 않아 기본 이름으로 저장됩니다.");
          }

          await setDoc(userRef, {
            name: nickname || user.displayName,
            email: user.email,
            uid: user.uid,
            createdAt: new Date(),
          });
        }
        // 로그인 성공 후 이동
        if (location.hostname === "127.0.0.1" || location.hostname === "localhost") {
          // 로컬 개발 환경 (Live Server)
          window.location.href = "./index.html";
        } else {
          // GitHub Pages 등 배포 환경
          window.location.href = "../index.html";
        }
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
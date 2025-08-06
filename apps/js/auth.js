import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// 페이지 로딩 시 로그인 상태 확인
window.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('로그인한 유저:', user.uid);
      loadMococoData(user.uid);  // 사용자 데이터 로딩 함수 호출
    } else {
      console.log('로그인 필요');
      redirectToLogin();          // 로그인 유도 함수 호출
    }
  });
});


function redirectToLogin(){
  const alertEl = document.getElementById('login-alert');
  if (alertEl) {
    alertEl.style.display = 'block';
  }
}


document.getElementById("login-alert-redirection").addEventListener("click", () => {
  location.reload();  // 현재 페이지 새로고침
});



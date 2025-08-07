import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const logout = document.getElementById("logout");
const logout_overlay = document.getElementById("logout-alert-overlay");

// 로그아웃 확인 창 뜨게
logout.addEventListener("click", () => {
    logout_overlay.style.display = "flex";
});

// 클릭한 대상이 overlay 자체일 때만 창을 닫음
logout_overlay.addEventListener("click", (event) => {
    if (event.target === logout_overlay) {
        logout_overlay.style.display = "none";
    }
});

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("로그아웃 되었습니다.");
      logout_overlay.style.display = "none"; // 창 닫기  

      const loginBtn = document.querySelector("#loginBtn");
      const authArea = document.getElementById("authArea");
      const menuButton = document.getElementById("menuButton");
      loginBtn.classList.remove("hidden");
      authArea.classList.add("hidden");
      menuButton.classList.add("hidden");
    })
    .catch((error) => {
      console.error("로그아웃 오류:", error);
    });
});


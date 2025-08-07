import { auth, onAuthStateChanged } from "./firebase_authentication.js";

document.addEventListener("DOMContentLoaded", () => {
    // 로그인 후 프로필 표시 
    const loginBtn = document.querySelector("#loginBtn");
    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    onAuthStateChanged(auth, (user) => {
        loginBtn.classList.add("hidden");
        document.getElementById("authArea").classList.remove("hidden");
        menuButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("hidden");
        });
        document.getElementById("menuButton").innerText = user.displayName + " ▼";
    });
});

export { auth };
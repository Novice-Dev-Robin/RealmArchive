import { doc, getDoc, auth, onAuthStateChanged } from "./firebase_authentication.js";

document.addEventListener("DOMContentLoaded", () => {
    // 로그인 후 프로필 표시 
    const loginBtn = document.querySelector("#loginBtn");
    const authArea = document.getElementById("authArea");
    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    onAuthStateChanged(auth, async (user) => {
        if (user) { // 로그인 상태이면?
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            const userData = docSnap.data();

            loginBtn.classList.add("hidden");
            authArea.classList.remove("hidden");
            menuButton.addEventListener("click", () => {
                dropdownMenu.classList.toggle("hidden");
            });
        document.getElementById("menuButton").innerText = userData.name + " ▼";
        }
    });
});
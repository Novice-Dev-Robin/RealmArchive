import { auth, db, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from '../../../JS/firebase_authentication.js';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("모코코 로그인 유저:", user.email);
    document.getElementById("login-alert-overlay").classList.add("hidden");
    document.getElementById("login-alert").classList.add("hidden");
  }
  else{
    document.getElementById("login-alert-overlay").classList.remove("hidden");
  }
});
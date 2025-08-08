import { auth, db, onAuthStateChanged, doc, getDoc, setDoc} from '../../../JS/firebase_authentication.js';


onAuthStateChanged(auth, async (user) => {
  if (user) {

    console.log("로그인 유저:", user.displayName);

    document.getElementById("login-alert-overlay").classList.add("hidden");
    document.getElementById("login-alert").classList.add("hidden");

    const userDocRef = doc(db, "users", user.uid); // 유저 아이디 참조
    const userDocSnap = await getDoc(userDocRef); // 유저 아이디 가져오기


    const mokokoStatRef = doc(userDocRef, "mokoko", "stat"); // 유저 스탯 참조
    const statSnap = await getDoc(mokokoStatRef); // 유저 스탯 가져오기

    if (!userDocSnap.exists()) { // 유저 아이디가 없다면?
      console.log("mokokoWorld 최초 로그인 유저네요.");
      // 기본값 세팅 가능





    } else {
      console.log("mokokoWorld 데이터:", statSnap.data());
    }
  } else {
    document.getElementById("login-alert-overlay").classList.remove("hidden");
  }
});
